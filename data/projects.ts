export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  stack: string[];
  role: string;
  publishedDate: string;
  url: string;
  category: string;
  og: {
    title: string;
    description: string;
    url: string;
    image?: string;
  };
};

export const projects: Project[] = [
  {
    id: "dune",
    title: "Dune",
    summary: "AI-driven risk management website with responsive Webflow pages, CMS work, and CRM automation.",
    description:
      "Worked on this project as a Webflow developer within a company. Built responsive pages based on Figma designs, created CRM integrations, worked extensively with CMS collections, implemented custom logic using JavaScript, and connected Zapier to automate workflows with Salesforce. Regularly communicated with clients to clarify technical requirements and details.",
    image: "/projects/assets/dune.png",
    stack: ["Webflow", "JavaScript", "API", "Zapier", "HTML"],
    role: "Webflow/Frontend Developer",
    publishedDate: "May 4, 2026",
    url: "https://dune.security",
    category: 'webflow',
    og: {
      title: "AI-Driven User Risk Management - Dune Security",
      description: "AI-driven user risk management platform for security teams.",
      url: "dune.security",
    },
  },
  {
    id: "flower-ai",
    title: "Flower AI",
    summary: "Webflow frontend with CMS architecture, Shopify and Google Sheets sync, and GSAP motion.",
    description:
      "Worked on this project as a Webflow developer within a company. Built responsive pages based on Figma designs, structured and designed CMS architecture, and implemented integrations with Google Sheets and Shopify to ensure real-time data synchronization with Webflow CMS. These integrations were developed using Google Apps Script and n8n. Also created scroll-based animations, synchronized sliders, and GSAP-powered animations.",
    image: "/projects/assets/flowerai.png",
    stack: ["Webflow", "JavaScript", "API", "n8n", "Google Apps Script"],
    role: "Webflow/Frontend Developer",
    publishedDate: "May 4, 2026",
    url: "https://floweraipeople.com",
    category: 'webflow',
    og: {
      title: "Flower AI",
      description: "Frontend, CMS architecture, integrations, sliders, and GSAP animations.",
      url: "floweraipeople.com",
    },
  },
  {
    id: "sdi",
    title: "SDI",
    summary: "Lead Webflow development with CMS and style architecture, migration work, and HubSpot integration.",
    description:
      "Worked on this project as a Lead Webflow Developer within a company. Designed the CMS and style architecture, assigned tasks, and supervised the team's development process. Personally developed complex components, handled CMS data migration from WordPress, implemented advanced JavaScript-based animations, and built complex layouts. Also led the integration with HubSpot CRM.",
    image: "/projects/assets/sdi.png",
    stack: ["Webflow", "JavaScript", "HubSpot", "WordPress"],
    role: "Webflow Team Lead/Developer",
    publishedDate: "May 4, 2026",
    url: "https://sdipresence.com",
    category: 'webflow',
    og: {
      title: "IT Modernization & Managed Services Provider | SDI Presence",
      description:
        "SDI Presence delivers managed IT solutions, infrastructure modernization, and strategic consulting for government, utilities, and enterprise organizations nationwide.",
      url: "sdipresence.com",
    },
  },
  {
    id: "bd-emerson",
    title: "BD Emerson",
    summary: "Team lead Webflow work with CMS architecture, custom JavaScript, and implementation support.",
    description:
      "Worked on this project as a Lead Webflow Developer within a company. Designed the CMS and style architecture, assigned tasks, and oversaw the team's development. Supported the implementation of complex custom JavaScript solutions, including handling CMS limitations and integrations.",
    image: "/projects/assets/BD%20Emerson.png",
    stack: ["Webflow", "Lottie", "JavaScript", "HTML"],
    role: "Webflow Team Lead/Developer",
    publishedDate: "May 4, 2026",
    url: "https://bdemerson.com",
    category: 'webflow',
    og: {
      title: "bdemerson.com",
      description: "CMS architecture, style system, custom JavaScript, and Webflow implementation support.",
      url: "bdemerson.com",
    },
  },
  {
    id: "dron-show-software",
    title: "Dron Show Software",
    summary: "Ongoing Webflow development with CMS filtering, Zoho CRM integration, and lead forms.",
    description:
      "Currently working as a Webflow developer. Create and update pages, worked on Zoho CRM integration, set up and managed CMS collections with filtering, and implemented custom JavaScript logic for form handling and lead submission.",
    image: "/projects/assets/Drone-Show-Software.png",
    stack: ["Webflow", "JavaScript", "Zoho CRM", "HTML"],
    role: "Webflow Developer",
    publishedDate: "May 5, 2026",
    url: "https://droneshowsoftware.com",
    category: 'webflow',
    og: {
      title: "Drone Show Software: The #1 Solution for Drone Light Shows",
      description:
        "Create and manage stunning drone light shows with industry-leading Drone Show Software. Animate, synchronize, and fly a drone fleet with ease.",
      url: "droneshowsoftware.com",
    },
  },
  {
    id: "jonnydo",
    title: "JonnyDo",
    summary: "Webflow and JavaScript membership flow with quiz logic, Stripe checkout, and dynamic plan data.",
    description:
      "Worked on this project as a Webflow developer within a company. Built pages based on Figma designs, developed a quiz form for the membership page, and implemented a Stripe integration so that after selecting a subscription and completing the form, users are redirected to the correct Stripe checkout page. The quiz form also dynamically pulls data from subscription plan cards.",
    image: "/projects/assets/jonnydo.png",
    stack: ["Webflow", "JavaScript", "Figma", "Stripe"],
    role: "Webflow/JS Developer",
    publishedDate: "May 4, 2026",
    url: "https://jonnydo.com",
    category: 'webflow',
    og: {
      title: "JonnyDo",
      description: "Webflow membership flow with quiz logic and Stripe checkout routing.",
      url: "jonnydo.com",
    },
  },
  {
    id: "global-fast-track",
    title: "Global fast track",
    summary: "Webflow delivery under tight event deadlines with CMS collections and CRM integrations.",
    description:
      "Worked on this project as a Webflow developer. Created new pages and components, configured CMS collections, and implemented integrations with CRM systems. Frequently worked under tight deadlines to ensure the site was updated in time for specific event dates.",
    image: "/projects/assets/gft.png",
    stack: ["Webflow", "JavaScript", "HTML", "CSS"],
    role: "Webflow Developer",
    publishedDate: "May 5, 2026",
    url: "https://globalfasttrack.hk",
    category: 'webflow',
    og: {
      title: "globalfasttrack.hk",
      description: "Webflow pages, components, CMS collections, and CRM integrations for event-driven updates.",
      url: "globalfasttrack.hk",
    },
  },
  {
    id: "hh-fintech-week",
    title: "HH FinTech Week",
    summary: "Event website work for Asia's flagship conference, with CMS and HubSpot-oriented delivery.",
    description:
      "Worked on this project as a Webflow developer. Created new pages and components, configured CMS collections, and implemented integrations with CRM systems. Frequently worked under tight deadlines to ensure the site was updated in time for specific event dates.",
    image: "/projects/assets/hkftw.png",
    stack: ["Webflow", "HTML", "JavaScript", "HubSpot"],
    role: "Webflow Developer",
    publishedDate: "May 5, 2026",
    url: "https://fintechweek.hk",
    category: 'webflow',
    og: {
      title: "Hong Kong FinTech Week x StartmeupHK",
      description:
        "Register now for Asia's flagship conference, which brings together banking executives, founders, VCs, regulators and fintech-savvy professionals.",
      url: "fintechweek.hk",
    },
  },
  {
    id: "lingo",
    title: "Lingo",
    summary: "AI startup frontend for marketplace product descriptions, Webflow UI and JavaScript app logic.",
    description:
      "This is an AI startup focused on generating product descriptions for marketplaces. I worked on the frontend development: the layout was built in Webflow, while all core logic was implemented in JavaScript using REST APIs connected to a custom backend. I developed the login/registration flow, built the entire in-app generation logic, and integrated the backend payment system via API.",
    image: "/projects/assets/lingo.png",
    stack: ["Webflow", "JavaScript", "REST API", "Bitbucket", "Git"],
    role: "Frontend Developer",
    publishedDate: "May 4, 2026",
    url: "https://lingoai.ru",
    category: 'webflow',
    og: {
      title: "LINGO - service for generating marketplace copy",
      description: "Service for generating marketplace product descriptions.",
      url: "lingoai.ru",
    },
  },
  {
    id: "kt-team",
    title: "KT Team",
    summary: "Website redesign with scalable components, complex CMS structure, and Webflow CMS automation.",
    description:
      "Worked on a website redesign, updating the design system and rebuilding components into a scalable system. Developed and implemented a complex CMS structure with advanced filtering. Integrated Google Sheets with Webflow CMS via API using Google Apps Script to enable dynamic data updates.",
    image: "/projects/assets/kt.png",
    stack: ["Webflow", "Google Apps Script", "amoCRM", "JavaScript"],
    role: "Webflow Developer",
    publishedDate: "May 5, 2026",
    url: "https://kt-team.ru",
    category: 'webflow',
    og: {
      title: "Optimization and automation of business processes with KT.Team",
      description:
        "KT.Team is an IT systems integrator focused on optimization, automation, and improving business processes for medium and large businesses.",
      url: "kt-team.ru",
    },
  },
  {
    id: "bothelp",
    title: "BotHelp",
    summary: "Pricing page, custom JavaScript calculator, CMS collections, and Webflow component work.",
    description:
      "Worked on this project as a Webflow developer within a company. Built a pricing page with a custom JavaScript calculator, worked with CMS collections, and developed several pages and components.",
    image: "/projects/assets/bothleb.png",
    stack: ["Webflow", "JavaScript", "HTML", "CMS Development"],
    role: "Webflow Developer/JS Developer",
    publishedDate: "May 4, 2026",
    url: "https://bothelp.io",
    category: 'webflow',
    og: {
      title: "BotHelp pricing | Chatbot and AI agent builder pricing",
      description:
        "Scale sales with BotHelp: no-code builder, AI knowledge base, and payment only for active subscribers.",
      url: "bothelp.io",
    },
  },
  {
    id: "greenway",
    title: "Greenway",
    summary: "Logistics company website designed to communicate services and simplify order placement.",
    description:
      "The site was designed for a logistics company for the transportation of goods. The main goal was to reflect the services and capabilities of the company, so that the user can easily find the desired service and place an order.",
    image: "/projects/assets/greenway.svg",
    stack: ["HTML5", "Webflow", "UI/UX Prototyping", "Front-End Development", "Adobe Photoshop", "Figma", "CSS 3", "Webflow Professional"],
    role: "Webflow Developer",
    publishedDate: "Dec 5, 2022",
    url: "https://greenway.ru",
    category: 'webflow',
    og: {
      title: "Greenway",
      description: "Logistics company website for transportation services and order placement.",
      url: "greenway.ru",
    },
  },
  {
    id: "proactive-fire-safety",
    title: "Proactive - Fire safety company",
    summary: "Fire safety company website focused on expertise, service explanation, and lead generation.",
    description:
      "Creating a website to showcase the services of a fire safety company. Main tasks: show the experience and expertise of the team, tell as much as possible about the service of developing STC, and lead the visitor to leave an application.",
    image: "/projects/assets/proactive.svg",
    stack: ["HTML5", "Webflow", "UI/UX Prototyping", "CSS 3", "Adobe Photoshop", "Webflow Professional", "Figma", "Front-End Development"],
    role: "Webflow Developer",
    publishedDate: "Dec 5, 2022",
    url: "https://stu.proaktive.ru",
    category: 'webflow',
    og: {
      title: "Proactive - Fire safety company",
      description: "Website showcasing the services and expertise of a fire safety company.",
      url: "stu.proaktive.ru",
    },
  },
];
