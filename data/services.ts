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
  heroIntro: string;
  summary: string;
  deliverables: ServiceDeliverable[];
  deliverablesHtml: string;
  howWeWorkHtml: string;
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
    slug: 'web-mobile-development',
    number: '01',
    tabLabel: 'Web & Mobile',
    title: 'Web & Mobile Development',
    heroIntro: 'From responsive WebGL web experiences and bespoke Next.js platforms to native-feel mobile applications, we engineer high-performance digital products built to stand out and scale effortlessly.',
    summary: 'Custom web platforms, mobile apps, responsive design systems, and WebGL animations built with modern tech stacks.',
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
      discipline: 'E-commerce & Web design',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/caaeb8c6de41e353d94f7be63a8471827111eb1d-2073x1553.jpg',
      alt: 'Mihailove digital experience showcase on laptop'
    },
    deliverables: [
      {
        index: '01',
        stepLabel: 'Full-stack architecture & foundations',
        cardTitle: 'Full-stack architecture & foundations',
        readBody: 'Next.js 15, TypeScript, Tailwind CSS, and cloud-native backends structured for sub-second page loads, SEO dominance, and modular growth.'
      },
      {
        index: '02',
        stepLabel: 'Interactive UI & 60fps motion design',
        cardTitle: 'Interactive UI & 60fps motion design',
        readBody: 'Bespoke design tokens, GSAP scroll triggers, interactive 3D physics, and fluid micro-interactions engineered without layout shift.'
      },
      {
        index: '03',
        stepLabel: 'Cross-platform mobile applications',
        cardTitle: 'Cross-platform mobile applications',
        readBody: 'High-performance React Native and Progressive Web Apps sharing core business logic while delivering 100% native feel on iOS and Android.'
      },
      {
        index: '04',
        stepLabel: 'Headless CMS & API integrations',
        cardTitle: 'Headless CMS & API integrations',
        readBody: 'Sanity, Strapi, or Shopify headless architectures allowing your non-technical team to publish content instantly without breaking layout integrity.'
      },
      {
        index: '05',
        stepLabel: 'Lighthouse 95+ pass & edge caching',
        cardTitle: 'Lighthouse 95+ pass & edge caching',
        readBody: 'Strict performance audits across real device matrices, image optimization pipelines, and global CDN caching before deployment.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'custom-software-system-integration',
    number: '02',
    tabLabel: 'Custom Software',
    title: 'Custom Software & System Integration',
    heroIntro: 'We architect bespoke software systems, microservices, and unified API ecosystems that eliminate operational silos and connect disparate business infrastructure into a cohesive engine.',
    summary: 'Tailored enterprise web applications, legacy modernization, microservices, and multi-system API synchronizations.',
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
    deliverables: [
      {
        index: '01',
        stepLabel: 'Domain modeling & system blueprint',
        cardTitle: 'Domain modeling & system blueprint',
        readBody: 'Deep architectural discovery, database entity-relationship modeling, and event-driven communication protocols tailored to your operational constraints.'
      },
      {
        index: '02',
        stepLabel: 'Bespoke web applications & portals',
        cardTitle: 'Bespoke web applications & portals',
        readBody: 'Custom administrative dashboards, real-time customer portals, and internal tooling engineered with role-based access control (RBAC).'
      },
      {
        index: '03',
        stepLabel: 'Legacy refactoring & cloud migration',
        cardTitle: 'Legacy refactoring & cloud migration',
        readBody: 'Deconstructing brittle monolithic services into resilient, containerized microservices running on scalable AWS or GCP infrastructure.'
      },
      {
        index: '04',
        stepLabel: 'Bidirectional API pipelines',
        cardTitle: 'Bidirectional API pipelines',
        readBody: 'Robust, webhook-driven synchronizations between ERPs (SAP, NetSuite), CRMs (HubSpot, Salesforce), and fintech payment rails (Stripe).'
      },
      {
        index: '05',
        stepLabel: 'Enterprise security & compliance',
        cardTitle: 'Enterprise security & compliance',
        readBody: 'SOC2-ready encryption standards, OAuth2/SAML SSO integrations, and automated penetration testing suites baked into CI/CD.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'ai-solutions-intelligent-agents',
    number: '03',
    tabLabel: 'AI & Agents',
    title: 'AI Solutions & Intelligent Agents',
    heroIntro: 'We design and deploy autonomous AI agents, retrieval-augmented generation (RAG) engines, and fine-tuned LLM workflows that transform raw enterprise data into actionable intelligence.',
    summary: 'Autonomous multi-agent workflows, contextual RAG search, LLM fine-tuning, and production-grade AI guardrails.',
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
    deliverables: [
      {
        index: '01',
        stepLabel: 'AI feasibility audit & readiness roadmap',
        cardTitle: 'AI feasibility audit & readiness roadmap',
        readBody: 'Evaluating proprietary business data, identifying high-leverage agent workflows, and calculating model ROI and inference costs upfront.'
      },
      {
        index: '02',
        stepLabel: 'Autonomous agentic workflow systems',
        cardTitle: 'Autonomous agentic workflow systems',
        readBody: 'Building goal-driven agents with tool calling, memory retention, and validation loops that autonomously execute complex business operations.'
      },
      {
        index: '03',
        stepLabel: 'Enterprise RAG & semantic vector search',
        cardTitle: 'Enterprise RAG & semantic vector search',
        readBody: 'Connecting internal documentation, databases, and unstructured PDFs to vector search indices for accurate citations without hallucination.'
      },
      {
        index: '04',
        stepLabel: 'Domain fine-tuning & model distillation',
        cardTitle: 'Domain fine-tuning & model distillation',
        readBody: 'Fine-tuning specialized smaller models to achieve proprietary accuracy, lower inference latency, and reduce API token consumption by up to 70%.'
      },
      {
        index: '05',
        stepLabel: 'Production guardrails & observability',
        cardTitle: 'Production guardrails & observability',
        readBody: 'Real-time telemetry, prompt injection defenses, automated PII masking, and deterministic fallbacks ensure safe production operation.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'business-process-automation',
    number: '04',
    tabLabel: 'Automation',
    title: 'Business Process Automation',
    heroIntro: 'Free your team from repetitive manual labor. We build intelligent workflow automations that orchestrate cross-departmental operations, accelerate approvals, and eliminate human error.',
    summary: 'End-to-end workflow orchestration, intelligent document extraction, automated customer onboarding, and live SLA dashboards.',
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
      alt: 'Condor automated flight route allocation'
    },
    deliverables: [
      {
        index: '01',
        stepLabel: 'Operational bottleneck & friction mapping',
        cardTitle: 'Operational bottleneck & friction mapping',
        readBody: 'Analyzing current operational handoffs, duplicate data entries, and manual approval delays to design lean, automated paths.'
      },
      {
        index: '02',
        stepLabel: 'Multi-platform workflow orchestration',
        cardTitle: 'Multi-platform workflow orchestration',
        readBody: 'Custom serverless workers, event streams, and reliable message queues linking your databases, communications, and external partners.'
      },
      {
        index: '03',
        stepLabel: 'Intelligent document & invoice parsing',
        cardTitle: 'Intelligent document & invoice parsing',
        readBody: 'Automated ingestion of receipts, vendor invoices, contracts, and forms using vision models and structured JSON schemas.'
      },
      {
        index: '04',
        stepLabel: 'Automated KYC & customer onboarding',
        cardTitle: 'Automated KYC & customer onboarding',
        readBody: 'Instant identity verification, document validation, account provisioning, and welcome sequences without human gatekeepers.'
      },
      {
        index: '05',
        stepLabel: 'Real-time telemetry & failure alerts',
        cardTitle: 'Real-time telemetry & failure alerts',
        readBody: 'Live dashboard displaying active execution logs, queue health, retry mechanisms, and instant Slack/Teams alerting on anomalies.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'technical-consulting-ongoing-support',
    number: '05',
    tabLabel: 'Consulting & Support',
    title: 'Technical Consulting & Ongoing Support',
    heroIntro: 'Fractional CTO leadership, dedicated DevOps infrastructure management, and priority technical support to keep your mission-critical applications resilient, updated, and lightning-fast.',
    summary: 'Architecture audits, fractional engineering leadership, automated CI/CD pipelines, 24/7 uptime monitoring, and continuous iteration sprints.',
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
    deliverables: [
      {
        index: '01',
        stepLabel: 'Architecture audit & cost optimization',
        cardTitle: 'Architecture audit & cost optimization',
        readBody: 'Full code review, database query profiling, cloud infrastructure waste elimination, and security vulnerability remediations.'
      },
      {
        index: '02',
        stepLabel: 'Fractional CTO advisory for founders',
        cardTitle: 'Fractional CTO advisory for founders',
        readBody: 'High-level strategic guidance on technical roadmaps, engineering team hiring evaluations, and technology vendor selections.'
      },
      {
        index: '03',
        stepLabel: 'Automated CI/CD & zero-downtime deploys',
        cardTitle: 'Automated CI/CD & zero-downtime deploys',
        readBody: 'GitHub Actions, automated test suites, staging environments, and blue-green zero-downtime deployment pipelines.'
      },
      {
        index: '04',
        stepLabel: '24/7 uptime monitoring & incident SLA',
        cardTitle: '24/7 uptime monitoring & incident SLA',
        readBody: 'Continuous APM telemetry via Datadog and Sentry, automated self-healing restart triggers, and guaranteed response SLAs.'
      },
      {
        index: '05',
        stepLabel: 'Monthly roadmap iteration sprints',
        cardTitle: 'Monthly roadmap iteration sprints',
        readBody: 'Dedicated engineering hours every month for feature additions, dependency updates, performance tuning, and UX enhancements.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'ux-ui-design',
    number: '06',
    tabLabel: 'UX/UI design',
    title: 'UX/UI design',
    heroIntro: 'Research, architecture, wireframes, and production-ready interfaces engineered with obsessive attention to user flow, clarity, and motion.',
    summary: 'Stakeholder discovery, user research, wireframing, high-fidelity design systems, and developer-ready Figma libraries.',
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
    deliverables: [
      {
        index: '01',
        stepLabel: 'Stakeholder and user research',
        cardTitle: 'Stakeholder and user research',
        readBody: 'We talk to the people who run the product and the people who use it, and write down where the interface gets in the way.'
      },
      {
        index: '02',
        stepLabel: 'Information architecture',
        cardTitle: 'Information architecture',
        readBody: 'The map of the product: what lives where, what it is called, and the shortest route to the things people do daily.'
      },
      {
        index: '03',
        stepLabel: 'Wireframes and user flows',
        cardTitle: 'Wireframes and user flows',
        readBody: 'Every flow drawn end to end and clickable, so decisions happen on structure before they get expensive on visuals.'
      },
      {
        index: '04',
        stepLabel: 'High-fidelity UI design',
        cardTitle: 'High-fidelity UI design',
        readBody: 'The screens at full fidelity, with states, edge cases and motion notes, from the same designers who build our sites.'
      },
      {
        index: '05',
        stepLabel: 'Component library and handover',
        cardTitle: 'Component library and handover',
        readBody: 'A documented component library your developers can build from, so the next screen looks like the last one.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'webflow-development',
    number: '07',
    tabLabel: 'Webflow development',
    title: 'Webflow development',
    heroIntro: 'Production-ready Webflow sites built cleanly with semantic classes, custom code where needed, and lightweight interactions that feel natural.',
    summary: 'Custom design in Figma, bespoke Webflow builds with smooth micro-interactions, CMS architecture, and team training.',
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
      discipline: 'E-commerce & Web design',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/caaeb8c6de41e353d94f7be63a8471827111eb1d-2073x1553.jpg',
      alt: 'Mihailove digital experience showcase on laptop'
    },
    deliverables: [
      {
        index: '01',
        stepLabel: 'Project discovery & strategy',
        cardTitle: 'Project discovery & strategy',
        readBody: 'One call, one document. What the site has to do, who it is for, and what done means, in writing within days.'
      },
      {
        index: '02',
        stepLabel: 'UX structure and wireframes',
        cardTitle: 'UX structure and wireframes',
        readBody: 'Structure first, then look. The page order, the story, and wireframes you can click through before any pixels arrive.'
      },
      {
        index: '03',
        stepLabel: 'Custom design in Figma',
        cardTitle: 'Custom design in Figma',
        readBody: "Every screen drawn for your content rather than a template's, with feedback rounds built into the timeline."
      },
      {
        index: '04',
        stepLabel: 'Webflow build with animations',
        cardTitle: 'Webflow build with animations',
        readBody: 'A pixel-perfect Webflow build with motion where it carries meaning. Tested on real devices before you see it.'
      },
      {
        index: '05',
        stepLabel: 'CMS setup and team training',
        cardTitle: 'CMS setup and team training',
        readBody: 'A CMS your team will actually use, wired so nothing needs a developer after launch, handed over with training.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'branding',
    number: '08',
    tabLabel: 'Branding',
    title: 'Branding',
    heroIntro: 'Distinct visual identities that anchor your product, communicate value clearly, and hold together across every digital and print touchpoint.',
    summary: 'Brand discovery workshops, core messaging, logos, typography, color palettes, and comprehensive brand guidelines.',
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
      slug: 'sotto',
      title: 'Sotto',
      discipline: 'Visual Identity & Branding',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      alt: 'Sotto restaurant identity and packaging system'
    },
    deliverables: [
      {
        index: '01',
        stepLabel: 'Brand discovery workshop',
        cardTitle: 'Brand discovery workshop',
        readBody: 'One structured session on where the company is going and what it should feel like. The brief writes itself from the answers.'
      },
      {
        index: '02',
        stepLabel: 'Positioning and messaging',
        cardTitle: 'Positioning and messaging',
        readBody: 'What you say, to whom, in which words. The line everything else hangs from.'
      },
      {
        index: '03',
        stepLabel: 'Logo and visual identity',
        cardTitle: 'Logo and visual identity',
        readBody: 'The marks, drawn for the screen first and presented in use on the real product.'
      },
      {
        index: '04',
        stepLabel: 'Type, colour and imagery system',
        cardTitle: 'Type, colour and imagery system',
        readBody: 'The system behind the look: typefaces, palette and imagery rules that keep every next asset on brand.'
      },
      {
        index: '05',
        stepLabel: 'Brand guidelines',
        cardTitle: 'Brand guidelines',
        readBody: 'One document with the whole identity in it, so anyone who touches the brand after us keeps it straight.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  },
  {
    slug: 'webflow-maintains-support',
    number: '09',
    tabLabel: 'Webflow maintains & support',
    title: 'Webflow maintains & support',
    heroIntro: 'Ongoing optimization, rapid feature updates, uptime monitoring, and priority technical support to keep your site fast, fresh, and reliable.',
    summary: 'Pre-launch QA, domain handover, CMS training, monthly updates, and direct access to the designers and engineers who built your site.',
    leftCase: {
      slug: 'frame',
      title: 'Frame',
      type: 'product site',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/1c4e3567e9d6a865cd5e7cb5fc65379abc00acd5-2400x1306.png',
      discipline: 'Development'
    },
    rightCase: {
      slug: 'sotto',
      title: 'Sotto',
      type: 'hospitality',
      baseImg: 'https://cdn.sanity.io/images/pka0c0l0/production/9395fccaf2a0f50ac5e1f478ebd1be397ddb5268-1440x1698.png',
      hoverImg: 'https://cdn.sanity.io/images/pka0c0l0/production/bc147e801b9e7a8d05883063a695fb6d9894fc8e-2400x1306.png',
      discipline: 'Brand Design'
    },
    featuredCase: {
      slug: 'frame',
      title: 'Frame',
      discipline: 'Webflow Ongoing Operations',
      image: 'https://cdn.sanity.io/images/pka0c0l0/production/7f9817871110af85ee68826e2c402c8534b4cc03-1440x1698.png',
      alt: 'Frame platform ongoing performance monitoring'
    },
    deliverables: [
      {
        index: '01',
        stepLabel: 'Pre-launch QA and performance pass',
        cardTitle: 'Pre-launch QA and performance pass',
        readBody: 'Every page tested on real devices and checked against Lighthouse before anyone else sees it.'
      },
      {
        index: '02',
        stepLabel: 'Go-live and DNS handover',
        cardTitle: 'Go-live and DNS handover',
        readBody: 'We ship it: domains, redirects, forms and analytics wired, with nothing left pointing at staging.'
      },
      {
        index: '03',
        stepLabel: 'CMS walkthrough and training',
        cardTitle: 'CMS walkthrough and training',
        readBody: 'A recorded walkthrough of your own CMS, so publishing does not depend on us.'
      },
      {
        index: '04',
        stepLabel: 'Monthly updates and monitoring',
        cardTitle: 'Monthly updates and monitoring',
        readBody: 'Pages, updates and experiments after launch. The site keeps earning its place.'
      },
      {
        index: '05',
        stepLabel: 'Priority support channel',
        cardTitle: 'Priority support channel',
        readBody: 'A direct line to the people who built the site, with a response time we actually keep.'
      }
    ],
    deliverablesHtml: '',
    howWeWorkHtml: ''
  }
];

// Helper to generate the exact HTML markup for deliverables matching Awake
function generateDeliverablesMarkup(service: Service): string {
  const items = service.deliverables.map((d, i) => `
    <button type="button" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}" class="Deliverables-module__rs733q__item" data-active="${i === 0 ? 'true' : 'false'}">
      <span class="Deliverables-module__rs733q__collapsed" aria-hidden="${i === 0 ? 'true' : 'false'}">
        <span class="Deliverables-module__rs733q__index">${d.index}</span>
        <span class="Deliverables-module__rs733q__mark" aria-hidden="true"></span>
        <span class="Deliverables-module__rs733q__stepLabel">${d.stepLabel}</span>
      </span>
      <span class="Deliverables-module__rs733q__expanded" aria-hidden="${i === 0 ? 'false' : 'true'}">
        <svg class="Deliverables-module__rs733q__ring" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <circle class="Deliverables-module__rs733q__ringTrack" cx="16" cy="16" r="13"></circle>
          <circle class="Deliverables-module__rs733q__ringFill" cx="16" cy="16" r="13" stroke-dasharray="81.6814" stroke-dashoffset="0"></circle>
        </svg>
        <span class="Deliverables-module__rs733q__cardTitle">${d.cardTitle}</span>
      </span>
    </button>
  `).join('');

  const first = service.deliverables[0];

  return `
    <section class="Deliverables-module__rs733q__section" aria-label="What you get">
      <div class="Deliverables-module__rs733q__strip" role="tablist" aria-label="Deliverables">
        ${items}
      </div>
      <div class="Deliverables-module__rs733q__reading">
        <h2 class="Deliverables-module__rs733q__readTitle">
          <span class="Deliverables-module__rs733q__readTitleLine" data-arriving="">${first.cardTitle}</span>
        </h2>
        <div class="Deliverables-module__rs733q__readBodyStack">
          <p class="Deliverables-module__rs733q__readBody" data-arriving="">${first.readBody}</p>
        </div>
      </div>
    </section>
  `;
}

// Helper to generate the exact HTML markup for How We Work
function generateHowWeWorkMarkup(): string {
  return `
    <section class="HowWeWork-module__kq1Iga__section" data-node-id="43:276">
      <h2 class="HowWeWork-module__kq1Iga__heading">How we work</h2>
      <ol class="HowWeWork-module__kq1Iga__list">
        <li class="HowWeWork-module__kq1Iga__item">
          <div class="HowWeWork-module__kq1Iga__dragLayer">
            <div class="HowWeWork-module__kq1Iga__card" data-stack-card="">
              <svg class="ScrollRibbon-module__wSfOTW__svg" aria-hidden="true" focusable="false" preserveAspectRatio="none" data-ribbon=""></svg>
              <span class="HowWeWork-module__kq1Iga__number">01</span>
              <div class="HowWeWork-module__kq1Iga__end">
                <h3 class="HowWeWork-module__kq1Iga__title">Discovery call</h3>
                <p class="HowWeWork-module__kq1Iga__body">30 free minutes to scope your goals, system architecture, and timeline.</p>
              </div>
            </div>
          </div>
        </li>
        <li class="HowWeWork-module__kq1Iga__item">
          <div class="HowWeWork-module__kq1Iga__dragLayer">
            <div class="HowWeWork-module__kq1Iga__card" data-stack-card="">
              <svg class="ScrollRibbon-module__wSfOTW__svg" aria-hidden="true" focusable="false" preserveAspectRatio="none" data-ribbon=""></svg>
              <span class="HowWeWork-module__kq1Iga__number">02</span>
              <div class="HowWeWork-module__kq1Iga__end">
                <h3 class="HowWeWork-module__kq1Iga__title">Architecture & Design</h3>
                <p class="HowWeWork-module__kq1Iga__body">System blueprints, wireframes, data flows, and interactive prototypes.</p>
              </div>
            </div>
          </div>
        </li>
        <li class="HowWeWork-module__kq1Iga__item">
          <div class="HowWeWork-module__kq1Iga__dragLayer">
            <div class="HowWeWork-module__kq1Iga__card" data-stack-card="">
              <svg class="ScrollRibbon-module__wSfOTW__svg" aria-hidden="true" focusable="false" preserveAspectRatio="none" data-ribbon=""></svg>
              <span class="HowWeWork-module__kq1Iga__number">03</span>
              <div class="HowWeWork-module__kq1Iga__end">
                <h3 class="HowWeWork-module__kq1Iga__title">Build & Integration</h3>
                <p class="HowWeWork-module__kq1Iga__body">Production code, API integrations, agent pipelines, test coverage, and responsive polish.</p>
              </div>
            </div>
          </div>
        </li>
        <li class="HowWeWork-module__kq1Iga__item">
          <div class="HowWeWork-module__kq1Iga__dragLayer">
            <div class="HowWeWork-module__kq1Iga__card" data-stack-card="">
              <svg class="ScrollRibbon-module__wSfOTW__svg" aria-hidden="true" focusable="false" preserveAspectRatio="none" data-ribbon=""></svg>
              <span class="HowWeWork-module__kq1Iga__number">04</span>
              <div class="HowWeWork-module__kq1Iga__end">
                <h3 class="HowWeWork-module__kq1Iga__title">Launch & Scaling</h3>
                <p class="HowWeWork-module__kq1Iga__body">Go-live, cloud configuration, CI/CD, team handover, and ongoing monitoring.</p>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </section>
  `;
}

// Populate HTML markups
SERVICES.forEach(s => {
  s.deliverablesHtml = generateDeliverablesMarkup(s);
  s.howWeWorkHtml = generateHowWeWorkMarkup();
});

// Legacy alias mapping so existing links never break
export const SERVICE_ALIASES: Record<string, string> = {};
