import { Book, PYQQuestion, CurrentAffairItem, CurrentAffairPDF, FreeResource, InstagramPost } from '../types';

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-1',
    title: 'SSC JE Civil Engineering Chapterwise Solved Papers (2007–2024)',
    author: 'YCT Expert Editorial Board',
    publisher: 'Youth Competition Times',
    category: 'SSC JE',
    medium: 'Bilingual',
    originalPrice: 499,
    discountedPrice: 50,
    rating: 4.8,
    reviewsCount: 3420,
    edition: '2026 Revised Edition',
    pages: 940,
    shortDescription: 'All previous year papers with micro-level syllabus breakdown, CBT-1 & CBT-2 analytical answers and high-frequency civil questions.',
    detailedDescription: 'The ultimate repository for civil engineering aspirants targeting SSC JE, RRB JE, and State AE/JE exams. Contains over 8,500+ verified MCQs with step-by-step graphical solutions, IS-Code 456:2000 & 800:2007 references, and topic-wise weightage trends.',
    coverAccent: 'from-amber-600 to-amber-900',
    badge: 'Bestseller',
    keyFeatures: [
      '8,500+ Chapter-wise Solved Questions with IS Code References',
      'Detailed solutions for CBT-1 & new CBT-2 pattern',
      'Color-coded formula summary sheets included in appendix',
      'Subject-wise weightage trend analysis from 2007 to 2024'
    ],
    tableOfContents: [
      'Building Materials & Construction Technology',
      'Surveying & Advanced Geomatics',
      'Soil Mechanics & Foundation Engineering',
      'Theory of Structures & RCC Design (IS 456)',
      'Steel Structures Design (IS 800)',
      'Hydraulics & Fluid Mechanics',
      'Environmental & Public Health Engineering',
      'Highway, Railway & Airport Engineering'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-2',
    title: 'Pinnacle SSC CGL 6800+ TCS MCQ General Studies (5th Edition)',
    author: 'Baljit Dhaka Sir',
    publisher: 'Pinnacle Publications',
    category: 'SSC',
    medium: 'English',
    originalPrice: 450,
    discountedPrice: 50,
    rating: 4.9,
    reviewsCount: 5120,
    edition: '2026 Latest Pattern',
    pages: 780,
    shortDescription: 'Comprehensive chapterwise TCS question bank with error-free explanations for SSC CGL, CHSL, CPO and MTS.',
    detailedDescription: 'Curated specifically for the latest TCS exam interface and question patterns. Divided into History, Polity, Geography, Indian Economy, Static GK, and Science with memory-retention mnemonics.',
    coverAccent: 'from-indigo-600 to-indigo-950',
    badge: 'Exam Vault Recommended',
    keyFeatures: [
      '100% TCS asked questions till latest tier-1 & tier-2 shifts',
      'Static GK special highlight with tables and charts',
      'Smart answer key with elimination techniques',
      'Bilingual keywords index for quick revision'
    ],
    tableOfContents: [
      'Ancient, Medieval & Modern Indian History',
      'Indian Polity & Constitution with Amendments',
      'Physical, Indian & World Geography',
      'Indian Economy & Budget Concepts',
      'Physics, Chemistry & Biology Basics',
      'Static GK: Folk Dances, Festivals, Books & Authors'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-3',
    title: 'Indian Polity for UPSC & State PSC (7th Deluxe Edition)',
    author: 'M. Laxmikanth',
    publisher: 'McGraw Hill Education',
    category: 'UPSC',
    medium: 'English',
    originalPrice: 699,
    discountedPrice: 50,
    rating: 4.95,
    reviewsCount: 12400,
    edition: '7th Revised & Expanded Edition',
    pages: 1120,
    shortDescription: 'The undisputed bible of Indian Polity for UPSC Civil Services, UPPSC, BPSC, MPPSC and competitive government examinations.',
    detailedDescription: 'Essential masterwork covering Constitutional Framework, System of Government, Central and State Government, Local Government, Constitutional & Non-Constitutional Bodies, and Recent Constitutional Amendments including Women Reservation Act and Jammu & Kashmir reorganization updates.',
    coverAccent: 'from-emerald-700 to-teal-950',
    badge: 'Must Have',
    keyFeatures: [
      'Covers all constitutional amendments up to 2025/2026',
      'Chapter-wise UPSC Prelims & Mains analytical model questions',
      'Tabular summaries of articles, constitutional cases & supreme court rulings',
      'Comparison between Indian & world constitutional setups'
    ],
    tableOfContents: [
      'Part I: Constitutional Framework & Preamble',
      'Part II: System of Government & Federal Structure',
      'Part III: Central Government: President, PM & Parliament',
      'Part IV: State Government: Governor, CM & Legislature',
      'Part V: Judiciary: Supreme Court, High Courts & Tribunals',
      'Part VI: Local Government: Panchayati Raj & Municipalities'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-4',
    title: 'Civil Engineering Handbook: Formulae & Key Points',
    author: 'Made Easy Engineering Team',
    publisher: 'Made Easy Publications',
    category: 'AE & JE',
    medium: 'English',
    originalPrice: 350,
    discountedPrice: 50,
    rating: 4.85,
    reviewsCount: 4210,
    edition: '2026 Pocket Edition',
    pages: 420,
    shortDescription: 'Pocket formula handbook for quick memory consolidation for GATE, ESE, State AE, SSC JE and PSU recruitment exams.',
    detailedDescription: 'Compact pocket manual packed with high-yield formulae, key theoretical points, diagrams, and memory aids for all civil engineering subjects. Perfect for last 15-day exam revisions.',
    coverAccent: 'from-sky-700 to-slate-900',
    badge: 'Top Quick Revision',
    keyFeatures: [
      'High-yield formula charts with unit dimensions',
      'IS-Code recommendations summary (IS 456, 800, 1893, 10262)',
      'Crisp hand-drawn diagrams for structural analysis',
      'Pocket size convenient for daily travel study'
    ],
    tableOfContents: [
      'Strength of Materials & Structural Analysis',
      'Reinforced Cement Concrete & Pre-stressed Concrete',
      'Design of Steel Structures',
      'Fluid Mechanics, Open Channel Flow & Hydraulic Machines',
      'Geotechnical & Foundation Engineering',
      'Environmental Engineering & Hydrology'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-5',
    title: 'BlackBook of English Vocabulary (Latest 2026 Edition)',
    author: 'Nikhil Gupta',
    publisher: 'Gupta Publishing House',
    category: 'SSC',
    medium: 'Bilingual',
    originalPrice: 399,
    discountedPrice: 50,
    rating: 4.9,
    reviewsCount: 8900,
    edition: '2026 Edition',
    pages: 640,
    shortDescription: 'The one-stop vocabulary booster with 15,000+ One Word Substitutions, Idioms, Synonyms & Antonyms asked by TCS & SSC.',
    detailedDescription: 'Repeatedly validated by top SSC CGL, CPO, and Banking rankers. Features repetition frequency index so you study the most repeated vocabulary words first before going to low-frequency sets.',
    coverAccent: 'from-zinc-800 to-black',
    badge: 'Ranker Choice',
    keyFeatures: [
      '15,000+ Words with Hindi meanings & English context',
      'Repetition Frequency meter for every word',
      'Dedicated sections for Root Words and Phrasal Verbs',
      '100+ Practice sets with answer keys'
    ],
    tableOfContents: [
      'One Word Substitutions (Repeated 5+ times in SSC)',
      'Idioms and Phrases categorized by theme',
      'Synonyms and Antonyms with contextual usage',
      'Spelling Test common traps',
      'Root Word etymology method'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-6',
    title: 'State PSC General Studies 20,000+ Topicwise PYQ Compendium',
    author: 'Ghatna Chakra Editorial Board',
    publisher: 'Samarthya Samiksha',
    category: 'State PSC',
    medium: 'Hindi',
    originalPrice: 550,
    discountedPrice: 50,
    rating: 4.75,
    reviewsCount: 2980,
    edition: 'Purvalokan 2026',
    pages: 820,
    shortDescription: 'Extensive topic-wise solved bank covering UPPSC, BPSC, MPPSC, UKPSC, RAS, and JPSC civil services previous exams.',
    detailedDescription: 'The premier Hindi medium question bank trusted by lakhs of North Indian aspirants. Features exhaustive explanations with cross-referenced NCERT citations.',
    coverAccent: 'from-orange-700 to-amber-950',
    badge: 'Hindi Medium Hit',
    keyFeatures: [
      'Covers 30 years of State PSC Prelims questions',
      'Authentic explanations with NCERT page references',
      'Special state-specific GK and budget modules',
      'Error-free validated answer keys'
    ],
    tableOfContents: [
      'Bhartiya Itihas evam Rashtriya Andolan',
      'Bhartiya Rajvyavastha evam Samvidhan',
      'Bharat evam Vishwa ka Bhugol',
      'Bhartiya Arthvyavastha evam Krishi',
      'Samanya Vigyan (Bhautiki, Rasayan, Jeev Vigyan)'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-7',
    title: 'RRB NTPC & Group D Complete Stage 1 & 2 Master Guide',
    author: 'Kiran Institute of Career Excellence',
    publisher: 'Kiran Publication',
    category: 'Railway',
    medium: 'Bilingual',
    originalPrice: 450,
    discountedPrice: 50,
    rating: 4.65,
    reviewsCount: 3100,
    edition: '2026 Edition',
    pages: 690,
    shortDescription: 'All-in-one preparation package for Railway Recruitment Board Non-Technical Popular Categories & Group D exams.',
    detailedDescription: 'Covers General Awareness, Mathematics, and General Intelligence & Reasoning with 45 full-length mock papers and previous railway shift questions.',
    coverAccent: 'from-rose-700 to-rose-950',
    badge: 'High Value',
    keyFeatures: [
      'Comprehensive coverage of CBT 1 and CBT 2',
      'Speed math shortcuts and Vedic calculation hacks',
      'Railway specific general science question bank',
      '5 Free Online mock test codes inside'
    ],
    tableOfContents: [
      'Arithmetic & Quantitative Techniques',
      'Analytical & Logical Reasoning',
      'Physics, Chemistry & Life Sciences',
      'Indian Railways History, Zones & Current Statistics'
    ],
    buyLink: 'https://amazon.in'
  },
  {
    id: 'book-8',
    title: 'Ace Quantitative Aptitude & Data Interpretation for Banking',
    author: 'Adda247 Team of Experts',
    publisher: 'Adda247',
    category: 'Banking',
    medium: 'English',
    originalPrice: 450,
    discountedPrice: 50,
    rating: 4.8,
    reviewsCount: 3890,
    edition: '5th Edition 2026',
    pages: 590,
    shortDescription: 'Specially crafted for SBI PO/Clerk, IBPS PO/Clerk, and RBI Grade B with advanced caselet DI and arithmetic shortcuts.',
    detailedDescription: 'Master the high-difficulty quant and DI sections. Covers missing number series, quadratic equations, high-level radar and arithmetic-based DI cases for bank mains exams.',
    coverAccent: 'from-teal-700 to-cyan-950',
    badge: 'Banking Essential',
    keyFeatures: [
      'Tiered difficulty: Foundation, Moderate, High-Level Mains',
      '100+ Caselet & Arithmetic Data Interpretation sets',
      'Step-by-step video solution QR codes for tricky problems',
      'Speed calculation drill sheets'
    ],
    tableOfContents: [
      'Simplification, Approximation & Number Series',
      'Arithmetic Word Problems (Profit/Loss, Time/Work, SI/CI)',
      'Data Sufficiency & Inequality',
      'Tabular, Bar, Pie & Radar Data Interpretation',
      'Advanced Caselet & Variable-based DI'
    ],
    buyLink: 'https://amazon.in'
  }
];

export const DAILY_PYQS: PYQQuestion[] = [
  {
    id: 'pyq-today',
    exam: 'SSC JE Civil Engineering',
    subject: 'Concrete Technology & Building Materials',
    subtopic: 'Workability & Slump Cone Test',
    year: 2024,
    difficulty: 'Moderate',
    question: 'As per IS 456:2000, what is the specified slump range for concrete used in normal RCC work (beams, slabs, columns) with light reinforcement and manual compaction?',
    options: [
      { id: 'A', text: '10 mm to 25 mm' },
      { id: 'B', text: '25 mm to 75 mm' },
      { id: 'C', text: '100 mm to 150 mm' },
      { id: 'D', text: '175 mm to 200 mm' }
    ],
    correctOption: 'B',
    explanation: 'According to IS 456:2000 (Clause 7.1, Table 2): For normal RCC work such as lightly reinforced sections in slabs, beams, walls, and columns compacted manually, the required degree of workability is "Low to Medium" and the specified slump value ranges from 25 mm to 75 mm. Very low workability (0-25 mm) is used for vibrated concrete in roads, while high workability (100-150 mm) is used for tremie pipe concreting or pumped concrete.',
    keyFormulaOrRule: 'Rule: IS 456:2000 Table 2 — Light RCC: 25–75 mm | Heavily reinforced RCC: 50–100 mm | Tremie: 150–200 mm',
    isTodaySpecial: true
  },
  {
    id: 'pyq-2',
    exam: 'UPSC Civil Services Prelims',
    subject: 'Indian Polity & Governance',
    subtopic: 'Fundamental Rights & Writs',
    year: 2023,
    difficulty: 'Challenging',
    question: 'With reference to the Writs issued by the Supreme Court and High Courts in India, consider the following statements:\n1. Quo-Warranto can be sought even by a non-aggrieved person.\n2. Mandamus cannot be issued against a private individual or body.\n3. Certiorari is issued only to judicial or quasi-judicial bodies and never to administrative authorities.\nWhich of the statements given above are correct?',
    options: [
      { id: 'A', text: '1 and 2 only' },
      { id: 'B', text: '2 and 3 only' },
      { id: 'C', text: '1 and 3 only' },
      { id: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'A',
    explanation: 'Statement 1 is correct: The writ of Quo-Warranto is an exception to the rule of Locus Standi; any interested citizen can file it to challenge illegal usurpation of a substantive public office. Statement 2 is correct: Mandamus lies only against a public authority, official, or statutory body to perform a public duty, not against purely private individuals or private contracts. Statement 3 is INCORRECT: In 1991, the Supreme Court ruled that Certiorari can also be issued against administrative authorities affecting rights of individuals (not restricted to judicial/quasi-judicial bodies).',
    keyFormulaOrRule: 'Constitutional Articles: Article 32 (Supreme Court) & Article 226 (High Courts — wider jurisdiction)',
    isTodaySpecial: false
  },
  {
    id: 'pyq-3',
    exam: 'SSC CGL Tier 1',
    subject: 'Quantitative Aptitude',
    subtopic: 'Time and Work',
    year: 2024,
    difficulty: 'Moderate',
    question: 'A can complete a piece of work in 18 days, and B can complete it in 24 days. They began the work together, but A left 4 days before the scheduled completion. How many total days did it take to finish the work?',
    options: [
      { id: 'A', text: '11.5 days' },
      { id: 'B', text: '12.57 days' },
      { id: 'C', text: '13.2 days' },
      { id: 'D', text: '10 days' }
    ],
    correctOption: 'B',
    explanation: 'Total work = LCM(18, 24) = 72 units.\nEfficiency of A = 72 / 18 = 4 units/day.\nEfficiency of B = 72 / 24 = 3 units/day.\nCombined efficiency of A + B = 4 + 3 = 7 units/day.\nIn the last 4 days, only B worked: 4 × 3 = 12 units.\nRemaining work done by A + B together = 72 - 12 = 60 units.\nDays worked together = 60 / 7 = 8.57 days.\nTotal days to complete work = 8.57 + 4 = 12.57 days.',
    keyFormulaOrRule: 'Short Trick: Total Days = (Total Work + Work added by leaving person) / Combined Efficiency = (72 + 4×4) / 7 = 88 / 7 = 12.57 days.',
    isTodaySpecial: false
  },
  {
    id: 'pyq-4',
    exam: 'State AE & JE Engineering',
    subject: 'Fluid Mechanics',
    subtopic: 'Flow Through Pipes & Reynolds Number',
    year: 2023,
    difficulty: 'Easy',
    question: 'In a circular pipe of diameter D flowing full with a fluid of kinematic viscosity ν and mean velocity V, the flow is definitively laminar if the Reynolds Number (Re) is:',
    options: [
      { id: 'A', text: 'Less than 2000' },
      { id: 'B', text: 'Between 2000 and 4000' },
      { id: 'C', text: 'Greater than 4000' },
      { id: 'D', text: 'Greater than 10000' }
    ],
    correctOption: 'A',
    explanation: 'For flow through circular closed pipes: Re < 2000 indicates Laminar flow (viscous forces dominate); 2000 < Re < 4000 is Transition flow; Re > 4000 indicates Turbulent flow. Note that for open channels, laminar flow occurs when Re < 500, and for flow between parallel plates when Re < 1000.',
    keyFormulaOrRule: 'Re = (ρ × V × D) / μ = (V × D) / ν',
    isTodaySpecial: false
  },
  {
    id: 'pyq-5',
    exam: 'Railway RRB NTPC',
    subject: 'General Science',
    subtopic: 'Human Physiology & Vitamins',
    year: 2023,
    difficulty: 'Easy',
    question: 'Which of the following vitamins is water-soluble and functions as an essential coenzyme in cellular energy metabolism, whose severe deficiency causes Beriberi?',
    options: [
      { id: 'A', text: 'Vitamin A (Retinol)' },
      { id: 'B', text: 'Vitamin B1 (Thiamine)' },
      { id: 'C', text: 'Vitamin D (Calciferol)' },
      { id: 'D', text: 'Vitamin K (Phylloquinone)' }
    ],
    correctOption: 'B',
    explanation: 'Vitamin B1 (chemical name: Thiamine) is a water-soluble vitamin. Its deficiency impairs pyruvate oxidation and leads to Beriberi (wet Beriberi affects cardiovascular system; dry Beriberi affects nervous system) and Wernicke-Korsakoff syndrome. Vitamins A, D, E, and K are fat-soluble vitamins.',
    keyFormulaOrRule: 'Mnemonic: Fat soluble = "KEDA" | Water soluble = "B and C"',
    isTodaySpecial: false
  }
];

export const CURRENT_AFFAIRS_ITEMS: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    date: 'September 28, 2026',
    category: 'Science & Tech',
    headline: 'ISRO Unveils Shukrayaan-1 Venus Orbiter Launch Timeline & Advanced Synthetic Aperture Radar',
    summary: 'The Indian Space Research Organisation has finalized payloads and trajectory for India\'s maiden mission to Venus, scheduled aboard LVM3 with subsurface radar sounding capabilities.',
    bulletPoints: [
      'Equipped with High-Resolution Synthetic Aperture Radar (SAR) and infrared thermal cameras.',
      'Aims to study Venusian atmospheric chemistry, dense carbon dioxide mantle, and geological active zones.',
      'Approved budget allocation under the revised deep space planetary exploration mission umbrella.'
    ],
    examRelevance: 'UPSC Prelims GS-3 (Science & Tech) / SSC CGL General Awareness'
  },
  {
    id: 'ca-2',
    date: 'September 27, 2026',
    category: 'Economy',
    headline: 'RBI Extends Digital Rupee (e-Rupee) Offline Transaction Protocol to Remote & Offline Tribal Districts',
    summary: 'The Reserve Bank of India has expanded Central Bank Digital Currency (CBDC) pilot features allowing near-field communication (NFC) offline token payments without internet connectivity.',
    bulletPoints: [
      'Uses dual-token cryptography to prevent double spending during network blackouts.',
      'Integrated with village cooperative banks and regional rural banks (RRBs).',
      'Targeted at expanding financial inclusion under PM Jan Dhan Yojana.'
    ],
    examRelevance: 'Banking IBPS/SBI PO Mains (Banking Awareness) / UPSC GS-3 (Indian Economy)'
  },
  {
    id: 'ca-3',
    date: 'September 26, 2026',
    category: 'National',
    headline: 'Supreme Court 7-Judge Constitution Bench Delivers Landmark Verdict on State Powers for Sub-Classification within SC/ST Reservations',
    summary: 'The apex court upheld constitutional validity of states identifying more backward groups within Scheduled Castes and Scheduled Tribes for preferential quota allocation, with strict quantifiable empirical data requisites.',
    bulletPoints: [
      'Interpreted Article 341 and Article 16(4) of the Indian Constitution.',
      'Overruled previous 2004 E.V. Chinnaiah judgment.',
      'Mandated that states cannot grant 100% reservation to any single sub-caste.'
    ],
    examRelevance: 'UPSC GS-2 (Polity & Constitution) / State PSC Prelims'
  },
  {
    id: 'ca-4',
    date: 'September 25, 2026',
    category: 'Sports',
    headline: 'India Secures Record 28 Medals at Asian Athletics Championships; Neeraj Chopra Sets New Continental Record',
    summary: 'Indian athletics contingent finished 2nd overall in the medals tally, featuring gold in javelin throw, women\'s 400m hurdles, and men\'s 3000m steeplechase.',
    bulletPoints: [
      'Neeraj Chopra threw an 89.94m monster throw in round three to clinch gold.',
      'Parul Chaudhary broke the national record in women\'s 5000m.',
      'Host city for the upcoming 2027 edition confirmed as New Delhi.'
    ],
    examRelevance: 'SSC CGL / Railway RRB NTPC / State Police SI'
  }
];

export const CURRENT_AFFAIRS_PDFS: CurrentAffairPDF[] = [
  {
    id: 'pdf-1',
    title: 'September 2026 Comprehensive Monthly Current Affairs Digest',
    month: 'September',
    year: 2026,
    pages: 64,
    fileSize: '4.8 MB',
    type: 'Monthly Digest',
    downloadCount: '48.2k'
  },
  {
    id: 'pdf-2',
    title: '500 High-Frequency One-Liners for Upcoming SSC & Railway Exams',
    month: 'September',
    year: 2026,
    pages: 28,
    fileSize: '2.1 MB',
    type: 'One-Liner Capsule',
    downloadCount: '62.4k'
  },
  {
    id: 'pdf-3',
    title: 'August 2026 National & International Complete Revision Capsule',
    month: 'August',
    year: 2026,
    pages: 58,
    fileSize: '4.2 MB',
    type: 'Monthly Digest',
    downloadCount: '89.1k'
  },
  {
    id: 'pdf-4',
    title: 'Economic Survey & Union Budget Special MCQs Handbook 2026',
    month: 'Special',
    year: 2026,
    pages: 42,
    fileSize: '3.4 MB',
    type: 'Topic Special',
    downloadCount: '73.6k'
  }
];

export const ONE_LINERS = [
  { id: 'ol-1', topic: 'Appointments', text: 'Justice B.R. Gavai sworn in as the 52nd Chief Justice of India.', exam: 'UPSC / SSC' },
  { id: 'ol-2', topic: 'Science', text: 'India\'s deep sea exploration submersible "MATSYA 6000" completes harbor trials.', exam: 'UPSC GS-3' },
  { id: 'ol-3', topic: 'Economy', text: 'India emerges as the world\'s 4th largest economy surpassing Japan in nominal GDP.', exam: 'Banking / SSC' },
  { id: 'ol-4', topic: 'Environment', text: 'Kaziranga National Park reports zero rhino poaching incidents for the second straight calendar year.', exam: 'UPSC / State PSC' },
  { id: 'ol-5', topic: 'Defence', text: 'Exercise "Tarang Shakti 2026", largest multinational air exercise, held at Jodhpur.', exam: 'CDS / NDA / SSC' },
  { id: 'ol-6', topic: 'Indices', text: 'India climbs to 38th rank on the World Bank Logistics Performance Index (LPI).', exam: 'UPSC / Banking' }
];

export const FREE_RESOURCES: FreeResource[] = [
  {
    id: 'res-1',
    title: 'SSC JE Civil Engineering 10-Year Subjectwise PYQ Repository (2014-2024)',
    category: 'Engineering PYQ',
    exam: 'SSC JE / State AE',
    format: 'PDF',
    size: '18.4 MB',
    downloads: '142K+',
    description: 'Over 3,200 verified questions segregated by Building Materials, Survey, RCC, Soil, FM and Steel with official keys.',
    isPopular: true
  },
  {
    id: 'res-2',
    title: 'UPSC CSE Prelims: 25 Years Topic-wise Solved Papers (Polity, History, Economy)',
    category: 'Civil Services',
    exam: 'UPSC / State PSC',
    format: 'PDF',
    size: '22.1 MB',
    downloads: '98K+',
    description: 'Detailed analysis of trends from 2000 to 2025 with analytical elimination tricks and NCERT references.',
    isPopular: true
  },
  {
    id: 'res-3',
    title: 'Civil Engineering Formula Pocketbook (All IS Code Clauses at a Glance)',
    category: 'Formulas',
    exam: 'AE & JE Exams',
    format: 'Formula Sheet',
    size: '6.5 MB',
    downloads: '85K+',
    description: 'Concise 40-page pocketbook with every vital equation from SOM, RCC, Steel, Hydrology and Geotech.',
    isPopular: true
  },
  {
    id: 'res-4',
    title: 'SSC CGL Tier 1 & 2 Quantitative Aptitude 100 Golden Formulae & Short Tricks',
    category: 'Speed Math',
    exam: 'SSC CGL / CHSL',
    format: 'Formula Sheet',
    size: '4.8 MB',
    downloads: '110K+',
    description: 'Geometry theorems, Algebra symmetric identities, and Mensuration 3D formula cheatsheet.',
    isPopular: false
  },
  {
    id: 'res-5',
    title: 'Indian Constitution at a Glance: Articles 1 to 395 Quick Revision Mindmap',
    category: 'Polity Notes',
    exam: 'All Competitive Exams',
    format: 'Notes',
    size: '8.2 MB',
    downloads: '76K+',
    description: 'Color-coded visual chart for all parts, schedules, fundamental rights, and key constitutional amendments.',
    isPopular: false
  },
  {
    id: 'res-6',
    title: 'Railway RRB NTPC & Group D 2026 Official Syllabus & Shift Analysis Breakdown',
    category: 'Exam Strategy',
    exam: 'Railway RRB',
    format: 'PDF',
    size: '3.1 MB',
    downloads: '64K+',
    description: 'Shift-wise cutoffs, negative marking guidelines, and topic-wise expected question distribution.',
    isPopular: false
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'carousel',
    title: 'Civil Engineering: 10 Repeated Slump & Concrete Questions in SSC JE',
    caption: 'Save this post before your exam! 📌 Every year SSC JE asks at least 3 direct questions from IS 456 Table 2 (Workability & Slump values). Here is the exact cheat sheet you must remember.',
    tags: ['#SSCJE', '#CivilEngineering', '#ExamVault', '#GovtJobs', '#EngineeringAspirants'],
    likes: '14.8K',
    saves: '5.2K',
    comments: '342',
    date: '1 day ago',
    graphicType: 'pyq',
    badge: '10 High-Yield PYQs',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'ig-2',
    type: 'reel',
    title: 'The "Elimination Method" That Helped Me Clear SSC CGL GS in 1st Attempt',
    caption: 'Stop attempting GS like a gamble! Use the "Extreme Word Rule" and "Constitutional Timeline Filter" to eliminate at least 2 wrong options in every single MCQs. Watch till the end!',
    tags: ['#SSCCGL', '#CGL2026', '#ExamTips', '#StudyHacks', '#ExamVault'],
    likes: '28.4K',
    saves: '12.1K',
    comments: '890',
    date: '3 days ago',
    graphicType: 'tips',
    badge: 'Reel • 120k Views',
    bgGradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'ig-3',
    type: 'post',
    title: 'Book Review: Youth Competition (YCT) vs Made Easy for AE & JE Civil',
    caption: 'Confused between YCT and Made Easy for your upcoming State AE or SSC JE? We did a brutal side-by-side comparison on Question Count, Error Rate, IS Code explanation depth, and Price. Read the verdict.',
    tags: ['#BookReview', '#CivilEngineering', '#MadeEasy', '#YCT', '#ExamVault'],
    likes: '11.2K',
    saves: '4.8K',
    comments: '215',
    date: '5 days ago',
    graphicType: 'book_review',
    badge: 'Book Showdown',
    bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'ig-4',
    type: 'carousel',
    title: 'Indian Polity: 5 Writs under Article 32 Simplified with Real Court Cases',
    caption: 'Habeas Corpus, Mandamus, Prohibition, Certiorari & Quo-Warranto. Never get confused in UPSC or State PSC again. Swipe left for visual case examples and memory mnemonics! 🇮🇳',
    tags: ['#UPSC', '#IndianPolity', '#Laxmikanth', '#Article32', '#ExamVault'],
    likes: '19.6K',
    saves: '8.4K',
    comments: '460',
    date: '1 week ago',
    graphicType: 'formula',
    badge: 'Polity Revision',
    bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'ig-5',
    type: 'reel',
    title: 'Top 5 Current Affairs Topics Guaranteed in October-November Exams',
    caption: 'Analysis of last 5 years question papers shows 80% current affairs come from these 5 repeating themes: Submersible missions, Supreme Court constitutional benches, CBDC updates, and Sports records.',
    tags: ['#CurrentAffairs', '#DailyCA', '#ExamVault', '#GovtExams'],
    likes: '22.3K',
    saves: '9.6K',
    comments: '512',
    date: '1 week ago',
    graphicType: 'current_affairs',
    badge: 'Reel • 165k Views',
    bgGradient: 'from-rose-500/20 via-pink-500/10 to-transparent'
  },
  {
    id: 'ig-6',
    type: 'post',
    title: 'Daily Aspirant Motivation: When You Feel Like Quitting',
    caption: 'Your roll number in that final PDF is worth every sacrifice, every late night with cold tea, and every missed festival. Keep going warrior. Exam Vault is standing right beside you! 🇮🇳🔥',
    tags: ['#AspirantLife', '#Motivation', '#GovtJobDream', '#ExamVaultFamily'],
    likes: '35.1K',
    saves: '14.2K',
    comments: '1,240',
    date: '2 weeks ago',
    graphicType: 'motivation',
    badge: 'Community Voice',
    bgGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent'
  }
];

export const EXAM_CATEGORIES_INFO = [
  {
    id: 'SSC',
    name: 'SSC',
    fullName: 'Staff Selection Commission',
    examsIncluded: 'CGL, CHSL, MTS, CPO, GD Constable',
    badge: 'High Vacancies',
    description: 'Comprehensive resources, TCS pattern question banks, and speed reasoning tricks.',
    iconName: 'Building2',
    resourceCount: '48+ Books & PYQs',
    colorTheme: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'SSC JE',
    name: 'SSC JE',
    fullName: 'Junior Engineer (Civil, Elec, Mech)',
    examsIncluded: 'CPWD, MES, CWC, BRO & Border Roads',
    badge: 'CBT 1 & 2 Ready',
    description: 'Technical chapterwise papers, IS-Code formula handbooks, and conventional solved sets.',
    iconName: 'HardHat',
    resourceCount: '62+ Books & Notes',
    colorTheme: 'from-amber-500 to-orange-600'
  },
  {
    id: 'UPSC',
    name: 'UPSC',
    fullName: 'Civil Services Examination (CSE)',
    examsIncluded: 'IAS, IPS, IFS, IRS & Central Services',
    badge: 'Standard References',
    description: 'M. Laxmikanth, NCERT summaries, GS Prelims PYQs, and answer writing blueprints.',
    iconName: 'Award',
    resourceCount: '36+ Standard Guides',
    colorTheme: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'State PSC',
    name: 'State PSC',
    fullName: 'Public Service Commissions',
    examsIncluded: 'UPPSC, BPSC, MPPSC, RAS, UKPSC, WBPSC',
    badge: 'State GK Included',
    description: 'Ghatna Chakra Purvalokan, state specific geography & budget digests in Hindi and English.',
    iconName: 'GraduationCap',
    resourceCount: '54+ Solved Banks',
    colorTheme: 'from-orange-600 to-rose-700'
  },
  {
    id: 'AE & JE',
    name: 'AE & JE',
    fullName: 'Assistant & Junior Engineer (State)',
    examsIncluded: 'State PWD, Irrigation, Electricity Boards, Metro',
    badge: 'Technical Core',
    description: 'Handbooks, formula capsules, non-tech aptitude modules, and state AE exam papers.',
    iconName: 'Compass',
    resourceCount: '42+ Handbooks',
    colorTheme: 'from-sky-600 to-blue-700'
  },
  {
    id: 'Railway',
    name: 'Railway',
    fullName: 'Railway Recruitment Board (RRB)',
    examsIncluded: 'RRB NTPC, Group D, ALP, RRB JE, RPF SI',
    badge: '2026 Recruitment',
    description: 'Railway general science, rapid math shortcuts, and previous years online shift tests.',
    iconName: 'Train',
    resourceCount: '31+ Practice Sets',
    colorTheme: 'from-red-600 to-rose-700'
  },
  {
    id: 'Banking',
    name: 'Banking',
    fullName: 'IBPS, SBI & RBI Examinations',
    examsIncluded: 'SBI PO, IBPS PO, Clerk, RBI Grade B, SO',
    badge: 'Speed Drills',
    description: 'High-level puzzle modules, caselet data interpretation, and banking awareness compendiums.',
    iconName: 'Landmark',
    resourceCount: '28+ Fast Tracks',
    colorTheme: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'Other Exams',
    name: 'Other Government Exams',
    fullName: 'Defence, Teaching & Police',
    examsIncluded: 'CDS, NDA, AFCAT, CTET, DSSSB, State Police SI',
    badge: 'Updated Pattern',
    description: 'Defence general knowledge, pedagogical modules, and all-India police recruitment papers.',
    iconName: 'ShieldAlert',
    resourceCount: '35+ Guides',
    colorTheme: 'from-purple-600 to-violet-700'
  }
];
