import { siteConfig } from '../config/siteConfig';

export interface CalculatorAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const CALCULATOR_ADDONS: CalculatorAddon[] = [
  {
    id: 'whatsapp_integration',
    name: 'Floating WhatsApp Chat & Lead Capture',
    description: 'Instant lead routing directly to your phone or team',
    price: 0, // Included free!
  },
  {
    id: 'google_maps',
    name: 'Google Maps & Location Pin Embed',
    description: 'Interactive map pin and location directions for shop/clinic',
    price: 150,
  },
  {
    id: 'photo_gallery',
    name: 'Interactive Image & Project Showcase',
    description: 'Filterable grid or lightbox gallery for photos/services',
    price: 250,
  },
  {
    id: 'custom_animations',
    name: 'Cinematic 3D & Micro-Interactions',
    description: 'Custom smooth motion effects and premium agency flair',
    price: 350,
  },
  {
    id: 'contact_form_database',
    name: 'Validated Lead Form with Email Alert',
    description: 'Instant notification on new client inquiries',
    price: 300,
  },
  {
    id: 'express_delivery',
    name: 'Express 48-Hour Rush Delivery',
    description: 'Priority development timeline for urgent launches',
    price: 500,
  },
];

export interface PriceCalculationInput {
  packageType: 'static' | 'dynamic' | 'custom';
  pageCount: number; // e.g. 1 to 10
  selectedAddonIds: string[];
}

export interface PriceCalculationResult {
  basePrice: number;
  extraPagesPrice: number;
  addonsPrice: number;
  total: number;
  includedPages: number;
}

export function calculateEstimatedPrice(
  input: PriceCalculationInput
): PriceCalculationResult {
  let basePrice = siteConfig.pricing.staticStartingPrice;
  let includedPages = 3;

  if (input.packageType === 'dynamic') {
    basePrice = siteConfig.pricing.dynamicStartingPrice;
    includedPages = 4;
  } else if (input.packageType === 'custom') {
    basePrice = 2800;
    includedPages = 5;
  }

  // Extra pages beyond included count
  const extraPages = Math.max(0, input.pageCount - includedPages);
  const pricePerPage = input.packageType === 'dynamic' ? 300 : 200;
  const extraPagesPrice = extraPages * pricePerPage;

  // Addons total
  const addonsPrice = input.selectedAddonIds.reduce((sum, addonId) => {
    const addon = CALCULATOR_ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const total = basePrice + extraPagesPrice + addonsPrice;

  return {
    basePrice,
    extraPagesPrice,
    addonsPrice,
    total,
    includedPages,
  };
}
