const SITE_URL = "https://apalevich.pro";
const ORG_NAME = "APalevich.Pro";
const ORG_LOGO = `${SITE_URL}/assets/img/logoDark.svg`;

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/apalevich-pro",
  "https://www.linkedin.com/in/apalevich",
  "https://www.github.com/apalevich",
];

export function abs(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: ORG_LOGO,
    sameAs: SOCIAL_PROFILES,
    email: "artem@apalevich.pro",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ORG_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceNode(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  serviceType?: string;
}) {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    url: abs(input.url),
    image: input.image ? abs(input.image) : undefined,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Global",
  };
}

export function faqNode(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function graph(nodes: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
