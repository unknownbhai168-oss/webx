import { siteConfig } from '../config/siteConfig';

export interface ProjectInquiryData {
  clientName: string;
  businessName: string;
  phone: string;
  email?: string;
  websiteType: 'static' | 'dynamic' | 'custom';
  preferredBudget?: string;
  projectDescription: string;
}

/**
 * Standard pre-filled messages as specified in requirements:
 * 1. STATIC WEBSITE ENQUIRY:
 * "Hello WEBX! I am interested in your Static Website Development package starting at ₹1,700. I would like to discuss my business requirements."
 * 2. DYNAMIC WEBSITE ENQUIRY:
 * "Hello WEBX! I am interested in your Dynamic Website Development package starting at ₹2,100. I would like to discuss my business requirements."
 * 3. GENERAL ENQUIRY:
 * "Hello WEBX! I would like to develop a website for my business. Please share more details."
 */
export function getStaticEnquiryMessage(): string {
  return `Hello WEBX! I am interested in your Static Website Development package starting at ₹${siteConfig.pricing.staticStartingPrice.toLocaleString()}. I would like to discuss my business requirements.`;
}

export function getDynamicEnquiryMessage(): string {
  return `Hello WEBX! I am interested in your Dynamic Website Development package starting at ₹${siteConfig.pricing.dynamicStartingPrice.toLocaleString()}. I would like to discuss my business requirements.`;
}

export function getGeneralEnquiryMessage(): string {
  return `Hello WEBX! I would like to develop a website for my business. Please share more details.`;
}

export function formatCustomInquiryMessage(data: ProjectInquiryData): string {
  const typeLabel =
    data.websiteType === 'static'
      ? `Static Website (from ₹${siteConfig.pricing.staticStartingPrice})`
      : data.websiteType === 'dynamic'
      ? `Dynamic Website (from ₹${siteConfig.pricing.dynamicStartingPrice})`
      : 'Custom Tailored Website';

  return [
    `*NEW PROJECT ENQUIRY — WEBX*`,
    `--------------------------------`,
    `*Client Name:* ${data.clientName.trim()}`,
    `*Business Name:* ${data.businessName.trim()}`,
    `*Phone / Contact:* ${data.phone.trim()}`,
    data.email ? `*Email:* ${data.email.trim()}` : null,
    `*Selected Package:* ${typeLabel}`,
    data.preferredBudget ? `*Preferred Budget:* ${data.preferredBudget}` : null,
    `--------------------------------`,
    `*Project Brief:*`,
    `${data.projectDescription.trim()}`,
    `--------------------------------`,
    `_Sent via WEBX Agency Portal_`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Builds universal WhatsApp redirect URL with proper encoding
 */
export function buildWhatsAppUrl(
  message: string,
  overrideNumber?: string
): string {
  const number = (overrideNumber || siteConfig.contact.whatsappNumber).replace(
    /[^0-9]/g,
    ''
  );
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Formats a custom quote calculation inquiry
 */
export function formatCalculatorQuoteMessage(params: {
  packageType: string;
  pageCount: number;
  features: string[];
  estimatedTotal: number;
}): string {
  return [
    `*WEBX INSTANT QUOTE ESTIMATE*`,
    `--------------------------------`,
    `*Package:* ${params.packageType}`,
    `*Page Count:* ${params.pageCount} pages`,
    `*Add-on Features:*`,
    params.features.length > 0
      ? params.features.map((f) => ` • ${f}`).join('\n')
      : ' • Standard Core Features Only',
    `--------------------------------`,
    `*Estimated Total:* ₹${params.estimatedTotal.toLocaleString()}`,
    `--------------------------------`,
    `Hello Mehul! I used the WEBX quote calculator and would like to start this project. Let me know the next steps!`,
  ].join('\n');
}
