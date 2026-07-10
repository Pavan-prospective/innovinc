export const CATEGORIES = [
  { id: '1', name: 'Medicine & Health', icon: 'Stethoscope' },
  { id: '2', name: 'Engineering', icon: 'Cog' },
  { id: '3', name: 'Computer Science', icon: 'Monitor' },
  { id: '4', name: 'Artificial Intelligence', icon: 'Cpu' },
  { id: '5', name: 'Business & Economics', icon: 'TrendingUp' },
  { id: '6', name: 'Education', icon: 'Book' },
  { id: '7', name: 'Psychology', icon: 'Brain' },
  { id: '8', name: 'Biology', icon: 'Dna' },
]

export const JOURNALS = [
  {
    id: 'j1',
    title: 'Innovinc in Acoustics',
    category: 'Engineering',
    impactFactor: '4.5',
    latestIssue: 'Vol. 12, Issue 4 (2025)',
    description: 'Covering all areas of acoustics, including metamaterials, noise control, and sound perception.',
    coverImage: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-1111',
    editors: 'Massimo Ruzzene',
    chiefEditor: { name: 'Massimo Ruzzene', affiliation: 'University of Colorado Boulder, Boulder, United States' },
    stats: { sections: 4, articles: 37, views: 135001 },
    publishedYear: '2024',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Acoustic Materials, Noise Control and Sound Perception', path: '/journals/j1/sections/acoustic-materials' },
      { name: 'Acoustic Metamaterials', path: '/journals/j1/sections/acoustic-metamaterials' },
      { name: 'Acoustofluidics', path: '/journals/j1/sections/acoustofluidics' },
      { name: 'Ultrasound Technologies', path: '/journals/j1/sections/ultrasound-technologies' }
    ],
    aboutJournal: [
      { name: 'Scope', path: '/journals/j1/about/scope' },
      { name: 'Field Chief Editor', path: '/journals/j1/about/field-chief-editor' },
      { name: 'Mission and Scope', path: '/journals/j1/about/mission-and-scope' }
    ],
    forAuthors: [
      { name: 'Author Guidelines', path: '/journals/j1/authors/author-guidelines' },
      { name: 'Publishing Fees', path: '/journals/j1/authors/publishing-fees' }
    ]
  },
  {
    id: 'j2',
    title: 'Innovinc in Cancer Epidemiology',
    category: 'Medicine & Health',
    impactFactor: '7.2',
    latestIssue: 'Vol. 8, Issue 1 (2025)',
    description: 'Cancer Epidemiology explores the patterns, causes, and global burden of cancer across diverse populations.',
    coverImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1532187863486-abf9db5148d3?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-2222',
    editors: 'Sarah Chen',
    chiefEditor: { name: 'Dr. Sarah Chen', affiliation: 'Stanford University School of Medicine, United States' },
    stats: { sections: 6, articles: 124, views: 504200 },
    publishedYear: '2025',
    imprint: 'InnovInc Tech Press',
    language: 'English',
    sections: [
      { name: 'Cancer Biomarkers', path: '/journals/j2/sections/biomarkers' },
      { name: 'Population Genetics', path: '/journals/j2/sections/genetics' },
      { name: 'Environmental Oncology', path: '/journals/j2/sections/environmental' }
    ],
    aboutJournal: [
      { name: 'Scope', path: '/journals/j2/about/scope' },
      { name: 'Editorial Board', path: '/journals/j2/about/editorial-board' }
    ],
    forAuthors: [
      { name: 'Author Guidelines', path: '/journals/j2/authors/author-guidelines' }
    ]
  },
  {
    id: 'j3',
    title: 'Acta Biochimica Polonica',
    category: 'Biology',
    impactFactor: '5.8',
    latestIssue: 'Vol. 3, Issue 2 (2025)',
    description: 'Acta Biochimica Polonica (ABP) is the Open Access journal publishing research on enzymology, metabolism, membranes and bioenergetics.',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-3333',
    editors: 'Michael Roberts',
    chiefEditor: { name: 'Prof. Michael Roberts', affiliation: 'University of Oxford, United Kingdom' },
    stats: { sections: 3, articles: 89, views: 250000 },
    publishedYear: '2024',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Enzymology', path: '/journals/j3/sections/enzymology' },
      { name: 'Bioenergetics', path: '/journals/j3/sections/bioenergetics' },
      { name: 'Macromolecules', path: '/journals/j3/sections/macromolecules' }
    ],
    aboutJournal: [
      { name: 'Scope', path: '/journals/j3/about/scope' }
    ],
    forAuthors: [
      { name: 'Submission Checklist', path: '/journals/j3/authors/checklist' }
    ]
  },
  {
    id: 'j4',
    title: 'Innovinc in Artificial Intelligence',
    category: 'Computer Science',
    impactFactor: '8.9',
    latestIssue: 'Vol. 2, Issue 6 (2025)',
    description: 'Pioneering research in deep learning, neural networks, natural language processing, and computer vision.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-4444',
    editors: 'Elena Rodriguez',
    chiefEditor: { name: 'Dr. Elena Rodriguez', affiliation: 'MIT, United States' },
    stats: { sections: 8, articles: 210, views: 890120 },
    publishedYear: '2025',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Machine Learning', path: '/journals/j4/sections/ml' },
      { name: 'Computer Vision', path: '/journals/j4/sections/cv' },
      { name: 'Robotics', path: '/journals/j4/sections/robotics' }
    ],
    aboutJournal: [
      { name: 'Scope', path: '/journals/j4/about/scope' }
    ],
    forAuthors: [
      { name: 'Author Guidelines', path: '/journals/j4/authors/author-guidelines' }
    ]
  },
  {
    id: 'j5',
    title: 'Molecular Oncology & Cancer Genomics',
    category: 'Medicine & Health',
    impactFactor: '7.2',
    latestIssue: 'Vol. 8, Issue 1 (2025)',
    description: 'Molecular Oncology and Cancer Genomics explore the genetic and molecular mechanisms that drive cancer development, progression, and treatment response. Advances in genomic sequencing, biomarker discovery, and precision medicine have transformed cancer diagnosis by enabling personalized therapeutic strategies tailored to individual patients.',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9db5148d3?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1532187863486-abf9db5148d3?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-2222',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. John Doe', affiliation: 'Harvard University, United States' },
    stats: { sections: 3, articles: 56, views: 240500 },
    publishedYear: '2025',
    imprint: 'InnovInc Tech Press',
    language: 'English',
    sections: [
      { name: 'Tumor Biology', path: '/journals/j5/sections/tumor-biology' },
      { name: 'Genetic Mechanisms', path: '/journals/j5/sections/genetic-mechanisms' },
      { name: 'Biomarkers', path: '/journals/j5/sections/biomarkers' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j5/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j5/authors/author-guidelines' } ]
  },
  {
    id: 'j6',
    title: 'Cancer Prevention & Early Detection',
    category: 'Medicine & Health',
    impactFactor: '5.8',
    latestIssue: 'Vol. 3, Issue 2 (2025)',
    description: 'Cancer Prevention and Early Detection focus on reducing cancer risk and improving survival through proactive healthcare strategies, lifestyle interventions, and advanced screening technologies. Research in this field explores risk factors, genetic predisposition, environmental influences, and preventive measures.',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-3333',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. Jane Smith', affiliation: 'Yale University, United States' },
    stats: { sections: 4, articles: 89, views: 320000 },
    publishedYear: '2024',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Screening Programs', path: '/journals/j6/sections/screening-programs' },
      { name: 'Risk Reduction', path: '/journals/j6/sections/risk-reduction' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j6/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j6/authors/author-guidelines' } ]
  },
  {
    id: 'j7',
    title: 'Surgical Oncology',
    category: 'Medicine & Health',
    impactFactor: '3.9',
    latestIssue: 'Vol. 15, Issue 6 (2025)',
    description: 'Surgical Oncology is a specialized field dedicated to the diagnosis, staging, and surgical management of cancer. It plays a vital role in the treatment of solid tumors through advanced surgical techniques aimed at achieving complete tumor removal while preserving organ function and improving patient quality of life.',
    coverImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-4444',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. Alan Grant', affiliation: 'Johns Hopkins, United States' },
    stats: { sections: 5, articles: 110, views: 450000 },
    publishedYear: '2025',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Surgical Techniques', path: '/journals/j7/sections/surgical-techniques' },
      { name: 'Minimally Invasive Approaches', path: '/journals/j7/sections/minimally-invasive' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j7/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j7/authors/author-guidelines' } ]
  },
  {
    id: 'j8',
    title: 'Radiation Oncology',
    category: 'Medicine & Health',
    impactFactor: '4.1',
    latestIssue: 'Vol. 5, Issue 2 (2025)',
    description: 'Radiation Oncology is a specialized branch of cancer treatment that uses high-energy radiation to destroy cancer cells, shrink tumors, and prevent disease recurrence while minimizing damage to surrounding healthy tissues.',
    coverImage: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-5555',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. Marie Curie', affiliation: 'Institut Curie, France' },
    stats: { sections: 3, articles: 45, views: 180000 },
    publishedYear: '2024',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Radiotherapy Techniques', path: '/journals/j8/sections/radiotherapy-techniques' },
      { name: 'Treatment Planning', path: '/journals/j8/sections/treatment-planning' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j8/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j8/authors/author-guidelines' } ]
  },
  {
    id: 'j9',
    title: 'Medical Oncology & Chemotherapy',
    category: 'Medicine & Health',
    impactFactor: '6.5',
    latestIssue: 'Vol. 10, Issue 1 (2025)',
    description: 'Medical Oncology and Chemotherapy focus on the diagnosis, systemic treatment, and comprehensive management of cancer using anticancer drugs, including chemotherapy, targeted therapies, immunotherapies, and hormone therapies.',
    coverImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-6666',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. Robert Koch', affiliation: 'Charite, Germany' },
    stats: { sections: 4, articles: 120, views: 500000 },
    publishedYear: '2025',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Systemic Therapies', path: '/journals/j9/sections/systemic-therapies' },
      { name: 'Drug Resistance', path: '/journals/j9/sections/drug-resistance' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j9/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j9/authors/author-guidelines' } ]
  },
  {
    id: 'j10',
    title: 'Immuno-Oncology & Targeted Therapies',
    category: 'Medicine & Health',
    impactFactor: '8.3',
    latestIssue: 'Vol. 2, Issue 4 (2025)',
    description: 'Immuno-Oncology and Targeted Therapies represent transformative approaches in modern cancer treatment by harnessing the bodys immune system and targeting specific molecular pathways involved in tumor growth and progression.',
    coverImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-7777',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. James Allison', affiliation: 'MD Anderson, United States' },
    stats: { sections: 5, articles: 150, views: 650000 },
    publishedYear: '2024',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Immunotherapy', path: '/journals/j10/sections/immunotherapy' },
      { name: 'Checkpoint Inhibitors', path: '/journals/j10/sections/checkpoint-inhibitors' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j10/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j10/authors/author-guidelines' } ]
  },
  {
    id: 'j11',
    title: 'Pediatric & Rare Cancers',
    category: 'Medicine & Health',
    impactFactor: '5.2',
    latestIssue: 'Vol. 7, Issue 3 (2025)',
    description: 'Pediatric and Rare Cancers encompass a diverse group of malignancies that require specialized research, diagnosis, and treatment approaches due to their low incidence and unique biological characteristics.',
    coverImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    backgroundImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2500',
    issn: '2456-8888',
    editors: 'Editorial Board',
    chiefEditor: { name: 'Dr. Sydney Farber', affiliation: 'Dana-Farber, United States' },
    stats: { sections: 3, articles: 60, views: 210000 },
    publishedYear: '2025',
    imprint: 'InnovInc Press',
    language: 'English',
    sections: [
      { name: 'Childhood Malignancies', path: '/journals/j11/sections/childhood-malignancies' },
      { name: 'Rare Tumor Types', path: '/journals/j11/sections/rare-tumor-types' }
    ],
    aboutJournal: [ { name: 'Scope', path: '/journals/j11/about/scope' } ],
    forAuthors: [ { name: 'Author Guidelines', path: '/journals/j11/authors/author-guidelines' } ]
  }
]

export const ARTICLES = [
  {
    id: 'a1',
    type: 'ORIGINAL RESEARCH',
    title: 'Sentinel Lymph Node Mapping in Risk-Reducing Salpingo-Oophorectomy for BRCA Mutation Carriers: A Multi-Center Clinical Evaluation',
    authors: ['Alessandro Buda', 'Michele Bollino', 'Jessica Mauro', 'Jvan Casarin', 'David Viveros-Carreno'],
    authorAffiliations: [
      { name: 'Alessandro Buda', indices: ['1'] },
      { name: 'Michele Bollino', indices: ['2'] },
      { name: 'Jessica Mauro', indices: ['1'] },
      { name: 'Jvan Casarin', indices: ['3'] },
      { name: 'David Viveros-Carreno', indices: ['4', '5'] }
    ],
    affiliationsList: [
      { index: '1', text: 'Michele and Pietro Ferrero Hospital, Verduno, Italy' },
      { index: '2', text: 'Department of Obstetrics and Gynaecology, Division of Gynaecologic Oncology, Skåne University Hospital Lund, Lund University Faculty of Medicine, Department of Clinical Sciences, Obstetrics and Gynaecology, Lund, Sweden' },
      { index: '3', text: 'Ospedale del Ponte, University of Varese, Varese, Italy' },
      { index: '4', text: 'Grupo de Investigación Salud de la Mujer Sanitas, Department of Gynecologic Oncology, Clínica Colsanitas S.A., Clínica Universitaria Colombia, Bogotá, Colombia' },
      { index: '5', text: 'Unidad Ginecología Oncológica, Grupo de Investigación GIGA, Centro de Tratamiento e Investigación sobre Cáncer Luis Carlos Sarmiento Angulo (CTIC), Bogotá, Colombia' }
    ],
    history: {
      received: '11 March 2026',
      revised: '18 May 2026',
      accepted: '23 May 2026',
      online: '4 June 2026'
    },
    journalId: 'j1',
    journalTitle: 'Journal of Global Cancer Research',
    publicationDate: '2026-06-04',
    abstract: 'Objective: Evaluating the feasibility, safety, and clinical value of sentinel lymph node (SLN) mapping during risk-reducing salpingo-oophorectomy in BRCA mutation carriers. Methods: We analyzed clinical trial datasets across multi-center oncology research networks. Results: High precision and detection rates were observed, allowing identification of microscopic lymphatic spread.',
    conclusion: 'Sentinel lymph node mapping represents a highly viable adjuvant diagnostic option during risk-reducing surgeries in BRCA mutation carriers, optimizing systemic regimens and clinical surveillance.',
    referencesCount: 39,
    references: [
      { id: 1, citation: 'Buda A., et al. (2025). Sentinel lymph node mapping in early-stage endometrial cancer. Journal of Global Cancer Research, 12(2), 145-152.', link: '/journals/j1' },
      { id: 2, citation: 'Casarin J., et al. (2024). Minimally invasive staging techniques in gynecologic oncology. Innovations in Engineering, 15(4), 89-94.', link: '/journals/j4' },
      { id: 3, citation: 'Viveros-Carreno D., et al. (2025). Global access to oncology therapeutics and clinical trials. Journal of Global Cancer Research, 12(3), 201-210.', link: '/journals/j1' },
      { id: 4, citation: 'Bollino M., et al. (2024). Genomic profiles and BRCA1/2 mutational carriers therapeutics. Journal of Global Cancer Research, 12(1), 54-61.', link: '/journals/j1' }
    ],
    views: 434,
    impressions: 1205,
    downloads: 120,
    readTime: '12 min',
    tags: ['Oncology', 'BRCA Carriers', 'Sentinel Mapping', 'Gynecology'],
    doi: '10.3389/jgcr.2026.1345',
    provider: 'InnovInc Publishing',
    issn: '1664-0640'
  },
  {
    id: 'a2',
    type: 'REVIEW',
    title: 'Next-generation T cell engagers for cancer and autoimmune diseases',
    authors: ['Jennifer S Michaelson', 'Catherine C Henry', 'Karsten Sauer'],
    journalId: 'j2',
    journalTitle: 'InnovInc Immunology',
    publicationDate: '2026-06-26',
    abstract: 'An extensive review of T cell engagers and their potential in treating severe autoimmune conditions.',
    views: 475,
    impressions: 1890,
    downloads: 300,
    readTime: '18 min',
    tags: ['Immunology', 'Cancer', 'T Cells'],
    doi: '10.3389/fimmu.2026.8923',
    provider: 'InnovInc Publishing',
    issn: '1664-3224'
  },
  {
    id: 'a3',
    type: 'ORIGINAL RESEARCH',
    title: 'The Cost of Persistent Alarm: Temporal Transcriptional Reprogramming of Macrophages from Acute Activation to Chronic Suppression',
    authors: ['Elizabeth Mazzio', 'Andrew S. Barnes', 'Ramesh B. Badisa'],
    journalId: 'j2',
    journalTitle: 'InnovInc Immunology',
    publicationDate: '2026-06-25',
    abstract: 'Investigating the cellular mechanisms behind macrophage suppression during chronic inflammation.',
    views: 415,
    impressions: 980,
    downloads: 150,
    readTime: '14 min',
    tags: ['Macrophages', 'Transcription', 'Immunology'],
    doi: '10.3389/fimmu.2026.1023',
    provider: 'InnovInc Publishing',
    issn: '1664-3224'
  },
  {
    id: 'a4',
    type: 'REVIEW',
    title: 'Inflammation as a Master Regulator of Immunotherapy Response in Head and Neck Squamous Cell Carcinoma',
    authors: ['Yingchen Han', 'Peihong Wu', 'Haoran Song', 'Jia Gu'],
    journalId: 'j2',
    journalTitle: 'InnovInc Immunology',
    publicationDate: '2026-06-24',
    abstract: 'From malignant transformation to ecology-aware precision combinations in cancer treatment.',
    views: 423,
    impressions: 1100,
    downloads: 210,
    readTime: '16 min',
    tags: ['Carcinoma', 'Immunotherapy', 'Inflammation']
  },
  {
    id: 'a5',
    type: 'ORIGINAL RESEARCH',
    title: 'Hydrochemical characterization of hot springs in Ollachea, Puno, according to Peruvian environmental standards',
    authors: ['German Rafael Espinoza-Rivas', 'Pablo Ruben'],
    journalId: 'j3',
    journalTitle: 'Global Environmental Science Advances',
    publicationDate: '2026-06-24',
    abstract: 'Analyzing the chemical composition of natural hot springs and their compliance with environmental safety laws.',
    views: 290,
    impressions: 800,
    downloads: 95,
    readTime: '10 min',
    tags: ['Environment', 'Hydrochemistry', 'Ecology']
  },
  {
    id: 'a6',
    type: 'ORIGINAL RESEARCH',
    title: 'M2 macrophage-derived exosomes improves secondary lymphedema through cellular mitochondrial homeostasis regulation',
    authors: ['Jinli Ma', 'Luya Pu', 'Yundong Zhang'],
    journalId: 'j1',
    journalTitle: 'Journal of Global Cancer Research',
    publicationDate: '2026-06-23',
    abstract: 'Exploring the therapeutic potential of exosomes in treating lymphedema via mitochondrial pathways.',
    views: 532,
    impressions: 1450,
    downloads: 275,
    readTime: '15 min',
    tags: ['Mitochondria', 'Exosomes', 'Medicine']
  },
  {
    id: 'a7',
    type: 'ORIGINAL RESEARCH',
    title: 'Selective Reduction of the Light Peak-to-Dark Trough Ratio in Reticular Macular Disease: An Electrooculography Study',
    authors: ['Lin Liu', 'Lu Cheng', 'Qi Ren', 'Zhe Chu', 'Hao Cheng'],
    journalId: 'j1',
    journalTitle: 'Journal of Global Cancer Research',
    publicationDate: '2026-06-23',
    abstract: 'A detailed clinical study on retinal diseases using electrooculography techniques.',
    views: 310,
    impressions: 720,
    downloads: 80,
    readTime: '11 min',
    tags: ['Ophthalmology', 'Macular Disease', 'Clinical Study']
  },
  {
    id: 'a8',
    type: 'EDITORIAL',
    title: 'EDITORIAL: Impact of Viral Infections on Childhood Asthma: Susceptibility and Pathomechanisms',
    authors: ['Nicole Maison', 'Ulrich von Both', 'Jimmy Omony'],
    journalId: 'j1',
    journalTitle: 'Journal of Global Cancer Research',
    publicationDate: '2026-06-22',
    abstract: 'An editorial discussing recent findings on how early viral infections influence asthma development in children.',
    views: 650,
    impressions: 2100,
    downloads: 140,
    readTime: '5 min',
    tags: ['Asthma', 'Pediatrics', 'Viral Infection']
  },
  {
    id: 'a9',
    type: 'ORIGINAL RESEARCH',
    title: 'Deep Learning Approaches for Early Detection of Alzheimer’s Disease',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Roberts'],
    journalId: 'j2',
    journalTitle: 'Journal of Artificial Intelligence Research',
    publicationDate: '2026-06-20',
    abstract: 'This paper presents a novel deep learning architecture based on convolutional neural networks for the early detection of Alzheimer’s disease.',
    views: 1245,
    impressions: 4300,
    downloads: 500,
    readTime: '12 min',
    tags: ['Machine Learning', 'Healthcare', 'Neuroscience']
  },
  {
    id: 'a10',
    type: 'REVIEW',
    title: 'Impact of Microplastics on Marine Ecosystems: A comprehensive review',
    authors: ['Dr. Elena Rodriguez', 'Dr. James Smith'],
    journalId: 'j3',
    journalTitle: 'Global Environmental Science Advances',
    publicationDate: '2026-06-19',
    abstract: 'Microplastics have emerged as a significant global environmental threat. This review synthesizes current knowledge.',
    views: 890,
    impressions: 2900,
    downloads: 310,
    readTime: '18 min',
    tags: ['Marine Biology', 'Pollution', 'Ecosystems']
  },
  {
    id: 'a11',
    type: 'ORIGINAL RESEARCH',
    title: 'Next-Generation Solid-State Batteries: Challenges and Opportunities',
    authors: ['Prof. David Kim'],
    journalId: 'j4',
    journalTitle: 'Innovations in Engineering',
    publicationDate: '2026-06-18',
    abstract: 'Solid-state batteries promise higher energy density and better safety compared to traditional Li-ion batteries.',
    views: 1560,
    impressions: 5200,
    downloads: 640,
    readTime: '15 min',
    tags: ['Energy Storage', 'Materials Science', 'Engineering']
  },
  {
    id: 'a12',
    type: 'METHODOLOGY',
    title: 'A Novel Framework for Scalable Quantum Error Correction in Superconducting Qubits',
    authors: ['Dr. Alice Wong', 'Dr. Bob Smith', 'Dr. Charlie Brown'],
    journalId: 'j4',
    journalTitle: 'Innovations in Engineering',
    publicationDate: '2026-06-15',
    abstract: 'Proposing a new error correction model that scales logarithmically with qubit count.',
    views: 920,
    impressions: 3100,
    downloads: 420,
    readTime: '20 min',
    tags: ['Quantum Computing', 'Physics', 'Engineering']
  }
]

export const STATS = {
  authors: '15,000+',
  countries: '120+',
  downloads: '5M+',
  researchPapers: '50,000+',
  editors: '2,500+',
  institutions: '3,000+'
}
