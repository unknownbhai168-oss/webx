import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimatedPrice } from './pricing';
import {
  buildWhatsAppUrl,
  getStaticEnquiryMessage,
  getDynamicEnquiryMessage,
  formatCustomInquiryMessage,
} from './whatsapp';

test('calculateEstimatedPrice calculates static base price correctly', () => {
  const result = calculateEstimatedPrice({
    packageType: 'static',
    pageCount: 3,
    selectedAddonIds: [],
  });
  assert.equal(result.basePrice, 1700);
  assert.equal(result.extraPagesPrice, 0);
  assert.equal(result.addonsPrice, 0);
  assert.equal(result.total, 1700);
});

test('calculateEstimatedPrice adds extra page fees and selected addons', () => {
  const result = calculateEstimatedPrice({
    packageType: 'static',
    pageCount: 5, // 2 extra pages * 200 = 400
    selectedAddonIds: ['google_maps', 'photo_gallery'], // 150 + 250 = 400
  });
  assert.equal(result.basePrice, 1700);
  assert.equal(result.extraPagesPrice, 400);
  assert.equal(result.addonsPrice, 400);
  assert.equal(result.total, 2500);
});

test('calculateEstimatedPrice calculates dynamic website correctly', () => {
  const result = calculateEstimatedPrice({
    packageType: 'dynamic',
    pageCount: 4,
    selectedAddonIds: ['custom_animations'], // 350
  });
  assert.equal(result.basePrice, 2100);
  assert.equal(result.extraPagesPrice, 0);
  assert.equal(result.addonsPrice, 350);
  assert.equal(result.total, 2450);
});

test('getStaticEnquiryMessage contains required ₹1,700 text', () => {
  const msg = getStaticEnquiryMessage();
  assert.ok(msg.includes('1,700'));
  assert.ok(msg.includes('Static Website Development'));
});

test('getDynamicEnquiryMessage contains required ₹2,100 text', () => {
  const msg = getDynamicEnquiryMessage();
  assert.ok(msg.includes('2,100'));
  assert.ok(msg.includes('Dynamic Website Development'));
});

test('buildWhatsAppUrl generates correct universal wa.me link with configured number', () => {
  const defaultUrl = buildWhatsAppUrl('Hello WEBX!');
  assert.ok(defaultUrl.startsWith('https://wa.me/918910003277?text=Hello%20WEBX!'));

  const overrideUrl = buildWhatsAppUrl('Hello WEBX!', '919876543210');
  assert.ok(overrideUrl.startsWith('https://wa.me/919876543210?text=Hello%20WEBX!'));
});

test('formatCustomInquiryMessage formats client details cleanly', () => {
  const msg = formatCustomInquiryMessage({
    clientName: 'Rahul Sharma',
    businessName: 'Sharma Dental Clinic',
    phone: '9876543210',
    email: 'rahul@example.com',
    websiteType: 'static',
    projectDescription: 'Need a clean static clinic website with Google Maps.',
  });
  assert.ok(msg.includes('Rahul Sharma'));
  assert.ok(msg.includes('Sharma Dental Clinic'));
  assert.ok(msg.includes('Static Website (from ₹1700)'));
});
