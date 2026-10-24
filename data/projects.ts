export interface Project {
  slug: string;
  title: string;
  intro: string;
  services: string;
  industry: string;
  year: string;
  country: string;
  siteUrl: string | null;
  siteLabel: string | null;
  images: Array<{ src: string; alt: string }>;
  nextSlug: string | null;
  schema?: any;
}

export const PROJECTS: Project[] = [
  {
  "slug": "condor",
  "title": "Condor",
  "intro": "High-performance digital presence and booking experience for private aviation platform Condor.",
  "services": "Web design · Full-stack development · Motion",
  "industry": "Aviation & Luxury Travel",
  "year": "2024",
  "country": "Switzerland",
  "siteUrl": "https://condor.aero/",
  "siteLabel": "www.condor.aero",
  "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/29e627e935328b317c488a28c3e8567fe673e2ee-2800x1572.jpg",
            "alt": "Condor AI Insights, Understand the why behind every number, on a MacBook Pro against a violet wall"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/e40e6ea0080cccfbe6767e2164f3ffc0d44a7d3c-2072x1552.jpg",
            "alt": "The Condor home page on a MacBook resting on an Eames-style chair, against a lavender wall"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/cf8452c4ba42d81f32e1a88dbec5dffbac0b1ac5-1453x1935.jpg",
            "alt": "The Condor home page on an iPhone held in two hands"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/25d60d413463e2ef832deb916bd90e548b3bf33b-1453x1935.jpg",
            "alt": "Site elements: a customer story card, the Q3 Forecast chart, a customer quote, agent pills, integration tiles and the Book a demo button"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/7c986ee06c67224d06856e14eef0b5364219809b-2072x1552.jpg",
            "alt": "AI Workflows, AI agents purpose-built for biopharma R&D finance, on a MacBook on a velvet sofa"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/15398f32d7656503f0978011631aeafa1aaf52e9-1763x1935.jpg",
            "alt": "AI Insights on an iPhone held in one hand, on dark wood"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/6db99f5da4d1f4ac5297ed1a44a9ce87d5c63776-1763x1935.jpg",
            "alt": "Customer stories on an iPhone lying on a sunlit desk"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/adbdf56c9b667c7c29313f7f7ce5296a73e8eae9-2800x1756.jpg",
            "alt": "The About page, We've been where you are, on a MacBook on a rustic wooden table"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/ce10a5ff8d914fffd6636ed517bf6503df461fb3-2800x1940.jpg",
            "alt": "A walk through the live site on a MacBook: the home page, Customers, Pricing and the cursor pushing the dots of the footer wordmark"
      }
],
  "nextSlug": "cortland"
},
  {
    "slug": "aimplify",
    "title": "Aimplify",
    "intro": "",
    "services": "UI/UX design · Webflow development",
    "industry": "IT consultancy",
    "year": "2023",
    "country": "Japan",
    "siteUrl": "https://www.aimplify.io/",
    "siteLabel": "www.aimplify.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/56a6efa7566fc124c54ef7ee970f32f8e000a792-1440x1698.png",
            "alt": "Aimplify"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "auxility",
    "title": "Auxility",
    "intro": "",
    "services": "Webflow development",
    "industry": "Fintech",
    "year": "2023",
    "country": "Canada",
    "siteUrl": "https://fintech.auxility.ca/",
    "siteLabel": "fintech.auxility.ca",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/da584fd225859a629b9f829c6b6b576bb3af2434-1440x1698.png",
            "alt": "Auxility"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "aviatize",
    "title": "Aviatize",
    "intro": "",
    "services": "UI/UX design · Webflow development",
    "industry": "",
    "year": "2023",
    "country": "",
    "siteUrl": "https://aviatize.com/",
    "siteLabel": "aviatize.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/6a4521c5ece467988444625cdbd0c1e4bb835911-1440x1698.png",
            "alt": "Aviatize"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "bro-traffic",
    "title": "Bro Traffic",
    "intro": "",
    "services": "Webflow development",
    "industry": "Consultancy",
    "year": "2022",
    "country": "Ukraine",
    "siteUrl": "https://dil-mykhailo.webflow.io/",
    "siteLabel": "dil-mykhailo.webflow.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/9f0c6330dc47963cf744f63e63561f874ce1c031-1440x1698.png",
            "alt": "Bro Traffic"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "cortland",
    "title": "Cortland",
    "intro": "Cortland Capital backs senior recruiters who are ready to run their own firm. We designed and built the site that has to convince them to leave.",
    "services": "UI/UX design · Webflow development",
    "industry": "Recruitment ventures",
    "year": "2026",
    "country": "United Kingdom",
    "siteUrl": "https://cortland.capital/",
    "siteLabel": "cortland.capital",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/3f59fcf3e72943e851ec74b88bb6f8bf946c4e1c-2800x1572.jpg",
            "alt": "The Cortland home page, Built to back you, on a MacBook against a mountain peak"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/2738e41ff702c4e30d6e0b2c2e4f91b468150771-2072x1552.jpg",
            "alt": "The Path to Freedom page on a MacBook resting on a bouclé chair"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/cb9a08d16742d20a3a2f5a9289978f0727f351af-1453x1935.jpg",
            "alt": "The home page and Get in Touch on two phones, on navy"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/8185705de10eecb4668a55d06e70e80913dc08e1-1453x1935.jpg",
            "alt": "Site elements: the three pillar cards, a founder card and The Model's features"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/9fed513fdc23a392286d5840e89e2ef719df6697-2072x1552.jpg",
            "alt": "Who We Back, Built for a certain kind of recruiter, on a MacBook on a wooden floor"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/aae52baf407b30014b4e26de64b14b2325aa34a6-1763x1935.jpg",
            "alt": "The home and About pages on two iPhones"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/176777228494e466500ae28858ab45f149cb34d2-1763x1935.jpg",
            "alt": "The Path to Freedom on an iPhone held in one hand"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/ae1b358c9d5b1bb1cc866c5f3c18dd5ef1e4db6e-2800x1756.jpg",
            "alt": "The About page on a MacBook and Who We Back on an iPhone, on navy"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/b33566eb994088f705ca1fd37aa5764298718753-2800x1941.jpg",
            "alt": "A walk through the live site on a MacBook: page load, two page transitions and a scroll to the footer"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "covalent",
    "title": "Covalent",
    "intro": "The first workforce operations platform built for complex manufacturing, out of a Harvard research project. The site had to explain capability management to a line operator and a plant executive in the same breath.",
    "services": "UI/UX design · Webflow development",
    "industry": "Industrial SaaS",
    "year": "2025",
    "country": "United States",
    "siteUrl": "https://www.covalentnetworks.com/",
    "siteLabel": "www.covalentnetworks.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/5fba3979f14a2522830559cf19565d3e446dc2e2-4320x2700.png",
            "alt": "Covalent, home page"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "cybercapitalist",
    "title": "CyberCapitalist",
    "intro": "",
    "services": "Webflow development",
    "industry": "Crypto",
    "year": "2023",
    "country": "Ukraine",
    "siteUrl": "https://cyber-capitalist.webflow.io/",
    "siteLabel": "cyber-capitalist.webflow.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/89a53e62a840a7ecb28160f628cfd826cfbbd2ca-1440x1698.png",
            "alt": "CyberCapitalist"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "ezra",
    "title": "Ezra",
    "intro": "",
    "services": "Webflow development",
    "industry": "Creator tools",
    "year": "2024",
    "country": "Australia",
    "siteUrl": "https://ezrakits.webflow.io/",
    "siteLabel": "ezrakits.webflow.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/835f207df3063191fc45abf54a20d4947ae0c9ae-1440x1698.png",
            "alt": "Ezra"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "frame",
    "title": "Frame",
    "intro": "A pre-seed productivity startup with a waitlist page that couldn&#x27;t show what the product did. We built the site, the motion, and two working AI demos running on the page itself.",
    "services": "Webflow development · Motion · AI demos",
    "industry": "",
    "year": "2024",
    "country": "United States",
    "siteUrl": "https://frame-preview.webflow.io/",
    "siteLabel": "frame-preview.webflow.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/b193e84277bf50d0ed55fb65f9b4d127351c9e9e-2800x1572.jpg",
            "alt": "The Frame home page on a laptop, Meet the Intelligent Workspace"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/ac8d7b807b7341d10e7b97ce0870bbf61b4d9f4a-2073x1553.jpg",
            "alt": "A laptop showing Frame searching across a hundred connected apps"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/a2cf506bc4de7bb06f4091c22f3e6b8afa0648ef-1453x1935.jpg",
            "alt": "The Frame mobile site, The AI-native Work OS, with its ten app tiles"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/8de2451bae2e2d3a08cac78f0982c909429c40fd-1453x1935.jpg",
            "alt": "Two product cards: Auto Document Enrichments and AI Powered Content"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/1e60bd40acbc91505e86730620ef442d1c9da287-2073x1553.jpg",
            "alt": "Ollie, the personal-agent demo, running live in the browser"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/4448a4226fc2e58703d93f6d2d105ae486a9e39f-1763x1935.jpg",
            "alt": "The pricing page open on a laptop, Find the Right Plans for Your Needs"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/23450db73169b119cabcb9b59d8c33fe4f3f43d3-1763x1935.jpg",
            "alt": "The AI-employee use-case demo running on the page"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/ca9765342a7800fa5cbac980283cca1216715a76-2800x1756.jpg",
            "alt": "Explore AI employees use cases, wired to the product's real integrations"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "hamlet-gardens",
    "title": "Hamlet Gardens",
    "intro": "",
    "services": "Webflow development",
    "industry": "Residential property rentals",
    "year": "2024",
    "country": "United Kingdom",
    "siteUrl": "https://www.hamletgardens.co.uk/",
    "siteLabel": "www.hamletgardens.co.uk",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/b6e253ce3668f9a48c0cffbae2e798f028014563-1440x1698.png",
            "alt": "Hamlet Gardens"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "korelabs",
    "title": "Korelabs",
    "intro": "",
    "services": "Webflow development",
    "industry": "Fintech",
    "year": "2026",
    "country": "United Kingdom",
    "siteUrl": "https://korelabs.co/",
    "siteLabel": "korelabs.co",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/7050a2768e053f635d349ac88d20068e65711383-1440x1698.png",
            "alt": "Korelabs"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "manypixels",
    "title": "Manypixels",
    "intro": "A design-services company that came to us to get off WordPress. Three years and two websites later, we are still working together.",
    "services": "Webflow development · JavaScript · GSAP · Swiper",
    "industry": "Design services",
    "year": "2023–2026",
    "country": "Singapore",
    "siteUrl": "http://manypixels.co/",
    "siteLabel": "manypixels.co",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/e4595e8ea4c874381af4540e5b3753c70a57ea23-2800x1572.jpg",
            "alt": "The manypixels home page, On-demand graphic & web design"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/51a932b01159bf0f6a5e56da65c8f2bc1d492214-2073x1553.jpg",
            "alt": "The plans page open on a laptop on a wooden desk"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/d9b8d5be0138a95c3b9219bf90a6517dc4a40baa-1453x1935.jpg",
            "alt": "The mobile home page, held in one hand"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/89971f6467e179064170347c76c7709fa6fb770f-1453x1935.jpg",
            "alt": "Customer questions on a laptop, on a pink sofa"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/d89f8c0a0d0afd94ada43a02d5e35b6e26b0e86e-2073x1553.jpg",
            "alt": "A spread of manypixels marketing work"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/1c2334834c5a9d69cc5ba6bd75a984c07925e4fe-1763x1935.jpg",
            "alt": "The line 'All-inclusive plans. No contracts.' on a phone among leaves"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/cba7bd8152213098f238049e6337a697f04d305a-1763x1935.jpg",
            "alt": "The gallery, Explore some of our best designs"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/b38e4ea6741df382e3200250fff35758aeeacff5-2800x1756.jpg",
            "alt": "The old site and the new one, before and after"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "mihailove",
    "title": "Mihailove",
    "intro": "A Zurich jewellery studio where every piece is bespoke and every commission is a collaboration. The site had to feel handled rather than browsed.",
    "services": "Webflow development · Motion · WebGL",
    "industry": "Luxury goods",
    "year": "2025",
    "country": "Switzerland",
    "siteUrl": "http://mihailove.com/",
    "siteLabel": "mihailove.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/c40931e5fdfa70c994bb7043ef7d62ea7afedd17-2800x1572.jpg",
            "alt": "The Mihailove home page on a laptop, gold on black"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/caaeb8c6de41e353d94f7be63a8471827111eb1d-2073x1553.jpg",
            "alt": "A portrait from the Impressions gallery, full-bleed on a laptop"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/25aff2405623948310d3709877c46a40c2d9f25d-1453x1935.jpg",
            "alt": "The mobile gallery, a necklace shot filling the screen"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/28bdf830fb60a2c837db46b818cb53c66ba31a35-1453x1935.jpg",
            "alt": "A statement page on mobile, set on a stone plinth"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/3cedb889032e83c456c48176f384dd7bb8cb3aca-2073x1553.jpg",
            "alt": "The atelier at work, shown full-bleed on the desktop site"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/a52f12c2f070e61765e2f4b67f8dd8833a9ecee4-1763x1935.jpg",
            "alt": "A craft story page open on a laptop"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/d719c51a46d6590098d269edc41f062493830acd-1763x1935.jpg",
            "alt": "The mobile site loading, its progress counter climbing"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/018db69ec2b24b68ab140c60d7fd0ee004304358-2800x1756.jpg",
            "alt": "The Cosmic Serpent necklace page, scrolling in a desktop browser"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "nomee",
    "title": "Nomee",
    "intro": "POS terminals and sales software for restaurants. The old site was clunky where the product was effortless. The redesign made the site as easy to use as the thing it sells.",
    "services": "UX/UI design · Webflow development",
    "industry": "Hospitality tech",
    "year": "2024",
    "country": "Poland",
    "siteUrl": "https://kasoterminal.nomee.pl/",
    "siteLabel": "kasoterminal.nomee.pl",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/e92e5d9cdd2dc6e6edfd788ab418e77664efe40c-4320x2700.png",
            "alt": "Nomee, home page"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "ot-playground",
    "title": "OT Playground",
    "intro": "",
    "services": "Webflow development",
    "industry": "EdTech and healthcare",
    "year": "2024",
    "country": "Australia",
    "siteUrl": "https://www.otplayground.com/",
    "siteLabel": "www.otplayground.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/5afe7ebbc5c70bb8c6ad5f1ae1d89f94c7245dc5-1440x1698.png",
            "alt": "OT Playground"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "portfolio-ventures",
    "title": "Portfolio Ventures",
    "intro": "An angel fund that had raised over £80 million for 240+ early-stage companies, wearing a brand that showed none of it. We rebuilt the identity and the site around the thing that actually makes PV work: the people in its network.",
    "services": "Brand refresh · UI/UX design · Webflow build",
    "industry": "Venture capital",
    "year": "2025",
    "country": "United Kingdom",
    "siteUrl": "http://portfolio.ventures/",
    "siteLabel": "portfolio.ventures",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/115e1c447d50ab982837020981ad51057e70f8c7-2800x1572.jpg",
            "alt": "The Portfolio Ventures home page, Best connected, early stage investor"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/8b067de5c971675a47c9568d065cb0261ec1b35e-2073x1553.jpg",
            "alt": "The PV mark on a sticker, on a laptop resting against rock"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/777cfb176d6f27d05e81addbe8a3139f0b8b591c-1453x1935.jpg",
            "alt": "The mobile site in two phones, Boost Your Startup With Portfolio"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/79abad08339f91a5bae2d61488513a532c98efeb-1453x1935.jpg",
            "alt": "Empower Founders on a phone, stood on stone steps"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/626728509728ed6951c37666f9f820ab67a77c2d-2073x1553.jpg",
            "alt": "The brand system, Funnel Sans, the founder photography and the palette"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/fd5ea79e388a7fa2b8c3167e580a205c1b273091-1763x1935.jpg",
            "alt": "The wordmark and the Pv monogram, in navy and blue"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/fd22361634dfd139b02532d88119ec470ff83abf-1763x1935.jpg",
            "alt": "The Pv mark on its construction grid"
      },
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/86d465fe599f4237f5ae2f3f7e970a16b95efce1-2800x1756.jpg",
            "alt": "Get in touch and the home page, side by side on two phones"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "rally",
    "title": "Rally",
    "intro": "",
    "services": "Webflow development",
    "industry": "Fleet management",
    "year": "2025",
    "country": "Netherlands",
    "siteUrl": "https://www.getrally.com/",
    "siteLabel": "www.getrally.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/6cec671fef0e3ac55488a47d41fc9557f1c6c440-1440x1698.png",
            "alt": "Rally"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "reach-industries",
    "title": "Reach Industries",
    "intro": "",
    "services": "UI/UX design · Webflow development",
    "industry": "Lab automation",
    "year": "2025",
    "country": "United Kingdom",
    "siteUrl": "https://reach.industries/",
    "siteLabel": "reach.industries",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/95b79ddcdb17e7fc049a7fb7d60cb60d0d8b8d68-1440x1698.png",
            "alt": "Reach Industries"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "rhinestone",
    "title": "Rhinestone",
    "intro": "",
    "services": "Webflow development",
    "industry": "Crypto",
    "year": "2025",
    "country": "United States",
    "siteUrl": "https://www.rhinestone.dev/",
    "siteLabel": "www.rhinestone.dev",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/e1f0eba1798bfa4991abfc62cb00c9ebc88e8982-1440x1698.png",
            "alt": "Rhinestone"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "riverlight",
    "title": "Riverlight",
    "intro": "",
    "services": "Webflow development",
    "industry": "",
    "year": "2026",
    "country": "United Kingdom",
    "siteUrl": "https://riverlight-web.webflow.io/",
    "siteLabel": "riverlight-web.webflow.io",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/3b61bb40e8cb449ca1fbd30a8b83b6cfa5749147-1440x1698.png",
            "alt": "Riverlight"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "sib",
    "title": "SIB",
    "intro": "",
    "services": "UI/UX design · Webflow development",
    "industry": "Business consulting",
    "year": "2025",
    "country": "United States",
    "siteUrl": "https://www.aboutsib.com/",
    "siteLabel": "www.aboutsib.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/00e74dddb9c3d0b5a637f08e6a8e905d747185c2-1440x1698.png",
            "alt": "SIB"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "squirrelled",
    "title": "Squirrelled",
    "intro": "",
    "services": "Webflow development",
    "industry": "EdTech",
    "year": "2025",
    "country": "United Kingdom",
    "siteUrl": "https://www.squirrelled.com/",
    "siteLabel": "www.squirrelled.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/7938b334c36076d52397c9f813eb13f21b93426c-1440x1698.png",
            "alt": "Squirrelled"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  },
  {
    "slug": "trustyfy",
    "title": "Trustyfy",
    "intro": "",
    "services": "Webflow development",
    "industry": "Crypto",
    "year": "2025",
    "country": "Poland",
    "siteUrl": "https://www.trustyfy.com/",
    "siteLabel": "www.trustyfy.com",
    "images": [
      {
            "src": "https://cdn.sanity.io/images/pka0c0l0/production/8486c547aafe49e4df17a544dd841cfb2eebbb34-1440x1698.png",
            "alt": "Trustyfy"
      }
],
    "nextSlug": null,
    "schema": [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://www.awakeagency.dev/#studio",
        "name": "Awake",
        "alternateName": "Awake Agency",
        "url": "https://www.awakeagency.dev",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "email": "contact@awakeagency.dev",
        "image": "https://www.awakeagency.dev/og.jpg",
        "logo": "https://www.awakeagency.dev/apple-icon.png",
        "slogan": "Creative digital studio in Warsaw. Premium websites and web products",
        "founder": {
          "@type": "Person",
          "name": "Mykyta Kashcheiev"
        },
        "taxID": "1133116067",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Warsaw",
          "addressCountry": "PL"
        },
        "areaServed": "Worldwide",
        "knowsAbout": [
          "Web design",
          "Webflow development",
          "Next.js development",
          "Branding",
          "Motion design",
          "WebGL"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/awakeagency/",
          "https://www.upwork.com/agencies/1654808563442126848/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.awakeagency.dev/#website",
        "url": "https://www.awakeagency.dev",
        "name": "Awake",
        "description": "We design and build websites, storefronts and web product front ends for founders and product teams who need to stand out. Webflow, Next.js, Shopify, motion and WebGL. 60+ projects shipped.",
        "inLanguage": "en",
        "publisher": {
          "@id": "https://www.awakeagency.dev/#studio"
        }
      }
    ]
  }
];
