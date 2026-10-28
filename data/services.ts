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
    summary: 'Websites and mobile apps that make it easier for customers to use your service and for your team to run it.',
    description: 'From a clear marketing website to a feature rich product or mobile app, we design and build the full experience. Your team gets a maintainable platform, and your customers get a simpler path to what they need.',
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
    metaTitle: 'AI SaaS & Custom Software Development | Anon',
    metaDescription: 'Build an AI-enabled SaaS product or custom platform around your workflows, users, and business goals with Anon.',
    heroIntro: 'We turn product ideas and operational needs into custom software, AI-enabled SaaS products, and connected systems. The result is software built around your business rather than the limits of an off-the-shelf tool.',
    summary: 'Custom platforms and AI-enabled SaaS products built around your product goals and day-to-day operations.',
    description: 'We shape the product, build its application and backend, and connect the tools it depends on. You get a reliable foundation that supports real users today and can evolve as the business grows.',
    benefits: [
      'Give your product a workflow that fits how customers and staff actually work.',
      'Connect business tools without repeated copying between systems.',
      'Keep permissions, data flows, and operational needs in view from the start.',
      'Extend features without rebuilding around the limits of generic software.',
    ],
    process: [
      { number: '01', title: 'Clarify the product', body: 'We align on users, essential workflows, integrations, and what the first useful release must do.' },
      { number: '02', title: 'Design the foundation', body: 'We plan the application, data model, access rules, and technical approach before committing to a build.' },
      { number: '03', title: 'Develop in increments', body: 'We build core features, connect services, and review working software with your team as it takes shape.' },
      { number: '04', title: 'Release and improve', body: 'We prepare the production launch, share operating guidance, and identify the next improvements from use.' },
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
      alt: 'Rhinestone modular smart account interface'
    },
    deliverables: [],
  },
  {
    slug: 'custom-ai-agents-internal-copilots',
    number: '03',
    tabLabel: 'AI Agents & Copilots',
    title: 'Custom AI Agents & Internal Copilots',
    metaTitle: 'Custom AI Agents & Internal Copilots | Anon',
    metaDescription: 'Anon builds internal AI agents and copilots that help teams find trusted information and complete routine work.',
    heroIntro: 'We build focused AI agents and internal copilots that help employees find information, complete routine work, and use business systems. They fit your team’s tools and include clear limits for when a person should take over.',
    summary: 'AI assistants that help your team find trusted answers and move routine work forward inside existing tools.',
    description: 'We connect AI agents to the knowledge and systems your staff already use, then shape how they answer, act, and hand off work. Teams spend less time searching and repeating tasks while retaining control over important decisions.',
    benefits: [
      'Find approved answers without searching across scattered files and tools.',
      'Give staff a faster starting point for routine research and admin tasks.',
      'Reduce repeated data entry by connecting assistants to chosen systems.',
      'Keep people in control with permissions, review, and escalation paths.',
    ],
    process: [
      { number: '01', title: 'Choose a useful task', body: 'We identify a focused team workflow and agree on trusted sources, boundaries, and success criteria.' },
      { number: '02', title: 'Connect knowledge and tools', body: 'We prepare relevant content and define what the assistant may read, suggest, or update.' },
      { number: '03', title: 'Test with the team', body: 'We check answers against real examples, refine handoffs, and invite users to validate the workflow.' },
      { number: '04', title: 'Deploy with oversight', body: 'We roll out access, monitoring, and feedback routes so the copilot can be improved responsibly.' },
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
      discipline: 'AI Architecture & Machine Intelligence',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/73a5abc6bbeacc8a8380ce43b2fa889b256ebde6-1080x1320.jpg',
      alt: 'Aimplify intelligent AI agent workflows'
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
    summary: 'Connected workflows that cut manual handoffs and keep information in sync across your business tools.',
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
    metaTitle: 'AI Customer Support & Voice Agents | Anon',
    metaDescription: 'Help customers get answers sooner with chat and voice agents grounded in your support knowledge and policies.',
    heroIntro: 'We build support assistants for chat and voice that answer common questions, collect useful details, and route complex cases to your team. They use your approved information and connect with your existing support tools.',
    summary: 'Chat and voice assistants that handle common questions and pass complex cases to the right person.',
    description: 'We design customer-facing AI support around your service policies, knowledge, and escalation paths. Customers can get help sooner on routine requests, while your team sees the context needed to resolve harder issues.',
    benefits: [
      'Answer common questions outside the limits of staff availability.',
      'Collect relevant details before a support agent takes over.',
      'Keep replies aligned with your current service information and policies.',
      'Route sensitive or unusual requests to people with useful context.',
    ],
    process: [
      { number: '01', title: 'Review support needs', body: 'We identify common questions, service channels, response boundaries, and the cases that need a person.' },
      { number: '02', title: 'Prepare approved answers', body: 'We organize support information and set up tone, identity checks, and escalation rules.' },
      { number: '03', title: 'Test real conversations', body: 'We validate chat and voice flows against representative requests, edge cases, and handoffs.' },
      { number: '04', title: 'Connect and monitor', body: 'We integrate with your support tools and review conversation feedback to guide refinements.' },
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
      alt: 'Korelabs technical architecture and deployment management'
    },
    deliverables: [],
  },
  {
    slug: 'ai-document-processing-data-intelligence',
    number: '06',
    tabLabel: 'Document Processing',
    title: 'AI Document Processing & Data Intelligence',
    metaTitle: 'AI Document Processing & Data Intelligence | Anon',
    metaDescription: 'Turn invoices, forms, and business documents into structured, searchable data with review built into the process.',
    heroIntro: 'We turn documents and unstructured business information into usable, searchable data. Extraction, classification, and review workflows help teams handle paperwork with fewer repetitive steps.',
    summary: 'Extract, organize, and review information from documents so teams can act on it without repeated manual entry.',
    description: 'We build document workflows that capture key fields, classify incoming files, and send uncertain results for review. The structured information can then flow into your business systems, making records easier to search and use.',
    benefits: [
      'Spend less time typing details from forms, invoices, and other records.',
      'Make document information easier to search and compare.',
      'Catch uncertain or incomplete extractions before they reach core systems.',
      'Move verified data into the tools where teams already work.',
    ],
    process: [
      { number: '01', title: 'Inspect the documents', body: 'We review file types, fields, volumes, and the decisions your team makes from each document.' },
      { number: '02', title: 'Define extraction and review', body: 'We set the output structure, confidence checks, and the cases that should go to a person.' },
      { number: '03', title: 'Build the data flow', body: 'We configure intake, extraction, validation, and delivery into your chosen business systems.' },
      { number: '04', title: 'Verify against examples', body: 'We test representative files, tune the review path, and give your team a way to resolve exceptions.' },
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
    metaTitle: 'AI Lead Generation & Sales Automation | Anon',
    metaDescription: 'Connect lead sources to your CRM, qualify enquiries, and support timely follow-up with sales automation from Anon.',
    heroIntro: 'We help sales teams capture and qualify inbound interest, keep prospect records current, and follow up at the right time. Practical AI and CRM workflows reduce missed handoffs without making outreach feel robotic.',
    summary: 'Lead capture, qualification, and follow-up workflows that help sales teams spend more time with good-fit prospects.',
    description: 'We connect lead sources to your CRM, organize incoming prospects, and automate timely next steps for the sales team. Clear qualification rules and human review keep outreach relevant and records dependable.',
    benefits: [
      'Reduce delays between a prospect’s enquiry and the first useful response.',
      'Give sales staff cleaner records and clearer next actions.',
      'Spend less time sorting leads that do not match your criteria.',
      'Keep follow-ups consistent without removing personal judgment.',
    ],
    process: [
      { number: '01', title: 'Understand the sales path', body: 'We review your lead sources, qualification criteria, CRM, and current follow-up process.' },
      { number: '02', title: 'Design the handoffs', body: 'We define routing, data checks, timing, and where a salesperson should review or respond.' },
      { number: '03', title: 'Connect the workflow', body: 'We link capture forms and channels to the CRM, then configure useful alerts and follow-up steps.' },
      { number: '04', title: 'Review lead quality', body: 'We test with sample enquiries and adjust the rules based on feedback from the sales team.' },
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
    metaTitle: 'AI Data Analytics & Business Intelligence | Anon',
    metaDescription: 'Bring business data into clear dashboards and grounded analysis that help teams make informed decisions.',
    heroIntro: 'We bring business data into clear dashboards and analysis tools that help leaders understand performance and spot changes. AI-assisted exploration can make useful answers easier to find without hiding how the numbers are defined.',
    summary: 'Clear dashboards and trusted analysis that help teams spot trends and make informed business decisions.',
    description: 'We connect relevant data sources, define the measures that matter, and present them in dashboards your team can use. Where appropriate, natural-language exploration helps people ask questions while keeping answers grounded in the underlying data.',
    benefits: [
      'Bring key performance measures into one shared view.',
      'Reduce time spent reconciling numbers across separate reports.',
      'Give teams a clearer way to investigate changes in performance.',
      'Make decisions using consistent definitions and traceable data.',
    ],
    process: [
      { number: '01', title: 'Agree on the questions', body: 'We identify the decisions, audiences, and business measures the reporting should support.' },
      { number: '02', title: 'Check the data', body: 'We review source systems, definitions, access, and gaps before designing the reporting layer.' },
      { number: '03', title: 'Build the insight view', body: 'We connect selected data, create dashboards, and validate calculations with your team.' },
      { number: '04', title: 'Put it to work', body: 'We hand over clear usage guidance and refine the views as your questions and data evolve.' },
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
      alt: 'CyberCapitalist market intelligence interface'
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
    ['Internal knowledge assistant', 'A focused interface that answers staff questions from approved company information.'],
    ['Searchable knowledge connections', 'Relevant documents and data sources organized for useful, source-grounded retrieval.'],
    ['Tool and system actions', 'Carefully scoped actions such as preparing records or drafting updates in selected systems.'],
    ['Permissions and human handoffs', 'Access rules and escalation paths for sensitive requests, uncertain answers, or decisions.'],
    ['Evaluation and usage monitoring', 'Test cases and feedback signals to help your team assess quality and improve the assistant.'],
  ],
  'ai-saas-custom-software-development': [
    ['Product scope and system blueprint', 'A defined first release, application structure, data model, and integration plan.'],
    ['Customer-facing SaaS application', 'A tailored product interface for the core tasks your customers need to complete.'],
    ['Accounts and access controls', 'User onboarding, roles, and permissions appropriate to your service and operating model.'],
    ['Backend, APIs, and data storage', 'The services and data structures that support product features and connected systems.'],
    ['AI feature integration', 'A specific AI capability integrated where it serves the product, with review and fallback behavior.'],
  ],
  'ai-customer-support-voice-agents': [
    ['Support knowledge setup', 'Approved answers and service information organized for customer-facing use.'],
    ['Chat support assistant', 'A conversational flow for common questions, service guidance, and gathering case details.'],
    ['Voice agent call flows', 'A voice experience for handling routine calls and directing callers to the right next step.'],
    ['Support platform integration', 'Connections that pass relevant conversation details into your existing support process.'],
    ['Escalation and quality checks', 'Clear boundaries, identity checks where needed, human handoff rules, and conversation testing.'],
  ],
  'ai-document-processing-data-intelligence': [
    ['Document intake workflow', 'A controlled route for receiving and sorting the file types your team handles.'],
    ['Field extraction and classification', 'Structured details captured from forms, invoices, and other recurring documents.'],
    ['Validation and review queue', 'Checks for missing or uncertain fields, with a clear human review path before use.'],
    ['Searchable structured records', 'Organized document data that staff can find and filter without opening every file.'],
    ['Business system delivery', 'Verified information sent to the relevant database, CRM, finance tool, or internal application.'],
  ],
  'ai-lead-generation-sales-automation': [
    ['Lead source connections', 'Inbound forms and selected channels linked to the systems your sales team uses.'],
    ['Qualification and routing rules', 'Criteria that organize new enquiries and send them to the right owner or queue.'],
    ['CRM data enrichment', 'Consistent fields and useful context added to prospect records from approved sources.'],
    ['Follow-up prompts and sequences', 'Timely reminders or messages that support the team’s process without replacing personal judgment.'],
    ['Sales pipeline visibility', 'A clear view of lead status, ownership, and next actions for the people managing opportunities.'],
  ],
  'ai-data-analytics-business-intelligence': [
    ['Data source and metric map', 'A shared definition of the systems and business measures included in reporting.'],
    ['Data preparation and connections', 'Reliable flows that bring relevant information together for analysis.'],
    ['Business dashboards', 'Focused views of performance indicators for the decisions your team needs to make.'],
    ['Trend and variance analysis', 'Ways to investigate changes over time and compare performance across relevant segments.'],
    ['Grounded natural-language exploration', 'An optional way to ask questions of approved data, with answers tied to defined measures.'],
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
