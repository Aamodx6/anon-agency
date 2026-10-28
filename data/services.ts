export interface ServiceDeliverable {
  index: string;
  stepLabel: string;
  cardTitle: string;
  readBody: string;
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface ServiceCase {
  slug: string;
  title: string;
  type: string;
  baseImg: string;
  hoverImg: string;
  discipline: string;
}

export interface Service {
  slug: string;
  number: string;
  tabLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  summary: string;
  description: string;
  benefits: string[];
  process: ServiceProcessStep[];
  deliverables: ServiceDeliverable[];
  leftCase: ServiceCase;
  rightCase: ServiceCase;
  featuredCase?: {
    slug: string;
    title: string;
    discipline: string;
    image: string;
    alt: string;
  };
}

export const SERVICES: Service[] = [
  {
    slug: 'web-mobile-application-development',
    number: '01',
    tabLabel: 'Web & Mobile Apps',
    title: 'Web & Mobile Application Development',
    metaTitle: 'Web & Mobile App Development Company | Anon, Warsaw',
    metaDescription: 'Custom web and mobile app development from Warsaw. We design, build, and launch fast, scalable web, iOS, and Android apps for startups and global teams.',
    heroIntro: 'We create websites, web applications, and mobile apps shaped around how your business and customers work. Each product is designed to be easy to use, dependable, and ready to grow.',
    summary: 'We design and build the full experience, from a clear marketing website to a feature rich product or mobile app. Your team gets a maintainable platform, and your customers get a simpler path to what they need.',
    description: 'We design and build the full experience, from a clear marketing website to a feature rich product or mobile app. Your team gets a maintainable platform, and your customers get a simpler path to what they need.',
    benefits: [
      'Deliver a fast, consistent experience on every desktop and mobile device.',
      'Cut friction in sign up, booking, and checkout to turn more visitors into customers.',
      'Update content and product features yourself, without waiting on a developer.',
      'Scale on a clean, secure codebase that grows with your business.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We turn your goals, users, and must have features into a clear scope, timeline, and budget.' },
      { number: '02', title: 'Shape the experience', body: 'We design the key user journeys and a clickable prototype, and refine it with you before any code is written.' },
      { number: '03', title: 'Build and validate', body: 'We build in short sprints, connect your services, and test on real devices, with regular demos along the way.' },
      { number: '04', title: 'Launch with confidence', body: 'We handle deployment and final checks, then hand over the documentation and tools your team needs to run it.' },
    ],
    leftCase: {
      slug: 'frame',
      title: 'Frame',
      type: 'product site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      type: 'jewellery site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Development'
    },
    featuredCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      discipline: 'E-commerce development',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/caaeb8c6de41e353d94f7be63a8471827111eb1d-2073x1553.jpg',
      alt: 'Web and mobile app development for the Mihailove e-commerce experience'
    },
    deliverables: [],
  },
  {
    slug: 'ai-saas-custom-software-development',
    number: '04',
    tabLabel: 'AI SaaS & Software',
    title: 'AI SaaS & Custom Software Development',
    metaTitle: 'AI SaaS and Custom Software Development by Anon',
    metaDescription: 'We design and build AI powered SaaS products and custom software from Warsaw. From MVP to scale, we deliver secure, reliable software for global teams.',
    heroIntro: 'As a Warsaw software development company, we turn your product idea into reliable AI powered software. From a focused first version to a platform ready to grow, one team designs, builds, and launches it with you.',
    summary: 'We design and build AI powered SaaS products and custom software, from a focused first version to a platform ready to grow.',
    description: 'We design and build AI powered SaaS products and custom software, from a focused first version to a platform ready to grow.',
    benefits: [
      'Launch a working first version fast and learn from real users early.',
      'Own a scalable, secure product built on clean and maintainable code.',
      'Stand out with AI features that give your users real value.',
      'Grow with confidence on an architecture ready for more users and features.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We define your users, goals, and must have features, then agree on a scope, timeline, and budget.' },
      { number: '02', title: 'Design the product', body: 'We plan the architecture and design the key screens, then review a clickable prototype with you.' },
      { number: '03', title: 'Build and test', body: 'We build in short sprints with regular demos, and test every feature before it reaches your users.' },
      { number: '04', title: 'Launch and grow', body: 'We deploy your product, monitor performance, and keep improving it as your users and needs grow.' },
    ],
    leftCase: {
      slug: 'portfolio-ventures',
      title: 'Portfolio Ventures',
      type: 'venture capital site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/d542e0740df5e6200eb1b958674f0bc141b83237-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/513093ecae0df5f3582a328ade77575913405d26-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'rhinestone',
      title: 'Rhinestone',
      type: 'web3 infrastructure',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
      discipline: 'Integration'
    },
    featuredCase: {
      slug: 'rhinestone',
      title: 'Rhinestone',
      discipline: 'Smart Account Infrastructure',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      alt: 'Rhinestone custom software development and smart account interface'
    },
    deliverables: [],
  },
  {
    slug: 'custom-ai-agents-internal-copilots',
    number: '03',
    tabLabel: 'AI Agents & Copilots',
    title: 'Custom AI Agents & Internal Copilots',
    metaTitle: 'Custom AI Agents and Internal Copilots by Anon, Warsaw',
    metaDescription: 'We build custom AI agents and internal copilots that answer questions, use your tools, and automate tasks. AI development from Warsaw for global teams.',
    heroIntro: 'We build AI agents and copilots that know your business, use your tools, and take action for you. Your team gets a tireless AI assistant. Your customers get faster, smarter answers.',
    summary: 'We build AI agents and copilots that know your business, use your tools, and take action for you. Your team gets a tireless AI assistant. Your customers get faster, smarter answers.',
    description: 'We build AI agents and copilots that know your business, use your tools, and take action for you. Your team gets a tireless AI assistant. Your customers get faster, smarter answers.',
    benefits: [
      'Give every employee instant answers from your company knowledge.',
      'Use an AI chatbot to answer routine questions with consistent quality.',
      'Help your team work faster with drafts, summaries, and research on demand.',
      'Keep control with clear permissions, safety rules, and human review.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We study your team, tools, and data, then choose the agent that will deliver value fastest.' },
      { number: '02', title: 'Design the agent', body: 'We define its role, knowledge, tools, and limits, and share a clear plan for your approval.' },
      { number: '03', title: 'Build and test', body: 'We build the agent, connect your systems, and test it with real questions and difficult edge cases.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, monitor answers and usage, and keep tuning so your agent gets more useful over time.' },
    ],
    leftCase: {
      slug: 'aimplify',
      title: 'Aimplify',
      type: 'AI consultancy',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/73a5abc6bbeacc8a8380ce43b2fa889b256ebde6-1080x1320.jpg',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/fdd04734314f16dcd5c06b4d002a64b81d93d18e-1080x1320.jpg',
      discipline: 'AI Solutions'
    },
    rightCase: {
      slug: 'cybercapitalist',
      title: 'CyberCapitalist',
      type: 'market intelligence',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      discipline: 'AI Agents'
    },
    featuredCase: {
      slug: 'aimplify',
      title: 'Aimplify',
      discipline: 'AI Architecture and Machine Intelligence',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/73a5abc6bbeacc8a8380ce43b2fa889b256ebde6-1080x1320.jpg',
      alt: 'Custom AI agents and internal copilot workflows for Aimplify'
    },
    deliverables: [],
  },
  {
    slug: 'ai-workflow-automation-integrations',
    number: '02',
    tabLabel: 'AI Workflow Automation',
    title: 'AI Workflow Automation & Integrations',
    metaTitle: 'AI Workflow Automation Services by Anon, Warsaw',
    metaDescription: 'Custom AI workflow automation and system integrations from Warsaw. We connect your tools, automate repetitive tasks, and save your team hours every week.',
    heroIntro: 'We connect your apps, data, and teams with smart AI workflows that run on their own. Less manual work, fewer errors, and more time for the work that grows your business.',
    summary: 'We connect your apps, data, and teams with smart AI workflows that run on their own. Less manual work, fewer errors, and more time for the work that grows your business.',
    description: 'We connect your apps, data, and teams with smart AI workflows that run on their own. Less manual work, fewer errors, and more time for the work that grows your business.',
    benefits: [
      'Save hours every week by removing repetitive manual tasks.',
      'Reduce human errors with workflows that follow the same rules every time.',
      'Respond to leads and customers faster with instant automated actions.',
      'Scale your operations without hiring for every new process.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We review your processes and tools, then choose the workflows that will save the most time first.' },
      { number: '02', title: 'Design the flow', body: 'We map each trigger, step, and AI decision, and share a clear blueprint for your approval.' },
      { number: '03', title: 'Build and test', body: 'We build the automations, connect your apps, and test them with real data and edge cases.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, monitor results, and keep refining so your workflows get faster and smarter over time.' },
    ],
    leftCase: {
      slug: 'condor',
      title: 'Condor',
      type: 'aviation operations',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/29e627e935328b317c488a28c3e8567fe673e2ee-2800x1572.jpg',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/e40e6ea0080cccfbe6767e2164f3ffc0d44a7d3c-2072x1552.jpg',
      discipline: 'Automation'
    },
    rightCase: {
      slug: 'cortland',
      title: 'Cortland',
      type: 'investment pipelines',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      discipline: 'Automation'
    },
    featuredCase: {
      slug: 'condor',
      title: 'Condor',
      discipline: 'Automated Operations Platform',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/29e627e935328b317c488a28c3e8567fe673e2ee-2800x1572.jpg',
      alt: 'AI workflow automation for Condor flight route allocation'
    },
    deliverables: [],
  },
  {
    slug: 'ai-customer-support-voice-agents',
    number: '05',
    tabLabel: 'AI Support & Voice',
    title: 'AI Customer Support & Voice Agents',
    metaTitle: 'AI Customer Support and Voice Agents by Anon, Warsaw',
    metaDescription: 'We build AI customer support chatbots and voice agents that answer questions, book appointments, and resolve issues around the clock. Built in Warsaw.',
    heroIntro: 'We build support assistants for chat and voice that answer common questions, collect useful details, and route complex cases to your team. They use your approved information and connect with your existing support tools.',
    summary: 'We build AI chatbots and voice agents that answer customers instantly, on chat and on the phone, at any hour.',
    description: 'We build AI chatbots and voice agents that answer customers instantly, on chat and on the phone. Your customers get help at any hour. Your team focuses on the conversations that need a human.',
    benefits: [
      'Answer customers instantly at any hour, on chat and on the phone.',
      'Cut wait times and support costs while keeping service quality high.',
      'Free your team from repeat questions so they can handle complex cases.',
      'Hand over to a human smoothly whenever a customer needs one.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We study your support volume, channels, and common questions, then pick the conversations to automate first.' },
      { number: '02', title: 'Design the conversation', body: 'We script the flows, tone, and handover rules, and share sample chats and calls for your approval.' },
      { number: '03', title: 'Build and test', body: 'We build the agent, connect your systems, and test it with real chats and calls, including tricky ones.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, review conversations, and keep tuning so your agent resolves more issues over time.' },
    ],
    leftCase: {
      slug: 'korelabs',
      title: 'Korelabs',
      type: 'research studio',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Consulting'
    },
    rightCase: {
      slug: 'ezra',
      title: 'Ezra',
      type: 'health platform',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      discipline: 'Support'
    },
    featuredCase: {
      slug: 'korelabs',
      title: 'Korelabs',
      discipline: 'Engineering Advisory & Infrastructure',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png',
      alt: 'AI customer support chat and voice agents'
    },
    deliverables: [],
  },
  {
    slug: 'ai-document-processing-data-intelligence',
    number: '06',
    tabLabel: 'Document Processing',
    title: 'AI Document Processing & Data Intelligence',
    metaTitle: 'AI Document Processing and Data Extraction by Anon',
    metaDescription: 'We build AI document processing systems that read invoices, contracts, and forms, extract key data, and send it to your tools. Built in Warsaw.',
    heroIntro: 'We turn documents and unstructured business information into usable, searchable data. Extraction, classification, and review workflows help teams handle paperwork with fewer repetitive steps.',
    summary: 'We build AI systems that read your documents, extract the key data, and turn it into clean, usable information.',
    description: 'We build AI systems that read invoices, contracts, and forms, pull out the data that matters, and send it to your tools. No more manual typing. Your team gets accurate data in minutes, not days.',
    benefits: [
      'Process documents in minutes instead of hours or days.',
      'Reduce typing errors with consistent, automated data extraction.',
      'Find any detail fast with searchable, well organized records.',
      'Keep control with human review for anything the AI is unsure about.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We study your documents, fields, and volumes, then choose the process that will save the most time first.' },
      { number: '02', title: 'Design the workflow', body: 'We map how documents flow in, how data is checked, and where your team reviews, then share the plan.' },
      { number: '03', title: 'Build and test', body: 'We build the system, connect your tools, and test it on your real documents, including messy ones.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, track accuracy, and keep tuning so the system handles more document types over time.' },
    ],
    leftCase: {
      slug: 'rhinestone',
      title: 'Rhinestone',
      type: 'web3 infrastructure',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/114029f7089fbdd7a27bb8f42e0aed568ad5a8ba-1440x1698.png',
      discipline: 'Integration'
    },
    rightCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      type: 'jewellery site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Development'
    },
    featuredCase: {
      slug: 'rhinestone',
      title: 'Rhinestone',
      discipline: 'Smart Account Infrastructure',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/3054ee77e7a9f1d81a5c0ec55f51ff7c6e77e8a2-1440x1698.png',
      alt: 'Rhinestone modular smart account interface'
    },
    deliverables: [],
  },
  {
    slug: 'ai-lead-generation-sales-automation',
    number: '07',
    tabLabel: 'Lead & Sales Automation',
    title: 'AI Lead Generation & Sales Automation',
    metaTitle: 'AI Lead Generation and Sales Automation by Anon',
    metaDescription: 'We build AI lead generation and sales automation systems that find, qualify, and follow up with leads for you. Built in Warsaw for global sales teams.',
    heroIntro: 'We help sales teams capture and qualify inbound interest, keep prospect records current, and follow up at the right time. Practical AI and CRM workflows reduce missed handoffs without making outreach feel robotic.',
    summary: 'We build AI systems that find, qualify, and follow up with leads, so your team spends more time closing deals.',
    description: 'We build AI systems that find the right leads, qualify them, and follow up on time. Your pipeline stays full. Your sales team talks to buyers who are ready, not to cold lists.',
    benefits: [
      'Reply to every new lead within minutes, any time of day.',
      'Focus your team on qualified buyers, not manual research and data entry.',
      'Never lose a lead with automatic follow ups and a clean sales pipeline.',
      'See what works with clear reports on leads, replies, and booked meetings.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We study your ideal customers, sales steps, and tools, then choose where automation will win the most.' },
      { number: '02', title: 'Design the system', body: 'We map how leads are found, scored, and followed up, and share a clear plan for your approval.' },
      { number: '03', title: 'Build and test', body: 'We build the system, connect your CRM and channels, and test it with real leads before going live.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, track replies and meetings booked, and keep tuning so your results improve over time.' },
    ],
    leftCase: {
      slug: 'frame',
      title: 'Frame',
      type: 'product site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      type: 'jewellery site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Development'
    },
    featuredCase: {
      slug: 'mihailove',
      title: 'Mihailove',
      discipline: 'E-commerce development',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/caaeb8c6de41e353d94f7be63a8471827111eb1d-2073x1553.jpg',
      alt: 'Mihailove digital experience showcase on laptop'
    },
    deliverables: [],
  },
  {
    slug: 'ai-data-analytics-business-intelligence',
    number: '08',
    tabLabel: 'Data Analytics',
    title: 'AI Data Analytics & Business Intelligence',
    metaTitle: 'AI Data Analytics and Business Intelligence by Anon',
    metaDescription: 'We build AI data analytics and business intelligence dashboards that turn your data into clear insights and forecasts. Built in Warsaw for global teams.',
    heroIntro: 'We bring business data into clear dashboards and analysis tools that help leaders understand performance and spot changes. AI-assisted exploration can make useful answers easier to find without hiding how the numbers are defined.',
    summary: 'We turn your scattered data into clear dashboards, reports, and AI insights that help you decide faster.',
    description: 'We connect your data sources and turn them into live dashboards, automatic reports, and AI insights. You see what is happening, why it is happening, and what to do next.',
    benefits: [
      'See your key numbers in one place, updated automatically.',
      'Make decisions faster with clear insights instead of spreadsheets.',
      'Spot risks and opportunities early with AI trends and forecasts.',
      'Save hours every week by replacing manual reporting with automation.',
    ],
    process: [
      { number: '01', title: 'Set the direction', body: 'We learn your goals, key metrics, and data sources, then choose the insights that matter most first.' },
      { number: '02', title: 'Design the data flow', body: 'We plan how data is collected, cleaned, and shown, and share dashboard designs for your approval.' },
      { number: '03', title: 'Build and verify', body: 'We build the pipelines and dashboards, then check every figure against your own records.' },
      { number: '04', title: 'Launch and improve', body: 'We go live, train your team, and keep refining reports and forecasts as your business grows.' },
    ],
    leftCase: {
      slug: 'sotto',
      title: 'Sotto',
      type: 'hospitality',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Brand Design'
    },
    rightCase: {
      slug: 'charlie-whiskey',
      title: 'Charlie Whiskey',
      type: 'spirits brand',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/d542e0740df5e6200eb1b958674f0bc141b83237-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/513093ecae0df5f3582a328ade77575913405d26-2400x1306.png',
      discipline: 'Brand Design'
    },
    featuredCase: {
      slug: 'cybercapitalist',
      title: 'CyberCapitalist',
      discipline: 'Market intelligence',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/89a53e62a840a7ecb28160f628cfd826cfbbd2ca-1440x1698.png',
      alt: 'AI data analytics and business intelligence dashboard'
    },
    deliverables: [],
  }
].sort((left, right) => left.number.localeCompare(right.number));

const SERVICE_DELIVERABLE_COPY: Record<string, Array<[string, string]>> = {
  'web-mobile-application-development': [
    ['Product and UX architecture', 'Sitemaps, user flows, and feature priorities mapped before design starts, so every screen has a purpose and nothing gets built twice.'],
    ['Responsive UI/UX design', 'Sharp interfaces for desktop, tablet, and mobile, with every state, edge case, and interaction designed and ready for development.'],
    ['Custom web or mobile app', "A fast, secure product for web, iOS, and Android, built around your users' key tasks and structured to grow with new features."],
    ['Backend, APIs and integrations', 'Secure APIs, databases, payments, CMS, and third party tools that power real product use, from first login to final checkout.'],
    ['Testing, launch and support', 'Cross device testing, performance checks, deployment, and clear documentation, with a smooth handover and optional ongoing support.'],
  ],
  'ai-workflow-automation-integrations': [
    ['Workflow audit and mapping', 'We identify business process automation opportunities and rank them by time saved and return on investment.'],
    ['AI automation design', 'Clear automation blueprints that show triggers, rules, and AI decisions, so every workflow is simple to review before we build it.'],
    ['Custom AI workflows', 'We use n8n, Make, Zapier, or custom code for CRM automation, powered by OpenAI to sort, write, extract, and route work.'],
    ['App integrations and APIs', 'We connect your CRM, email, payments, databases, and tools through API integration, so data flows without copy and paste.'],
    ['Testing, launch and monitoring', 'We test every workflow with real data, set up error alerts, train your team, and keep your automations running smoothly after launch.'],
  ],
  'custom-ai-agents-internal-copilots': [
    ['Use case discovery', 'We find where an AI agent can help most, define its role and limits, and set clear goals for accuracy, speed, and business value.'],
    ['Agent and copilot design', 'We plan AI agent development for an AI copilot, including its tools and human handoffs, to keep it useful and safe.'],
    ['Custom AI agent build', 'We build agents with OpenAI or Claude, using your documents and data to answer questions, draft content, and complete tasks.'],
    ['Tools and data integration', 'We connect your agent to your CRM, help desk, knowledge base, databases, and apps, so it can take real actions.'],
    ['Testing, launch and monitoring', 'We test with real questions, add safety guardrails, train your team, and track quality after launch to keep answers accurate.'],
  ],
  'ai-saas-custom-software-development': [
    ['Product strategy and scope', 'Our SaaS product development roadmap defines your first version, MVP development scope, core features, budget, and timeline.'],
    ['Architecture and design', 'Secure, scalable architecture and polished interfaces, planned for user accounts, data growth, and future features from day one.'],
    ['SaaS and software build', 'AI SaaS development with multi tenant accounts, subscription billing, dashboards, and AI features built on clean code.'],
    ['AI and system integration', 'Custom software development connects AI features, payments, CRM, email, and third party APIs to your daily operations.'],
    ['Testing, launch and scaling', 'Quality testing, secure deployment, performance tuning, and documentation, with ongoing support as your users and features grow.'],
  ],
  'ai-customer-support-voice-agents': [
    ['Support audit and strategy', 'We review your tickets, calls, and common questions, then decide what AI can handle and where your team should stay in control.'],
    ['Conversation design', 'We design how your agent greets, answers, and solves problems, in your brand voice, with a smooth handover to a human when needed.'],
    ['Chatbot and voice agent build', 'Chat agents for your website and apps, and voice agents that answer and make calls, trained on your help articles, policies, and product data.'],
    ['Help desk and phone integration', 'We connect your agent to your help desk, CRM, calendar, and phone system, so it can check orders, book visits, and update records.'],
    ['Testing, launch and monitoring', 'We test with real chats and calls, set safety rules, train your team, and review conversation quality after launch to keep improving.'],
  ],
  'ai-document-processing-data-intelligence': [
    ['Document and data review', 'We review your document types, volumes, and data fields, then decide what to extract first for the biggest time savings.'],
    ['Extraction workflow design', 'We design how documents come in, how data is read and checked, and where people review results, so accuracy stays high.'],
    ['AI document processing build', 'Systems that read scans, PDFs, and emails, and extract data from invoices, contracts, and forms into structured, searchable records.'],
    ['Data and system integration', 'We send clean data to your accounting software, CRM, database, or dashboards, so information flows without manual entry.'],
    ['Testing, launch and monitoring', 'We test with your real documents, measure accuracy, train your team, and keep improving results after launch.'],
  ],
  'ai-lead-generation-sales-automation': [
    ['Sales process review', 'We study how you find, qualify, and close leads today, then spot the gaps where automation can win you more deals.'],
    ['Lead engine design', 'We design how leads are found, scored, and routed, with clear rules for who your team contacts first and when.'],
    ['AI lead generation build', 'Systems that capture leads, enrich contact data, score buyer intent, and write personal outreach and follow ups in your brand voice.'],
    ['CRM and sales integration', 'We connect your CRM, email, calendar, website forms, and ad platforms, so every lead is tracked and no follow up is missed.'],
    ['Testing, launch and tracking', 'We test every step with real leads, set up reporting, train your team, and refine the system as results come in.'],
  ],
  'ai-data-analytics-business-intelligence': [
    ['Data and goals review', 'We review your data sources, key metrics, and business questions, then decide which insights will bring the most value first.'],
    ['Data pipeline design', 'We design how data is collected, cleaned, and stored from your tools, so every report rests on one trusted source of truth.'],
    ['AI analytics and dashboards', 'Live dashboards, automatic reports, and AI models that spot trends, flag problems, and forecast sales, demand, and performance.'],
    ['Data source integration', 'We connect your CRM, finance, marketing, and operations tools to one place, so your team no longer builds reports by hand.'],
    ['Testing, launch and training', 'We check every number against your records, train your team to use the dashboards, and refine reports as your questions grow.'],
  ],
};

// Build interactive deliverable content for the service detail template.
SERVICES.forEach(service => {
  const deliverableCopy = SERVICE_DELIVERABLE_COPY[service.slug];
  if (!deliverableCopy) {
    throw new Error(`Missing deliverables for service "${service.slug}".`);
  }
  service.deliverables = deliverableCopy.map(([title, readBody], index) => ({
    index: String(index + 1).padStart(2, '0'),
    stepLabel: title,
    cardTitle: title,
    readBody,
  }));
});
// Legacy alias mapping so existing links never break
export const SERVICE_ALIASES: Record<string, string> = {
  'web-mobile-development': 'web-mobile-application-development',
  'custom-software-system-integration': 'ai-saas-custom-software-development',
  'ai-solutions-intelligent-agents': 'custom-ai-agents-internal-copilots',
  'business-process-automation': 'ai-workflow-automation-integrations',
};
