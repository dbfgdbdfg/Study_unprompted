/* ============================================================
   app.js — Unprompted V3 메인 로직
   ------------------------------------------------------------
   구성
     1. 설정값 (CONFIG)
     2. 저장소 (localStorage 읽기/쓰기)
     3. 유틸 (토스트, 복사, 날짜 표시)
     4. 프롬프트 생성
     5. 화면 그리기 (render)
     6. 주제 뽑기 / 열기
     7. 전체 저장 버튼 (저장해야 History에 남음)
     8. History
     9. 타이머
    10. 시작
   topics.js의 TOPICS, CATEGORIES를 전역으로 사용합니다.
   ============================================================ */

(() => {
  'use strict';

  /* ------------------------------------------------------------
     1. 설정값 — 여기만 바꿔도 동작이 달라져요
     ------------------------------------------------------------ */
  const CONFIG = {
    storageKey: 'unprompted_v3',   // localStorage 키 (바꾸면 기존 데이터는 안 보임)
    estimateResearch: '15 min',    // 카드에 표시되는 예상 조사 시간
    estimateExplain: '3 min',      // 카드에 표시되는 예상 설명 시간
    historyLimit: 200              // History에 보관할 최대 개수
  };

  /* ------------------------------------------------------------
     2. 저장소
     state 구조
       {
         currentId : 지금 보고 있는 주제 id
         category  : 선택된 카테고리 ("Mixed" 포함)
         history   : [{ id, ts }, ...]  최신순
         entries   : { [topicId]: { notes, script, feedback, reflection } }
       }
     ------------------------------------------------------------ */
  const defaultState = () => ({
    currentId: null,
    category: 'Mixed',
    history: [],
    entries: {}
  });

  function loadState() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKey);
      if (!raw) return defaultState();
      // 빠진 필드가 있어도 안전하도록 기본값과 합침
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {
      console.warn('저장된 데이터를 읽지 못했어요. 새로 시작합니다.', e);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
    } catch (e) {
      // 저장공간이 꽉 찼거나 시크릿 모드 등
      toast('Could not save. Storage may be full or blocked.');
    }
  }

  const state = loadState();

  /* id → 주제 빠른 조회용 Map (600개여도 O(1)) */
  const topicById = new Map(TOPICS.map(t => [t.id, t]));
  const currentTopic = () => topicById.get(state.currentId) || null;

  /* ------------------------------------------------------------
     3. 유틸
     ------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 하단 토스트 메시지
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  // 클립보드 복사 (file:// 에서도 되도록 fallback 포함)
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // 구형 브라우저/보안 제한일 때: 임시 textarea로 복사
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
      return ok;
    }
  }

  // 별점 문자열 (예: 4 → ★★★★☆)
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

  // 주제 이름 (영문 + 약어)  예: "Antibody–Drug Conjugate (ADC)"
  const fullEnglish = t => t.short ? `${t.english} (${t.short})` : t.english;

  // 날짜 라벨: Today / Yesterday / N days ago
  function whenLabel(ts) {
    const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diff = Math.round((startOfDay(new Date()) - startOfDay(new Date(ts))) / 86400000);
    if (diff <= 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  }

  /* ------------------------------------------------------------
     4. 프롬프트 생성 — 문구를 바꾸고 싶으면 여기만 수정
     ------------------------------------------------------------ */
  function researchPrompt(t) {
    return [
      'I am studying this topic.',
      '',
      'Topic',
      fullEnglish(t),
      '',
      'Please explain this topic in depth.',
      '',
      'Requirements',
      '1. Definition',
      '2. Scientific principle',
      '3. Current clinical applications',
      '4. Advantages',
      '5. Limitations',
      '6. Future prospects',
      '7. Important keywords',
      '8. One real-world example',
      '9. Three quiz questions',
      '',
      'Please explain in detail.'
    ].join('\n');
  }

  function evaluationPrompt(t) {
    // My Script에 쓴 글이 있으면(저장 전이어도) 자동으로 뒤에 붙여줌 → 붙여넣기 한 번으로 끝
    const scriptBox = $('textarea[data-field="script"]');
    const script = (scriptBox ? scriptBox.value : '').trim();
    return [
      'Below is my explanation.',
      'Please evaluate it.',
      '',
      `Topic: ${fullEnglish(t)}`,
      '',
      'Score',
      'Accuracy /10',
      'Logic /10',
      'Clarity /10',
      '',
      'Missing concepts',
      'Incorrect statements',
      'Suggestions',
      '',
      'Finally rewrite my explanation while keeping my style.',
      '',
      'My explanation:',
      script || '[Paste your explanation here]'
    ].join('\n');
  }

  /* ------------------------------------------------------------
     5. 화면 그리기
     ------------------------------------------------------------ */
  function render() {
    renderChips();
    renderTopic();
    renderFields();
    renderHistory();
  }

  // 카테고리 칩
  function renderChips() {
    const box = $('#categoryChips');
    box.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const b = document.createElement('button');
      b.className = 'chip' + (cat === state.category ? ' active' : '');
      b.textContent = cat;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', cat === state.category);
      b.addEventListener('click', () => {
        if (!confirmDiscard()) return;
        state.category = cat;
        saveState();
        renderChips();
        // 칩을 누르면 바로 그 카테고리에서 새 주제를 뽑음
        drawTopic();
      });
      box.appendChild(b);
    });
  }

  // 주제 카드
  function renderTopic() {
    const t = currentTopic();
    if (!t) return;
    $('#topicKorean').textContent = t.korean;
    $('#topicEnglish').textContent = fullEnglish(t);
    $('#topicCategory').textContent = t.category;
    $('#topicStars').textContent = stars(t.difficulty);
    $('#topicStars').setAttribute('aria-label', `Difficulty ${t.difficulty} of 5`);
    $('#estResearch').textContent = CONFIG.estimateResearch;
    $('#estExplain').textContent = CONFIG.estimateExplain;
  }

  // textarea 4개에 현재 주제의 저장된 내용을 채움
  function renderFields() {
    const entry = state.entries[state.currentId] || {};
    dirty.clear();
    $$('textarea[data-field]').forEach(ta => {
      ta.value = entry[ta.dataset.field] || '';
    });
    setStatus('', '');
  }

  /* ------------------------------------------------------------
     6. 주제 뽑기 / 열기
     ------------------------------------------------------------ */
  function drawTopic() {
    // 선택한 카테고리 풀 (Mixed면 전체)
    const pool = TOPICS.filter(t => state.category === 'Mixed' || t.category === state.category);
    if (pool.length === 0) {
      toast('No topics in this category yet.');
      return;
    }

    // 1순위: 아직 안 본 주제 → 다 봤으면 2순위: 현재 주제만 제외
    const seen = new Set(state.history.map(h => h.id));
    let candidates = pool.filter(t => !seen.has(t.id) && t.id !== state.currentId);
    if (candidates.length === 0) candidates = pool.filter(t => t.id !== state.currentId);
    if (candidates.length === 0) candidates = pool; // 풀에 주제가 딱 1개일 때

    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    openTopic(pick.id);
  }

  // 주제를 열기. History에는 기록하지 않음 (기록은 Save를 눌렀을 때만)
  function openTopic(id) {
    if (!topicById.has(id)) return;
    state.currentId = id;
    saveState();
    render();
  }

  /* ------------------------------------------------------------
     7. 전체 저장 — Save 버튼(또는 Ctrl/Cmd + S)
        * 4개 textarea를 한 번에 저장하고, 그때 History에 기록됨
        * 주제만 뽑고 아무것도 안 쓰면 History에 남지 않음
        * 전부 비어 있으면 저장하지 않음 (이미 저장돼 있던 주제면 기록을 비움)
        * 저장 안 한 채로 주제를 바꾸거나 탭을 닫으려 하면 경고
     ------------------------------------------------------------ */
  const dirty = new Set();   // 아직 저장 안 된 필드 이름들

  // 상태 문구 (cls: 'saved' | 'unsaved' | '')
  function setStatus(text, cls) {
    const el = $('#saveStatus');
    el.textContent = text;
    el.className = 'save-status' + (cls ? ' ' + cls : '');
  }

  function saveAll() {
    const id = state.currentId;
    if (id == null) return;

    // 지금 화면의 4개 필드 값을 모음
    const values = {};
    $$('textarea[data-field]').forEach(ta => { values[ta.dataset.field] = ta.value; });
    const hasContent = Object.values(values).some(v => v.trim() !== '');

    // History에서 이 주제를 먼저 뺌 (다시 넣으면 맨 위로 올라감)
    state.history = state.history.filter(h => h.id !== id);

    if (hasContent) {
      state.entries[id] = values;
      state.history.unshift({ id, ts: Date.now() });
      if (state.history.length > CONFIG.historyLimit) state.history.length = CONFIG.historyLimit;
      setStatus('Saved', 'saved');
    } else {
      delete state.entries[id];
      setStatus('Nothing to save', '');
    }

    saveState();
    dirty.clear();
    renderHistory();
  }

  // 저장 안 한 내용이 있을 때 이동해도 되는지 확인
  function confirmDiscard() {
    return dirty.size === 0 || confirm('You have unsaved changes. Discard them and continue?');
  }

  function bindSave() {
    $('#btnSave').addEventListener('click', saveAll);

    $$('textarea[data-field]').forEach(ta => {
      // 입력하면 "저장 안 됨" 표시만 함 (저장은 안 함)
      ta.addEventListener('input', () => {
        dirty.add(ta.dataset.field);
        setStatus('Unsaved changes', 'unsaved');
      });
    });

    // Ctrl/Cmd + S (어디에 포커스가 있든)
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveAll();
      }
    });

    // 저장 안 하고 탭을 닫거나 새로고침할 때 브라우저 경고
    window.addEventListener('beforeunload', e => {
      if (dirty.size > 0) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  /* ------------------------------------------------------------
     8. History — 최신순, 클릭하면 그 주제와 저장된 글이 다시 열림
     ------------------------------------------------------------ */
  function renderHistory() {
    const ul = $('#historyList');
    ul.innerHTML = '';

    // 주제 DB에서 지워진 id는 건너뜀
    const items = state.history.filter(h => topicById.has(h.id));
    if (items.length === 0) {
      ul.innerHTML = '<li class="history-empty">Topics you save will show up here.</li>';
      return;
    }

    items.forEach(h => {
      const t = topicById.get(h.id);
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = h.id === state.currentId ? 'active' : '';

      const when = document.createElement('span');
      when.className = 'h-when';
      when.textContent = whenLabel(h.ts);

      const name = document.createElement('span');
      name.className = 'h-name';
      name.textContent = t.short || t.english;

      btn.append(when, name);
      btn.addEventListener('click', () => { if (confirmDiscard()) openTopic(h.id); });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    document.getElementById("btnClearHistory").addEventListener("click", () => {

        if (!confirm("Delete all learning history?")) return;

        state.history = [];

        saveState();      // 기존 저장 함수
        renderHistory();  // 화면 다시 그림
    });

  }

  /* ------------------------------------------------------------
     9. 타이머 — Start / Pause / Reset
        setInterval 횟수를 세지 않고 "끝나는 시각"을 기준으로 계산해서
        탭이 백그라운드에 있어도 시간이 안 틀어져요.
     ------------------------------------------------------------ */
  const fmt = sec => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  function setupTimer(root) {
    const total = Number(root.dataset.seconds);     // 시작 시간(초)
    const name = root.dataset.name;
    const display = $('.timer-display', root);

    let remainingMs = total * 1000;   // 남은 시간
    let endAt = 0;                    // 끝나는 시각 (실행 중일 때만 의미 있음)
    let tick = null;

    const show = () => { display.textContent = fmt(Math.ceil(remainingMs / 1000)); };

    function stop() {
      clearInterval(tick);
      tick = null;
      root.classList.remove('running');
    }

    function update() {
      remainingMs = Math.max(0, endAt - Date.now());
      show();
      if (remainingMs === 0) {
        stop();
        root.classList.add('done');
        toast(`${name} time is up`);
      }
    }

    function start() {
      if (tick) return;                              // 이미 실행 중
      if (remainingMs === 0) remainingMs = total * 1000; // 끝난 뒤 Start → 처음부터
      root.classList.remove('done');
      root.classList.add('running');
      endAt = Date.now() + remainingMs;
      tick = setInterval(update, 250);
    }

    function pause() {
      if (!tick) return;
      remainingMs = Math.max(0, endAt - Date.now());
      stop();
      show();
    }

    function reset() {
      stop();
      root.classList.remove('done');
      remainingMs = total * 1000;
      show();
    }

    const actions = { start, pause, reset };
    $$('button[data-act]', root).forEach(b => {
      b.addEventListener('click', () => actions[b.dataset.act]());
    });

    show();
  }

  /* ------------------------------------------------------------
     10. 시작
     ------------------------------------------------------------ */
  function init() {
    // 버튼 연결
    $('#btnDraw').addEventListener('click', () => { if (confirmDiscard()) drawTopic(); });

    $('#btnCopyResearch').addEventListener('click', async () => {
      const t = currentTopic();
      if (!t) return;
      toast(await copyText(researchPrompt(t)) ? 'Research prompt copied' : 'Copy failed');
    });

    $('#btnCopyEval').addEventListener('click', async () => {
      const t = currentTopic();
      if (!t) return;
      toast(await copyText(evaluationPrompt(t)) ? 'Evaluation prompt copied' : 'Copy failed');
    });

    bindSave();
    $$('.timer').forEach(setupTimer);

    // 저장된 주제가 없거나(첫 방문) DB에서 사라졌으면 새로 뽑기
    if (!topicById.has(state.currentId)) {
      drawTopic();
    } else {
      render();
    }
  }

  init();
})();
