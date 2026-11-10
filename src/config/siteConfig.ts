export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    heroHeadline: string;
    heroHeadlineHighlight: string;
    heroSubtitle: string;
    founder: {
      name: string;
      role: string;
      bio: string;
    };
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    phoneTel: string;
    whatsappNumber: string; // e.g. "918910003277" without spaces or '+' for wa.me
    whatsappDisplay: string;
    email: string;
    location: string;
    availability: string;
    socials: {
      github?: string;
      linkedin?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  pricing: {
    staticStartingPrice: number;
    dynamicStartingPrice: number;
    currencySymbol: string;
    disclaimer: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "WEBX",
    tagline: "YOUR BUSINESS. OUR DIGITAL VISION.",
    heroHeadline: "WE DON'T JUST BUILD WEBSITES. WE CREATE",
    heroHeadlineHighlight: "DIGITAL EXPERIENCES.",
    heroSubtitle:
      "Your business deserves more than an online presence. WEBX transforms your ideas into modern, responsive and professional digital experiences at affordable prices.",
    founder: {
      name: "Mehul Roy",
      role: "Founder & Creative Web Developer",
      bio: "A passionate student and freelance developer crafting international-standard digital experiences for growing businesses and startups at accessible Indian prices.",
    },
  },
  contact: {
    // Configurable central contact details
    phone: "7980195245",
    phoneDisplay: "+91 79801 95245",
    phoneTel: "tel:+917980195245",
    whatsappNumber: "918910003277",
    whatsappDisplay: "+91 89100 03277",
    email: "contact@webxagency.dev",
    location: "Kolkata / Remote Worldwide",
    availability: "Accepting New Client Projects",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  pricing: {
    staticStartingPrice: 1700,
    dynamicStartingPrice: 2100,
    currencySymbol: "₹",
    disclaimer:
      "Starting prices for websites deployed on fast, free subdomains (e.g., yourbusiness.vercel.app) with zero server maintenance fees. SEO optimization is not included in base packages; sites are built for direct sharing, social media profiles, and WhatsApp conversions.",
  },
};
