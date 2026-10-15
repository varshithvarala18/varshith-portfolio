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
  resume: '/resume.pdf',
};

// Replace these placeholders with your real details.
export const contact = {
  email: 'your.email@example.com',
  phone: '+91 00000 00000',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  github: 'https://github.com/your-username',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'domain', label: 'Payments' },
  { id: 'visionplus', label: 'VisionPLUS' },
  { id: 'contact', label: 'Contact' },
];

export const about = {
  paragraphs: [
    'I am a backend-focused software engineer based in Hyderabad. Over the last 1.5 years at Unique Hire, I have been building and maintaining Spring Boot services, designing REST APIs, and working with relational data through Hibernate/JPA and PostgreSQL in microservices-based applications.',
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
    skills: ['Spring Boot', 'REST APIs', 'Hibernate', 'JPA', 'Microservices', 'Spring Cloud'],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: ['PostgreSQL', 'SQL'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Maven', 'Postman', 'Docker', 'Kafka'],
  },
  {
    title: 'Domain',
    icon: 'CreditCard',
    skills: [
      'Cards & Payments',
      'ISO 8583',
      'ATM/POS Processing',
      'Authorization',
      'Clearing & Settlement',
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
    company: 'Unique Hire',
    location: 'Hyderabad',
    role: 'Associate Software Engineer',
    duration: 'May 2025 – Present',
    summary:
      'Backend development on Spring Boot microservices, with exposure to the Cards & Payments domain and API testing.',
    points: [
      'Develop and maintain backend services in Java and Spring Boot, building REST APIs for microservices-based applications.',
      'Implement entity mappings and data access with Hibernate/JPA on PostgreSQL, including the queries behind business operations.',
      'Write request validations and business rules, with consistent exception handling and error responses across endpoints.',
      'Worked on the Loan Service of a finance management system, from loan creation APIs to integration with payment and transaction flows.',
      'Performed functional and API testing with Postman across multiple modules of an HRMS application.',
      'Built working knowledge of card processing: card lifecycle, ISO 8583 messaging, authorization, clearing, settlement, and VisionPLUS modules.',
      'Use Git, GitHub, and Maven day to day in a team environment.',
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
    contributionTitle: 'My contribution: Loan Service',
    points: [
      'Worked primarily on the Loan Service / Loan Management module',
      'Implemented loan creation APIs',
      'Added customer and plan validations before a loan is created',
      'Implemented loan business validations',
      'Managed loan details and the related database operations',
      'Integrated loan processing with payment and transaction flows',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Hibernate/JPA', 'PostgreSQL', 'Microservices'],
  },
  {
    title: 'Merchant Payment & Transaction Processing System',
    icon: 'CreditCard',
    type: 'Payments · Spring Boot',
    description:
      'A Spring Boot payment processing application that manages merchants, cards, and payment transactions, and decides whether each transaction is approved or declined.',
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

// Module expansions for CDM and VMX vary between VisionPLUS installations; verify against your project.
export const visionPlusModules = [
  {
    code: 'CMS',
    name: 'Credit Management System',
    text: 'Core module for accounts and cards: account setup, card issuance, billing cycles, statements, payments, interest and fees.',
  },
  {
    code: 'FAS',
    name: 'Financial Authorization System',
    text: 'Real-time authorization: checks card status, available credit and velocity rules, then approves or declines.',
  },
  {
    code: 'CDM',
    name: 'Customer Data Management',
    text: 'Maintains customer-level records such as name, address and demographics shared across accounts and cards.',
  },
  {
    code: 'TRAMS',
    name: 'Transaction Management System',
    text: 'Handles incoming and outgoing transaction files with card networks, supporting clearing and interchange.',
  },
  {
    code: 'CTA',
    name: 'Collections Tracking & Analysis',
    text: 'Manages delinquent accounts: queues, collector actions, promises to pay and recovery tracking.',
  },
  {
    code: 'LTS',
    name: 'Loyalty Tracking System',
    text: 'Tracks reward points and loyalty programs earned and redeemed on card spending.',
  },
  {
    code: 'MBS',
    name: 'Merchant Banking System',
    text: 'Acquiring-side module for merchant accounts, merchant transactions, fees and payments to merchants.',
  },
  {
    code: 'VMX',
    name: 'Interface & Messaging Layer',
    text: 'Integration layer that exposes VisionPLUS functions to external channels and online systems.',
  },
];

export const education = {
  degree: 'B.Tech – Electronics and Communication Engineering',
  institution: 'Teegala Krishna Reddy Engineering College',
  score: 'CGPA: 6.25',
};
