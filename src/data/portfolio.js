/*
 * All portfolio content lives here so it can be updated without touching components.
 * Icons are lucide-react component names, resolved inside each component.
 */

export const profile = {
  name: 'Varshith',
  role: 'Associate Software Engineer',
  stack: 'Java | Spring Boot | Microservices',
  summary:
    'Associate Software Engineer with 1.5 years of experience building backend applications and REST APIs using Java, Spring Boot, Hibernate/JPA, PostgreSQL, and Microservices.',
  location: 'Hyderabad, India',
  resume: '/Varshith_Varala_Resume.pdf',
};

// Replace these placeholders with your real details.
export const contact = {
  email: 'varshith@uniquehire.co.in',
  phone: '+91 7285942101',
  linkedin: 'https://www.linkedin.com/in/varshith-varala-533aa7370',
  github: 'https://github.com/varshithvarala18',
};

export const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'domain', label: 'Cards & Payments' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

// Floating card in the About section.
export const developerCard = {
  role: 'Associate Software Engineer',
  experience: '1.5 years experience',
  stack: ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
};

export const about = {
  paragraphs: [
    'I am a backend-focused software engineer based in Hyderabad. Over the last 1.5 years at UniqueHire, I have been building and maintaining Spring Boot services, designing REST APIs, and working with relational data through Hibernate/JPA and PostgreSQL in microservices-based applications.',
    'Most of my work sits close to business logic: validating requests, enforcing domain rules, and making sure data is persisted correctly. That work has taken me into the Cards & Payments domain, where I learned how a card transaction moves through authorization, clearing, and settlement, and how platforms like VisionPLUS organise card, account, and authorization processing.',
    'Alongside backend development, I am building a practical understanding of Generative AI, including LLM fundamentals, prompt and context engineering, tool use, and the Model Context Protocol (MCP), with a focus on how these can be applied responsibly in real engineering workflows.',
  ],
  highlights: [
    { icon: 'Briefcase', label: 'Experience', value: '1.5 years' },
    { icon: 'Server', label: 'Focus', value: 'Backend & APIs' },
    { icon: 'CreditCard', label: 'Domain', value: 'Cards & Payments' },
    { icon: 'MapPin', label: 'Location', value: 'Hyderabad, India' },
  ],
};

export const skillGroups = [
  {
    title: 'Programming',
    icon: 'Code2',
    skills: ['Java', 'OOP', 'Collections', 'Exception Handling'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: ['Spring Boot', 'REST APIs', 'Hibernate', 'JPA', 'Microservices'],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: ['PostgreSQL'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Maven', 'Postman'],
  },
  {
    title: 'Domain',
    icon: 'CreditCard',
    skills: [
      'Cards & Payments',
      'ISO 8583',
      'ATM/POS Processing',
      'Authorization',
      'Clearing',
      'Settlement',
      'VisionPLUS',
    ],
  },
  {
    title: 'Generative AI',
    icon: 'Sparkles',
    skills: [
      'LLM Fundamentals',
      'Claude',
      'Tool Use',
      'MCP',
      'Context Engineering',
      'Prompt Engineering',
    ],
  },
];

export const experience = [
  {
    company: 'UniqueHire',
    location: 'Hyderabad',
    role: 'Associate Software Engineer',
    duration: 'May 2025 – Present',
    summary:
      'Backend development on Spring Boot microservices, with exposure to the Cards & Payments domain and API testing.',
    points: [
      'Developed backend applications using Java, Spring Boot, REST APIs, Hibernate, and PostgreSQL.',
      'Worked on Cards & Payments concepts including ISO 8583, EMV, ATM/POS transaction processing, authorization, clearing, and settlement.',
      'Gained functional knowledge of VisionPLUS, including v+ modules, transaction processing, batch processing, EOD processing, and financial operations.',
      'Used Git, Maven, Postman for development, API testing, and project activities.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Hibernate/JPA', 'PostgreSQL', 'Microservices', 'Postman', 'Git'],
  },
];

export const projects = [
  {
    title: 'Daily Finance System',
    icon: 'Landmark',
    type: 'Microservices · Team project',
    description:
      'A microservices-based finance management system for managing customers, financial plans, loans, payments, fines, and transactions.',
    visual: 'finance',
    highlights: ['Loan Management', 'Plan Management', 'Payments', 'Transactions', 'API Gateway'],
    contributionTitle: 'My contribution',
    points: [
      'Designed the system to manage customers, financial plans, loans, payments, fines, and transaction records',
      'Implemented the plan lifecycle',
      'Developed REST APIs for creating, updating, retrieving, and managing financial transactions',
      'Integrated API Gateway for centralized request routing across backend services',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Hibernate/JPA', 'PostgreSQL', 'Microservices'],
  },
  {
    title: 'Merchant Management System',
    icon: 'CreditCard',
    type: 'Payments · Spring Boot',
    description:
      'A Spring Boot payment processing application that manages merchants, cards, and payment transactions, and decides whether each transaction is approved or declined.',
    visual: 'card',
    highlights: [
      'Merchant onboarding',
      'Card management',
      'Payment processing',
      'Authorization',
      'Approved / declined transactions',
      'Card validation',
    ],
    contributionTitle: 'Key features',
    points: [
      'Merchant and card management',
      'Transaction processing',
      'Merchant and card validation',
      'Card blocking and expiry validation',
      'Available-limit validation',
      'Payment authorization with approved/declined handling',
    ],
    flow: ['Merchant check', 'Card check', 'Status & expiry', 'Available limit', 'Approve / Decline'],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Hibernate/JPA', 'PostgreSQL'],
  },
  {
    title: 'RIVO HRMS',
    icon: 'Users',
    type: 'QA · Functional & API testing',
    description:
      'An HRMS application where I carried out functional and API testing across role-based modules, verifying workflows end to end and validating API responses.',
    visual: 'testing',
    highlights: [
      'Functional testing',
      'API testing',
      'Postman',
      'Positive / negative scenarios',
      'Defect reporting',
      'Regression testing',
    ],
    contributionTitle: 'Modules tested',
    points: [
      'Admin',
      'Recruiter',
      'Team Lead',
      'Manager',
      'Notification',
    ],
    compactPoints: true,
    tech: ['Functional Testing', 'API Testing', 'Postman', 'REST'],
  },
];

export const paymentFlow = [
  { step: 'Cardholder', detail: 'Taps, dips or enters card details' },
  { step: 'Merchant / Terminal', detail: 'ATM, POS or e-commerce checkout' },
  { step: 'Acquirer', detail: 'Merchant’s bank formats the ISO 8583 request' },
  { step: 'Card Network', detail: 'Routes the message using the BIN' },
  { step: 'Issuer', detail: 'Checks status, limits and risk; approves or declines' },
];

// Nodes of the animated end-to-end flow in the Cards & Payments section.
export const paymentPipeline = [
  { id: 'card', label: 'Card', detail: 'The cardholder taps, dips or enters card details.' },
  { id: 'merchant', label: 'Merchant', detail: 'ATM, POS or e-commerce checkout captures the transaction.' },
  { id: 'acquirer', label: 'Acquirer', detail: 'The merchant’s bank formats the ISO 8583 request.' },
  { id: 'network', label: 'Payment Network', detail: 'Routes the message to the issuer using the BIN.' },
  { id: 'issuer', label: 'Issuer', detail: 'Checks card status, limits and risk; approves or declines.' },
  {
    id: 'authorization',
    label: 'Authorization',
    detail: 'Real-time issuer decision based on card status, available limit, PIN/cryptogram and risk checks.',
  },
  {
    id: 'clearing',
    label: 'Clearing',
    detail: 'Batch exchange of final transaction details between acquirer and issuer after authorization.',
  },
  {
    id: 'settlement',
    label: 'Settlement',
    detail: 'Actual movement of funds between issuer and acquirer, net of interchange and scheme fees.',
  },
];

export const paymentTopics = [
  {
    group: 'Card Fundamentals',
    icon: 'CreditCard',
    items: [
      {
        title: 'Card Lifecycle',
        text: 'Application, issuance, activation, usage, renewal or reissue, blocking and closure of a card.',
      },
      {
        title: 'PAN',
        text: 'Primary Account Number: the 13–19 digit card number, validated with the Luhn check digit.',
      },
      {
        title: 'BIN',
        text: 'Bank Identification Number: the leading 6–8 digits of the PAN that identify the issuer and route the transaction.',
      },
      {
        title: 'EMV',
        text: 'Chip standard that generates a unique cryptogram per transaction, protecting against counterfeit cards.',
      },
      {
        title: 'Tokenization',
        text: 'Replaces the PAN with a surrogate token for wallets and stored cards, so the real number is never exposed.',
      },
    ],
  },
  {
    group: 'Channels',
    icon: 'Store',
    items: [
      {
        title: 'ATM Processing',
        text: 'Cash withdrawal, balance enquiry and PIN validation, routed through the acquirer and network to the issuer.',
      },
      {
        title: 'POS Processing',
        text: 'In-store purchases through terminals using chip, contactless or magstripe entry modes.',
      },
      {
        title: 'Card Present / Not Present',
        text: 'CP transactions have the physical card at a terminal; CNP covers e-commerce and phone orders with higher fraud risk.',
      },
    ],
  },
  {
    group: 'Transaction Lifecycle',
    icon: 'Repeat',
    items: [
      {
        title: 'ISO 8583',
        text: 'Messaging standard for card transactions: MTI, bitmap and data elements such as 0100/0110 authorization pairs.',
      },
      {
        title: 'Authorization',
        text: 'Real-time issuer decision based on card status, available limit, PIN/cryptogram and risk checks.',
      },
      {
        title: 'Clearing',
        text: 'Batch exchange of final transaction details between acquirer and issuer after authorization.',
      },
      {
        title: 'Settlement',
        text: 'Actual movement of funds between issuer and acquirer, net of interchange and scheme fees.',
      },
      {
        title: 'Reconciliation',
        text: 'Matching authorizations, clearing records and settlement reports to find and resolve mismatches.',
      },
      {
        title: 'Chargebacks',
        text: 'Dispute process where the issuer reverses a transaction on behalf of the cardholder, with reason codes.',
      },
    ],
  },
];

// Modules listed on the resume. Expansions such as CDM vary between VisionPLUS installations.
// `core` marks the modules shown in the 3D architecture view.
export const visionPlusModules = [
  {
    core: true,
    code: 'CMS',
    name: 'Credit Management System',
    text: 'Core module for accounts and cards: account setup, card issuance, billing cycles, statements, payments, interest and fees.',
  },
  {
    core: true,
    code: 'FAS',
    name: 'Financial Authorization System',
    text: 'Real-time authorization: checks card status, available credit and velocity rules, then approves or declines.',
  },
  {
    core: true,
    code: 'CDM',
    name: 'Customer Data Management',
    text: 'Maintains customer-level records such as name, address and demographics shared across accounts and cards.',
  },
  {
    core: true,
    code: 'TRAMS',
    name: 'Transaction Management System',
    text: 'Handles incoming and outgoing transaction files with card networks, supporting clearing and interchange.',
  },
  {
    core: true,
    code: 'CTA',
    name: 'Collections Tracking & Analysis',
    text: 'Manages delinquent accounts: queues, collector actions, promises to pay and recovery tracking.',
  },
  {
    // The resume lists LMS without an expansion or description, so none is shown.
    core: true,
    code: 'LMS',
    text: 'Listed under my functional exposure to VisionPLUS modules.',
  },
  {
    core: true,
    code: 'LTS',
    name: 'Loyalty Tracking System',
    text: 'Tracks reward points and loyalty programs earned and redeemed on card spending.',
  },
];

// Topics from the Generative AI & LLM section of the resume.
export const genAI = {
  core: 'Claude',
  // Short labels on the inner ring and long ones outside keep the rings from overlapping.
  inner: ['Tokens', 'Streaming', 'Tool Use', 'Agents', 'Planning', 'Batch API'],
  outer: [
    'LLM Fundamentals',
    'Context Windows',
    'Messages API',
    'System Prompts',
    'Structured Outputs',
    'Prompt Engineering',
    'Guardrails',
    'Evaluation',
  ],
  groups: [
    { title: 'Claude & LLM', icon: 'Sparkles', items: ['Claude', 'LLM Fundamentals', 'Tokens', 'Context Windows'] },
    {
      title: 'Claude API',
      icon: 'Code2',
      items: ['Messages API', 'System Prompts', 'Streaming', 'Batch API', 'Structured Outputs'],
    },
    { title: 'Prompt & Context', icon: 'Wrench', items: ['Prompt Engineering', 'Context Engineering', 'MCP'] },
    { title: 'Tool Use & Agents', icon: 'Server', items: ['Tool Use', 'Agents', 'Planning', 'Multi-step Tasks'] },
    { title: 'Safety & Evaluation', icon: 'ShieldCheck', items: ['Guardrails', 'Prompt Injection', 'Evaluation'] },
  ],
};

export const education = [
  {
    degree: 'B.Tech – Electronics and Communication Engineering',
    institution: 'Teegala Krishna Reddy Engineering College, Hyderabad',
    duration: '2021 – 2025',
    score: 'CGPA: 6.25',
  },
  {
    degree: 'Intermediate – Mathematics, Physics, Chemistry (MPC)',
    institution: 'Sri Chaitanya Junior College, Hyderabad',
    duration: '2019 – 2021',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'St Gonsalo Garcia High School, Parigi',
    duration: '2018 – 2019',
  },
];
