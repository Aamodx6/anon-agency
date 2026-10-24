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
    "slug": "aimplify",
    "title": "Aimplify",
    "intro": "",
    "services": "UI/UX design · Webflow development",
    "industry": "IT consultancy",
    "year": "2023",
    "country": "Japan",
    "siteUrl": "https://www.aimplify.io/",
    "siteLabel": "www.aimplify.io",
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
    "images": [],
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
