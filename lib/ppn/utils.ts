import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_DEFAULT_KEY = 'default-encryption-key-change-in-production';

/**
 * Check if encryption is properly configured for production
 */
export function isEncryptionConfigured(): boolean {
  return !!ENCRYPTION_KEY && ENCRYPTION_KEY !== ENCRYPTION_DEFAULT_KEY;
}

/**
 * Get encryption key with fallback for dev environment
 */
function getEncryptionKey(): string | null {
  if (ENCRYPTION_KEY) {
    return ENCRYPTION_KEY;
  }
  // In development, use default key but log warning
  if (process.env.NODE_ENV === 'development') {
    console.warn('[PPN] ENCRYPTION_KEY not set, using default key (dev only)');
    return ENCRYPTION_DEFAULT_KEY;
  }
  return null;
}

/**
 * Encrypt sensitive data (e.g., payout method details)
 * Returns null if encryption is not configured in production
 */
export function encrypt(data: string): string | null {
  const key = getEncryptionKey();
  if (!key) {
    return null;
  }
  return CryptoJS.AES.encrypt(data, key).toString();
}

/**
 * Decrypt sensitive data
 * Returns null if encryption is not configured or decryption fails
 */
export function decrypt(encryptedData: string): string | null {
  const key = getEncryptionKey();
  if (!key) {
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
}

/**
 * Generate a unique partner code (8 characters, alphanumeric uppercase)
 */
export function generatePartnerCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars like O, 0, 1, I
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate a webhook secret for a product
 */
export function generateWebhookSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let secret = 'whsec_';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
}

/**
 * Get current month key in YYYY-MM format
 */
export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculate eligibility date (60 days from occurred_at)
 */
export function calculateEligibilityDate(occurredAt: Date): Date {
  const eligibleAt = new Date(occurredAt);
  eligibleAt.setDate(eligibleAt.getDate() + 60);
  return eligibleAt;
}

/**
 * Check if a partner code is valid format
 */
export function isValidPartnerCode(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code);
}

/**
 * Parse country list from JSON string
 */
export function parseCountryList(json: string | null): string[] {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

/**
 * Stringify country list to JSON
 */
export function stringifyCountryList(countries: string[]): string {
  return JSON.stringify(countries);
}
