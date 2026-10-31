/* ============================================================
   topics.js — 주제 DB
   ------------------------------------------------------------
   * 이 파일은 "데이터 배열"만 관리합니다. 로직은 app.js에 있어요.
   * 주제를 추가하려면 아래 TOPICS 배열 맨 끝에 한 줄만 더하면 끝.
   * 500~700개가 되어도 그대로 동작합니다.

   필드 설명
     id         : 숫자, 절대 겹치면 안 됨 (History/저장 데이터가 이 id로 연결됨)
                  → 한 번 쓴 id는 바꾸거나 재사용하지 마세요.
     korean     : 한글 이름
     english    : 영문 이름 (프롬프트에 들어감)
     short      : 약어. 없으면 "" 로 비워두기
     category   : "Medicine" | "AI" | "Statistics" | "Economics" | "Society" | "Science"
     difficulty : 1~5 (별점으로 표시됨)

   ※ "Mixed"는 카테고리가 아니라 '전체 랜덤' 선택지라서 여기에 쓰지 않아요.
   ※ 새 카테고리를 쓰고 싶으면 CATEGORIES 배열에도 이름을 추가하세요.
   ============================================================ */

// 상단 칩(필터)에 표시될 카테고리 목록. Mixed는 항상 마지막.
const CATEGORIES = ["Medicine", "AI", "Statistics", "Economics", "Society", "Science", "Mixed"];

const TOPICS = [
  /* ---------- Medicine ---------- */
  { id: 1,  korean: "항체-약물 접합체",      english: "Antibody–Drug Conjugate",        short: "ADC",      category: "Medicine", difficulty: 5 },
  { id: 2,  korean: "이중특이항체",          english: "Bispecific Antibody",            short: "",         category: "Medicine", difficulty: 4 },
  { id: 3,  korean: "CAR-T 세포치료제",      english: "CAR-T Cell Therapy",             short: "CAR-T",    category: "Medicine", difficulty: 5 },
  { id: 4,  korean: "CAR-NK 세포치료제",     english: "CAR-NK Cell Therapy",            short: "CAR-NK",   category: "Medicine", difficulty: 5 },
  { id: 5,  korean: "표적단백질분해 (PROTAC)", english: "PROTAC",                        short: "PROTAC",   category: "Medicine", difficulty: 5 },
  { id: 6,  korean: "분자 접착제",           english: "Molecular Glue",                 short: "",         category: "Medicine", difficulty: 5 },
  { id: 7,  korean: "신항원",               english: "Neoantigen",                     short: "",         category: "Medicine", difficulty: 4 },
  { id: 8,  korean: "정밀의료",             english: "Precision Medicine",             short: "",         category: "Medicine", difficulty: 3 },
  { id: 9,  korean: "액체생검",             english: "Liquid Biopsy",                  short: "",         category: "Medicine", difficulty: 4 },
  { id: 10, korean: "순환종양 DNA",          english: "Circulating Tumor DNA",          short: "ctDNA",    category: "Medicine", difficulty: 4 },
  { id: 11, korean: "공간 전사체학",         english: "Spatial Transcriptomics",        short: "",         category: "Medicine", difficulty: 5 },
  { id: 12, korean: "단일세포 RNA 시퀀싱",   english: "Single-cell RNA sequencing",     short: "scRNA-seq",category: "Medicine", difficulty: 4 },
  { id: 13, korean: "방사성의약품",          english: "Radiopharmaceuticals",           short: "",         category: "Medicine", difficulty: 4 },
  { id: 14, korean: "유전자 치료",           english: "Gene Therapy",                   short: "",         category: "Medicine", difficulty: 4 },
  { id: 15, korean: "크리스퍼 유전자 가위",  english: "CRISPR",                         short: "",         category: "Medicine", difficulty: 4 },
  { id: 16, korean: "염기 교정",             english: "Base Editing",                   short: "",         category: "Medicine", difficulty: 5 },
  { id: 17, korean: "프라임 편집",           english: "Prime Editing",                  short: "",         category: "Medicine", difficulty: 5 },
  { id: 18, korean: "동반진단",             english: "Companion Diagnostics",          short: "CDx",      category: "Medicine", difficulty: 3 },
  { id: 19, korean: "디지털 치료제",         english: "Digital Therapeutics",           short: "DTx",      category: "Medicine", difficulty: 3 },
  { id: 20, korean: "단백질 분해",           english: "Protein Degradation",            short: "",         category: "Medicine", difficulty: 4 },
  { id: 21, korean: "장내 미생물",           english: "Gut Microbiome",                 short: "",         category: "Medicine", difficulty: 3 },
  { id: 22, korean: "엑소좀",               english: "Exosome",                        short: "",         category: "Medicine", difficulty: 4 },
  { id: 23, korean: "바이오마커",            english: "Biomarker",                      short: "",         category: "Medicine", difficulty: 2 },
  { id: 24, korean: "약물유전체학",          english: "Pharmacogenomics",               short: "PGx",      category: "Medicine", difficulty: 4 },
  { id: 25, korean: "오가노이드",            english: "Organoids",                      short: "",         category: "Medicine", difficulty: 3 },

  /* ---------- AI ---------- */
  { id: 26, korean: "트랜스포머",            english: "Transformer",                    short: "",         category: "AI", difficulty: 4 },
  { id: 27, korean: "어텐션",               english: "Attention",                      short: "",         category: "AI", difficulty: 4 },
  { id: 28, korean: "검색 증강 생성",        english: "Retrieval-Augmented Generation", short: "RAG",      category: "AI", difficulty: 3 },
  { id: 29, korean: "모델 컨텍스트 프로토콜", english: "Model Context Protocol",         short: "MCP",      category: "AI", difficulty: 3 },
  { id: 30, korean: "AI 에이전트",           english: "AI Agent",                       short: "",         category: "AI", difficulty: 3 },
  { id: 31, korean: "벡터 데이터베이스",      english: "Vector Database",                short: "",         category: "AI", difficulty: 3 },
  { id: 32, korean: "환각",                 english: "Hallucination",                  short: "",         category: "AI", difficulty: 2 },
  { id: 33, korean: "합성 데이터",           english: "Synthetic Data",                 short: "",         category: "AI", difficulty: 3 },
  { id: 34, korean: "지식 그래프",           english: "Knowledge Graph",                short: "",         category: "AI", difficulty: 3 },
  { id: 35, korean: "확산 모델",             english: "Diffusion Model",                short: "",         category: "AI", difficulty: 4 },
  { id: 36, korean: "프롬프트 인젝션",       english: "Prompt Injection",               short: "",         category: "AI", difficulty: 3 },
  { id: 37, korean: "컨텍스트 윈도우",       english: "Context Window",                 short: "",         category: "AI", difficulty: 2 },
  { id: 38, korean: "인간 피드백 강화학습",  english: "Reinforcement Learning from Human Feedback", short: "RLHF", category: "AI", difficulty: 4 },
  { id: 39, korean: "전문가 혼합 모델",      english: "Mixture of Experts",             short: "MoE",      category: "AI", difficulty: 4 },
  { id: 40, korean: "연합학습",             english: "Federated Learning",             short: "",         category: "AI", difficulty: 4 },
  { id: 41, korean: "양자화",               english: "Quantization",                   short: "",         category: "AI", difficulty: 4 },
  { id: 42, korean: "지식 증류",             english: "Knowledge Distillation",         short: "",         category: "AI", difficulty: 4 },
  { id: 43, korean: "컴퓨터 비전",           english: "Computer Vision",                short: "",         category: "AI", difficulty: 3 },
  { id: 44, korean: "멀티모달 AI",           english: "Multimodal AI",                  short: "",         category: "AI", difficulty: 3 },

  /* ---------- Statistics ---------- */
  { id: 45, korean: "베이즈 정리",           english: "Bayes' Theorem",                 short: "",         category: "Statistics", difficulty: 3 },
  { id: 46, korean: "심슨의 역설",           english: "Simpson's Paradox",              short: "",         category: "Statistics", difficulty: 3 },
  { id: 47, korean: "충돌변수 편향",         english: "Collider Bias",                  short: "",         category: "Statistics", difficulty: 5 },
  { id: 48, korean: "교란",                 english: "Confounding",                    short: "",         category: "Statistics", difficulty: 3 },
  { id: 49, korean: "선택 편향",             english: "Selection Bias",                 short: "",         category: "Statistics", difficulty: 3 },
  { id: 50, korean: "민감도",               english: "Sensitivity",                    short: "",         category: "Statistics", difficulty: 2 },
  { id: 51, korean: "특이도",               english: "Specificity",                    short: "",         category: "Statistics", difficulty: 2 },
  { id: 52, korean: "ROC 곡선",              english: "ROC Curve",                      short: "ROC",      category: "Statistics", difficulty: 3 },
  { id: 53, korean: "오즈비",               english: "Odds Ratio",                     short: "OR",       category: "Statistics", difficulty: 3 },
  { id: 54, korean: "위험비",               english: "Hazard Ratio",                   short: "HR",       category: "Statistics", difficulty: 4 },
  { id: 55, korean: "메타분석",             english: "Meta-analysis",                  short: "",         category: "Statistics", difficulty: 3 },
  { id: 56, korean: "출판 편향",             english: "Publication Bias",               short: "",         category: "Statistics", difficulty: 3 },

  /* ---------- Economics ---------- */
  { id: 57, korean: "기회비용",             english: "Opportunity Cost",               short: "",         category: "Economics", difficulty: 2 },
  { id: 58, korean: "네트워크 효과",         english: "Network Effect",                 short: "",         category: "Economics", difficulty: 2 },
  { id: 59, korean: "린디 효과",             english: "Lindy Effect",                   short: "",         category: "Economics", difficulty: 3 },
  { id: 60, korean: "비교우위",             english: "Comparative Advantage",          short: "",         category: "Economics", difficulty: 3 },
  { id: 61, korean: "창조적 파괴",           english: "Creative Destruction",           short: "",         category: "Economics", difficulty: 3 },
  { id: 62, korean: "전환 비용",             english: "Switching Cost",                 short: "",         category: "Economics", difficulty: 2 },

  /* ---------- Society ---------- */
  { id: 63, korean: "인구 고령화",           english: "Population Aging",               short: "",         category: "Society", difficulty: 2 },
  { id: 64, korean: "탄소 예산",             english: "Carbon Budget",                  short: "",         category: "Society", difficulty: 3 },
  { id: 65, korean: "디지털 격차",           english: "Digital Divide",                 short: "",         category: "Society", difficulty: 2 },
  { id: 66, korean: "에코 챔버",             english: "Echo Chamber",                   short: "",         category: "Society", difficulty: 2 },
  { id: 67, korean: "필터 버블",             english: "Filter Bubble",                  short: "",         category: "Society", difficulty: 2 },
  { id: 68, korean: "미세플라스틱",          english: "Microplastics",                  short: "",         category: "Society", difficulty: 2 },
  { id: 69, korean: "도시화",               english: "Urbanization",                   short: "",         category: "Society", difficulty: 2 },
  { id: 70, korean: "순환경제",             english: "Circular Economy",               short: "",         category: "Society", difficulty: 3 },

  /* ---------- Science ---------- */
  { id: 71, korean: "양자컴퓨팅",            english: "Quantum Computing",              short: "",         category: "Science", difficulty: 4 },
  { id: 72, korean: "핵융합 에너지",         english: "Fusion Energy",                  short: "",         category: "Science", difficulty: 4 },
  { id: 73, korean: "암흑물질",             english: "Dark Matter",                    short: "",         category: "Science", difficulty: 4 },
  { id: 74, korean: "제임스 웹 우주망원경",   english: "James Webb Space Telescope",     short: "JWST",     category: "Science", difficulty: 3 },
  { id: 75, korean: "그래핀",               english: "Graphene",                       short: "",         category: "Science", difficulty: 3 },
  { id: 76, korean: "mRNA",                 english: "mRNA",                           short: "",         category: "Science", difficulty: 3 },
  { id: 77, korean: "단백질 접힘",           english: "Protein Folding",                short: "",         category: "Science", difficulty: 4 },
  { id: 78, korean: "외계행성",             english: "Exoplanets",                     short: "",         category: "Science", difficulty: 3 },

    /* ---------- Medicine ---------- */
  { id: 79, korean: "항체 공학", english: "Antibody Engineering", short: "", category: "Medicine", difficulty: 4 },
  { id: 80, korean: "항체 인간화", english: "Antibody Humanization", short: "", category: "Medicine", difficulty: 4 },
  { id: 81, korean: "나노항체", english: "Nanobody", short: "", category: "Medicine", difficulty: 4 },
  { id: 82, korean: "항체 단편", english: "Antibody Fragment", short: "Fab", category: "Medicine", difficulty: 4 },
  { id: 83, korean: "Fc 영역 공학", english: "Fc Engineering", short: "", category: "Medicine", difficulty: 5 },
  { id: 84, korean: "종양 미세환경", english: "Tumor Microenvironment", short: "TME", category: "Medicine", difficulty: 4 },
  { id: 85, korean: "면역관문", english: "Immune Checkpoint", short: "", category: "Medicine", difficulty: 3 },
  { id: 86, korean: "PD-1", english: "Programmed Cell Death Protein 1", short: "PD-1", category: "Medicine", difficulty: 3 },
  { id: 87, korean: "PD-L1", english: "Programmed Death Ligand 1", short: "PD-L1", category: "Medicine", difficulty: 3 },
  { id: 88, korean: "CTLA-4", english: "CTLA-4", short: "", category: "Medicine", difficulty: 3 },
  { id: 89, korean: "종양 침윤 림프구", english: "Tumor Infiltrating Lymphocytes", short: "TIL", category: "Medicine", difficulty: 4 },
  { id: 90, korean: "암 백신", english: "Cancer Vaccine", short: "", category: "Medicine", difficulty: 3 },
  { id: 91, korean: "개인맞춤 암 백신", english: "Personalized Cancer Vaccine", short: "", category: "Medicine", difficulty: 4 },
  { id: 92, korean: "mRNA 치료제", english: "mRNA Therapeutics", short: "", category: "Medicine", difficulty: 4 },
  { id: 93, korean: "siRNA", english: "Small Interfering RNA", short: "siRNA", category: "Medicine", difficulty: 4 },
  { id: 94, korean: "ASO", english: "Antisense Oligonucleotide", short: "ASO", category: "Medicine", difficulty: 4 },
  { id: 95, korean: "RNA 간섭", english: "RNA Interference", short: "RNAi", category: "Medicine", difficulty: 4 },
  { id: 96, korean: "LNP", english: "Lipid Nanoparticle", short: "LNP", category: "Medicine", difficulty: 4 },
  { id: 97, korean: "AAV 벡터", english: "Adeno-Associated Virus", short: "AAV", category: "Medicine", difficulty: 4 },
  { id: 98, korean: "렌티바이러스", english: "Lentiviral Vector", short: "", category: "Medicine", difficulty: 4 },
  { id: 99, korean: "세포 재프로그래밍", english: "Cell Reprogramming", short: "", category: "Medicine", difficulty: 4 },
  { id:100, korean: "유도만능줄기세포", english: "Induced Pluripotent Stem Cell", short: "iPSC", category: "Medicine", difficulty: 4 },
  { id:101, korean: "줄기세포 치료", english: "Stem Cell Therapy", short: "", category: "Medicine", difficulty: 3 },
  { id:102, korean: "노화세포 제거", english: "Senolytics", short: "", category: "Medicine", difficulty: 4 },
  { id:103, korean: "세포 노화", english: "Cellular Senescence", short: "", category: "Medicine", difficulty: 4 },
  { id:104, korean: "자가포식", english: "Autophagy", short: "", category: "Medicine", difficulty: 4 },
  { id:105, korean: "세포 사멸", english: "Apoptosis", short: "", category: "Medicine", difficulty: 3 },
  { id:106, korean: "철 의존성 세포사멸", english: "Ferroptosis", short: "", category: "Medicine", difficulty: 4 },
  { id:107, korean: "괴사성 세포사멸", english: "Necroptosis", short: "", category: "Medicine", difficulty: 4 },
  { id:108, korean: "파이롭토시스", english: "Pyroptosis", short: "", category: "Medicine", difficulty: 4 },
  { id:109, korean: "면역원성 세포사멸", english: "Immunogenic Cell Death", short: "ICD", category: "Medicine", difficulty: 5 },
  { id:110, korean: "바이오시밀러", english: "Biosimilar", short: "", category: "Medicine", difficulty: 2 },
  { id:111, korean: "바이오베터", english: "Biobetter", short: "", category: "Medicine", difficulty: 3 },
  { id:112, korean: "실사용데이터", english: "Real-World Data", short: "RWD", category: "Medicine", difficulty: 2 },
  { id:113, korean: "약물감시", english: "Pharmacovigilance", short: "PV", category: "Medicine", difficulty: 3 },
  { id:114, korean: "신호 탐지", english: "Signal Detection", short: "", category: "Medicine", difficulty: 3 },
  { id:115, korean: "약물 재창출", english: "Drug Repurposing", short: "", category: "Medicine", difficulty: 2 },
  { id:116, korean: "디지털 바이오마커", english: "Digital Biomarker", short: "", category: "Medicine", difficulty: 3 },
  { id:117, korean: "웨어러블 의료기기", english: "Wearable Medical Device", short: "", category: "Medicine", difficulty: 2 },
  { id:118, korean: "원격 환자 모니터링", english: "Remote Patient Monitoring", short: "RPM", category: "Medicine", difficulty: 2 },

  /* ---------- AI ---------- */
  { id:119, korean: "생성형 AI", english: "Generative AI", short: "", category: "AI", difficulty: 2 },
  { id:120, korean: "거대언어모델", english: "Large Language Model", short: "LLM", category: "AI", difficulty: 2 },
  { id:121, korean: "추론 모델", english: "Reasoning Model", short: "", category: "AI", difficulty: 3 },
  { id:122, korean: "체인 오브 소트", english: "Chain of Thought", short: "CoT", category: "AI", difficulty: 3 },
  { id:123, korean: "셀프 컨시스턴시", english: "Self Consistency", short: "", category: "AI", difficulty: 4 },
  { id:124, korean: "트리 오브 소트", english: "Tree of Thoughts", short: "ToT", category: "AI", difficulty: 4 },
  { id:125, korean: "리액트 프롬프팅", english: "ReAct", short: "", category: "AI", difficulty: 4 },
  { id:126, korean: "함수 호출", english: "Function Calling", short: "", category: "AI", difficulty: 2 },
  { id:127, korean: "툴 사용", english: "Tool Use", short: "", category: "AI", difficulty: 2 },
  { id:128, korean: "에이전틱 AI", english: "Agentic AI", short: "", category: "AI", difficulty: 3 },
  { id:129, korean: "메모리 시스템", english: "AI Memory", short: "", category: "AI", difficulty: 3 },
  { id:130, korean: "장기 컨텍스트", english: "Long Context", short: "", category: "AI", difficulty: 3 },
  { id:131, korean: "검색 시스템", english: "Information Retrieval", short: "IR", category: "AI", difficulty: 3 },
  { id:132, korean: "하이브리드 검색", english: "Hybrid Search", short: "", category: "AI", difficulty: 4 },
  { id:133, korean: "의미 검색", english: "Semantic Search", short: "", category: "AI", difficulty: 3 },
  { id:134, korean: "임베딩", english: "Embedding", short: "", category: "AI", difficulty: 3 },
  { id:135, korean: "코사인 유사도", english: "Cosine Similarity", short: "", category: "AI", difficulty: 3 },
  { id:136, korean: "토큰", english: "Token", short: "", category: "AI", difficulty: 2 },
  { id:137, korean: "토큰화", english: "Tokenization", short: "", category: "AI", difficulty: 2 },
  { id:138, korean: "프롬프트 엔지니어링", english: "Prompt Engineering", short: "", category: "AI", difficulty: 2 },

  /* ---------- Statistics ---------- */
  { id:139, korean: "P값", english: "P-value", short: "", category: "Statistics", difficulty: 2 },
  { id:140, korean: "신뢰구간", english: "Confidence Interval", short: "CI", category: "Statistics", difficulty: 2 },
  { id:141, korean: "검정력", english: "Statistical Power", short: "", category: "Statistics", difficulty: 3 },
  { id:142, korean: "효과크기", english: "Effect Size", short: "", category: "Statistics", difficulty: 3 },

  /* ---------- Economics ---------- */
  { id:143, korean: "한계효용", english: "Marginal Utility", short: "", category: "Economics", difficulty: 2 },
  { id:144, korean: "규모의 경제", english: "Economies of Scale", short: "", category: "Economics", difficulty: 2 },

  /* ---------- Society ---------- */
  { id:145, korean: "보편적 기본소득", english: "Universal Basic Income", short: "UBI", category: "Society", difficulty: 2 },
  { id:146, korean: "가짜뉴스", english: "Misinformation", short: "", category: "Society", difficulty: 2 },

  /* ---------- Science ---------- */
  { id:147, korean: "중력파", english: "Gravitational Waves", short: "", category: "Science", difficulty: 3 },
  { id:148, korean: "힉스 보손", english: "Higgs Boson", short: "", category: "Science", difficulty: 4 },
  { id:149, korean: "양자 얽힘", english: "Quantum Entanglement", short: "", category: "Science", difficulty: 4 },
  { id:150, korean: "초전도체", english: "Superconductor", short: "", category: "Science", difficulty: 3 },
  { id:151, korean: "초유체", english: "Superfluid", short: "", category: "Science", difficulty: 4 },
  { id:152, korean: "중력 렌즈", english: "Gravitational Lens", short: "", category: "Science", difficulty: 4 },
  { id:153, korean: "우주배경복사", english: "Cosmic Microwave Background", short: "CMB", category: "Science", difficulty: 4 },
  { id:154, korean: "중성미자", english: "Neutrino", short: "", category: "Science", difficulty: 4 },
  { id:155, korean: "반물질", english: "Antimatter", short: "", category: "Science", difficulty: 3 },
  { id:156, korean: "웜홀", english: "Wormhole", short: "", category: "Science", difficulty: 4 },
  { id:157, korean: "화이트홀", english: "White Hole", short: "", category: "Science", difficulty: 5 },
  { id:158, korean: "블랙홀 증발", english: "Hawking Radiation", short: "", category: "Science", difficulty: 5 },
  { id:159, korean: "외계 생명체 탐사", english: "Astrobiology", short: "", category: "Science", difficulty: 3 },
  { id:160, korean: "생명 기원", english: "Origin of Life", short: "", category: "Science", difficulty: 4 },
  { id:161, korean: "합성생물학", english: "Synthetic Biology", short: "", category: "Science", difficulty: 4 },
  { id:162, korean: "생물모방공학", english: "Biomimicry", short: "", category: "Science", difficulty: 2 },
  { id:163, korean: "탄소 포집", english: "Carbon Capture", short: "CCS", category: "Science", difficulty: 3 },
  { id:164, korean: "그린수소", english: "Green Hydrogen", short: "", category: "Science", difficulty: 3 },
  { id:165, korean: "배터리 재활용", english: "Battery Recycling", short: "", category: "Science", difficulty: 2 },
  { id:166, korean: "전고체 배터리", english: "Solid-State Battery", short: "", category: "Science", difficulty: 3 },
  { id:167, korean: "페로브스카이트 태양전지", english: "Perovskite Solar Cell", short: "", category: "Science", difficulty: 4 },
  { id:168, korean: "양자 센서", english: "Quantum Sensor", short: "", category: "Science", difficulty: 4 },
  { id:169, korean: "양자 통신", english: "Quantum Communication", short: "", category: "Science", difficulty: 4 },
  { id:170, korean: "광집게", english: "Optical Tweezers", short: "", category: "Science", difficulty: 5 },
  { id:171, korean: "DNA 컴퓨팅", english: "DNA Computing", short: "", category: "Science", difficulty: 5 },
  { id:172, korean: "디지털 트윈", english: "Digital Twin", short: "", category: "Science", difficulty: 3 },
  { id:173, korean: "스마트 소재", english: "Smart Materials", short: "", category: "Science", difficulty: 3 },
  { id:174, korean: "메타물질", english: "Metamaterial", short: "", category: "Science", difficulty: 4 },
  { id:175, korean: "3D 바이오프린팅", english: "3D Bioprinting", short: "", category: "Science", difficulty: 4 },
  { id:176, korean: "랩온어칩", english: "Lab-on-a-Chip", short: "", category: "Science", difficulty: 4 },
  { id:177, korean: "마이크로플루이딕스", english: "Microfluidics", short: "", category: "Science", difficulty: 4 },
  { id:178, korean: "오가노이드 지능", english: "Organoid Intelligence", short: "OI", category: "Science", difficulty: 5 },

  /* ---------- Medicine / Biotechnology ---------- */

  { id:179, korean:"GLP-1 비만 치료제", english:"GLP-1 Receptor Agonists", short:"GLP-1", category:"Medicine", difficulty:2 },
  { id:180, korean:"이중 작용 비만 치료제", english:"Dual Agonist Therapy", short:"", category:"Medicine", difficulty:3 },
  { id:181, korean:"RNA 치료제", english:"RNA Therapeutics", short:"", category:"Medicine", difficulty:3 },
  { id:182, korean:"장수 연구", english:"Longevity Research", short:"", category:"Medicine", difficulty:2 },
  { id:183, korean:"노화 역전", english:"Age Reversal", short:"", category:"Medicine", difficulty:3 },
  { id:184, korean:"생물학적 나이", english:"Biological Age", short:"", category:"Medicine", difficulty:2 },
  { id:185, korean:"에피제네틱 시계", english:"Epigenetic Clock", short:"", category:"Medicine", difficulty:3 },
  { id:186, korean:"장내 마이크로바이옴", english:"Human Microbiome", short:"", category:"Medicine", difficulty:2 },
  { id:187, korean:"장-뇌 축", english:"Gut-Brain Axis", short:"", category:"Medicine", difficulty:3 },
  { id:188, korean:"정밀 영양학", english:"Precision Nutrition", short:"", category:"Medicine", difficulty:2 },
  { id:189, korean:"웨어러블 헬스케어", english:"Wearable Healthcare", short:"", category:"Medicine", difficulty:2 },
  { id:190, korean:"디지털 헬스", english:"Digital Health", short:"", category:"Medicine", difficulty:2 },

  /* ---------- AI ---------- */

  { id:191, korean:"범용인공지능", english:"Artificial General Intelligence", short:"AGI", category:"AI", difficulty:2 },
  { id:192, korean:"초지능", english:"Artificial Superintelligence", short:"ASI", category:"AI", difficulty:3 },
  { id:193, korean:"멀티모달 추론", english:"Multimodal Reasoning", short:"", category:"AI", difficulty:3 },
  { id:194, korean:"비디오 생성 AI", english:"Video Generation AI", short:"", category:"AI", difficulty:2 },
  { id:195, korean:"음성 AI", english:"Voice AI", short:"", category:"AI", difficulty:2 },
  { id:196, korean:"실시간 AI", english:"Real-time AI", short:"", category:"AI", difficulty:2 },
  { id:197, korean:"오픈소스 AI", english:"Open-source AI", short:"", category:"AI", difficulty:2 },
  { id:198, korean:"온디바이스 AI", english:"On-device AI", short:"", category:"AI", difficulty:2 },
  { id:199, korean:"AI 거버넌스", english:"AI Governance", short:"", category:"AI", difficulty:3 },
  { id:200, korean:"AI 규제", english:"AI Regulation", short:"", category:"AI", difficulty:2 },
  { id:201, korean:"AI 저작권", english:"AI Copyright", short:"", category:"AI", difficulty:2 },
  { id:202, korean:"딥페이크", english:"Deepfake", short:"", category:"AI", difficulty:2 },
  { id:203, korean:"합성 미디어", english:"Synthetic Media", short:"", category:"AI", difficulty:2 },
  { id:204, korean:"AI 검색", english:"AI Search", short:"", category:"AI", difficulty:2 },
  { id:205, korean:"에이전트 워크플로우", english:"Agent Workflow", short:"", category:"AI", difficulty:3 },

  /* ---------- Nobel Prize ---------- */

  { id:206, korean:"노벨 생리의학상", english:"Nobel Prize in Physiology or Medicine", short:"", category:"Science", difficulty:2 },
  { id:207, korean:"노벨 화학상", english:"Nobel Prize in Chemistry", short:"", category:"Science", difficulty:2 },
  { id:208, korean:"노벨 물리학상", english:"Nobel Prize in Physics", short:"", category:"Science", difficulty:2 },
  { id:209, korean:"AlphaFold", english:"AlphaFold", short:"", category:"Science", difficulty:3 },
  { id:210, korean:"단백질 구조 예측", english:"Protein Structure Prediction", short:"", category:"Science", difficulty:3 },

  /* ---------- Semiconductor ---------- */

  { id:211, korean:"HBM 메모리", english:"High Bandwidth Memory", short:"HBM", category:"Science", difficulty:2 },
  { id:212, korean:"AI 반도체", english:"AI Semiconductor", short:"", category:"Science", difficulty:2 },
  { id:213, korean:"GPU", english:"Graphics Processing Unit", short:"GPU", category:"Science", difficulty:2 },
  { id:214, korean:"NPU", english:"Neural Processing Unit", short:"NPU", category:"Science", difficulty:2 },
  { id:215, korean:"ASML", english:"ASML", short:"", category:"Science", difficulty:2 },
  { id:216, korean:"EUV 노광", english:"Extreme Ultraviolet Lithography", short:"EUV", category:"Science", difficulty:3 },
  { id:217, korean:"파운드리", english:"Foundry", short:"", category:"Science", difficulty:2 },
  { id:218, korean:"칩렛", english:"Chiplet", short:"", category:"Science", difficulty:3 },

  /* ---------- Space ---------- */

  { id:219, korean:"아르테미스 계획", english:"Artemis Program", short:"", category:"Science", difficulty:2 },
  { id:220, korean:"스타십", english:"Starship", short:"", category:"Science", difficulty:2 },
  { id:221, korean:"스페이스X", english:"SpaceX", short:"", category:"Science", difficulty:1 },
  { id:222, korean:"블루 오리진", english:"Blue Origin", short:"", category:"Science", difficulty:1 },
  { id:223, korean:"화성 이주", english:"Mars Colonization", short:"", category:"Science", difficulty:2 },
  { id:224, korean:"외계 생명체", english:"Extraterrestrial Life", short:"", category:"Science", difficulty:2 },
  { id:225, korean:"페르미 역설", english:"Fermi Paradox", short:"", category:"Science", difficulty:3 },
  { id:226, korean:"드레이크 방정식", english:"Drake Equation", short:"", category:"Science", difficulty:3 },
  { id:227, korean:"카르다쇼프 척도", english:"Kardashev Scale", short:"", category:"Science", difficulty:3 },

  /* ---------- Psychology ---------- */

  { id:228, korean:"더닝-크루거 효과", english:"Dunning-Kruger Effect", short:"", category:"Society", difficulty:2 },
  { id:229, korean:"확증편향", english:"Confirmation Bias", short:"", category:"Society", difficulty:2 },
  { id:230, korean:"생존자 편향", english:"Survivorship Bias", short:"", category:"Society", difficulty:2 },
  { id:231, korean:"후광 효과", english:"Halo Effect", short:"", category:"Society", difficulty:2 },
  { id:232, korean:"앵커링 효과", english:"Anchoring Effect", short:"", category:"Society", difficulty:2 },
  { id:233, korean:"손실 회피", english:"Loss Aversion", short:"", category:"Society", difficulty:2 },
  { id:234, korean:"인지 부조화", english:"Cognitive Dissonance", short:"", category:"Society", difficulty:2 },
  { id:235, korean:"피크-엔드 법칙", english:"Peak-End Rule", short:"", category:"Society", difficulty:3 },
  { id:236, korean:"선택의 역설", english:"Paradox of Choice", short:"", category:"Society", difficulty:2 },
  { id:237, korean:"몰입", english:"Flow State", short:"", category:"Society", difficulty:2 },

  /* ---------- Philosophy ---------- */

  { id:238, korean:"테세우스의 배", english:"Ship of Theseus", short:"", category:"Society", difficulty:2 },
  { id:239, korean:"트롤리 딜레마", english:"Trolley Problem", short:"", category:"Society", difficulty:2 },
  { id:240, korean:"중국어 방", english:"Chinese Room", short:"", category:"Society", difficulty:3 },
  { id:241, korean:"시뮬레이션 가설", english:"Simulation Hypothesis", short:"", category:"Society", difficulty:2 },
  { id:242, korean:"파스칼의 내기", english:"Pascal's Wager", short:"", category:"Society", difficulty:2 },
  { id:243, korean:"오컴의 면도날", english:"Occam's Razor", short:"", category:"Society", difficulty:2 },
  { id:244, korean:"결정론", english:"Determinism", short:"", category:"Society", difficulty:2 },

  /* ---------- Economics ---------- */

  { id:245, korean:"게임이론", english:"Game Theory", short:"", category:"Economics", difficulty:2 },
  { id:246, korean:"죄수의 딜레마", english:"Prisoner's Dilemma", short:"", category:"Economics", difficulty:2 },
  { id:247, korean:"내쉬 균형", english:"Nash Equilibrium", short:"", category:"Economics", difficulty:3 },
  { id:248, korean:"블랙스완", english:"Black Swan", short:"", category:"Economics", difficulty:2 },
  { id:249, korean:"안티프래질", english:"Antifragile", short:"", category:"Economics", difficulty:2 },
  { id:250, korean:"승자독식", english:"Winner-Take-All Market", short:"", category:"Economics", difficulty:2 },

  /* ---------- Society ---------- */

  { id:251, korean:"고독 전염", english:"Loneliness Epidemic", short:"", category:"Society", difficulty:2 },
  { id:252, korean:"슬로우 생산성", english:"Slow Productivity", short:"", category:"Society", difficulty:2 },
  { id:253, korean:"딥워크", english:"Deep Work", short:"", category:"Society", difficulty:2 },
  { id:254, korean:"디지털 미니멀리즘", english:"Digital Minimalism", short:"", category:"Society", difficulty:2 },
  { id:255, korean:"조용한 사직", english:"Quiet Quitting", short:"", category:"Society", difficulty:2 },
  { id:256, korean:"롱텀 사고", english:"Longtermism", short:"", category:"Society", difficulty:3 },
  { id:257, korean:"효율적 이타주의", english:"Effective Altruism", short:"", category:"Society", difficulty:3 },
  { id:258, korean:"ESG", english:"Environmental, Social and Governance", short:"ESG", category:"Society", difficulty:2 },
  { id:259, korean:"탄소중립", english:"Net Zero", short:"", category:"Society", difficulty:2 },
  { id:260, korean:"기후 적응", english:"Climate Adaptation", short:"", category:"Society", difficulty:2 },

  /* ---------- Misc ---------- */

  { id:261, korean:"복잡계", english:"Complex Systems", short:"", category:"Science", difficulty:3 },
  { id:262, korean:"창발", english:"Emergence", short:"", category:"Science", difficulty:3 },
  { id:263, korean:"정보이론", english:"Information Theory", short:"", category:"Science", difficulty:3 },
  { id:264, korean:"엔트로피", english:"Entropy", short:"", category:"Science", difficulty:3 },
  { id:265, korean:"카오스 이론", english:"Chaos Theory", short:"", category:"Science", difficulty:3 },
  { id:266, korean:"나비효과", english:"Butterfly Effect", short:"", category:"Science", difficulty:2 },
  { id:267, korean:"프랙탈", english:"Fractal", short:"", category:"Science", difficulty:2 },
  { id:268, korean:"황금비", english:"Golden Ratio", short:"", category:"Science", difficulty:1 },
  { id:269, korean:"무어의 법칙", english:"Moore's Law", short:"", category:"Science", difficulty:2 },
  { id:270, korean:"메트칼프의 법칙", english:"Metcalfe's Law", short:"", category:"Science", difficulty:2 },
  { id:271, korean:"암달의 법칙", english:"Amdahl's Law", short:"", category:"Science", difficulty:3 },
  { id:272, korean:"굿하트의 법칙", english:"Goodhart's Law", short:"", category:"Science", difficulty:2 },
  { id:273, korean:"파킨슨의 법칙", english:"Parkinson's Law", short:"", category:"Science", difficulty:2 },
  { id:274, korean:"호프스태터의 법칙", english:"Hofstadter's Law", short:"", category:"Science", difficulty:3 },
  { id:275, korean:"린디 효과", english:"Lindy Effect", short:"", category:"Science", difficulty:2 },
  { id:276, korean:"세렌디피티", english:"Serendipity", short:"", category:"Science", difficulty:1 },
  { id:277, korean:"안티패턴", english:"Anti-pattern", short:"", category:"Science", difficulty:2 },
  { id:278, korean:"퍼스트 프린시플 사고", english:"First Principles Thinking", short:"", category:"Science", difficulty:2 }
  // ↓ 여기에 이어서 추가하세요. 마지막 항목 뒤에 쉼표(,) 붙이는 것만 잊지 말기.
  // { id: 79, korean: "...", english: "...", short: "", category: "Medicine", difficulty: 3 },
];
