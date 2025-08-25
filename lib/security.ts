// Security utilities for Nederland Stemt
'use client';

import { createHash } from 'crypto';

// XSS Prevention - Sanitize HTML input
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate CSRF token
export function generateCSRFToken(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}_${random}`;
}

// Validate CSRF token (basic client-side validation)
export function validateCSRFToken(token: string): boolean {
  if (!token || !token.includes('_')) return false;
  
  const [timestamp] = token.split('_');
  const tokenAge = Date.now() - parseInt(timestamp);
  
  // Token expires after 1 hour
  return tokenAge < 60 * 60 * 1000;
}

// Rate limiting for localStorage
interface RateLimit {
  count: number;
  lastReset: number;
}

export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  const rateLimitKey = `rate_limit_${key}`;
  const stored = localStorage.getItem(rateLimitKey);
  const now = Date.now();
  
  let rateLimit: RateLimit = stored ? JSON.parse(stored) : { count: 0, lastReset: now };
  
  // Reset window if expired
  if (now - rateLimit.lastReset > windowMs) {
    rateLimit = { count: 0, lastReset: now };
  }
  
  rateLimit.count++;
  localStorage.setItem(rateLimitKey, JSON.stringify(rateLimit));
  
  return rateLimit.count <= maxAttempts;
}

// Hash password for comparison (client-side basic hashing)
export function hashPassword(password: string): string {
  // Note: In production, this should be done server-side with bcrypt
  // This is a simple client-side hash for MVP localStorage usage
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'nederland_stemt_salt');
  
  // Simple hash implementation (NOT for production)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return hash.toString(36);
}

// Content moderation - basic word filter
export const FORBIDDEN_WORDS = [
  'spam', 'scam', 'hack', 'illegal', 'drugs', 'violence',
  // Add more Dutch inappropriate words as needed
];

export function containsForbiddenContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_WORDS.some(word => lowerText.includes(word));
}

// Validate proposal content
export function validateProposal(title: string, description: string, category: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Sanitize inputs
  const cleanTitle = sanitizeInput(title.trim());
  const cleanDescription = sanitizeInput(description.trim());
  
  // Validation rules
  if (cleanTitle.length < 3) errors.push('Titel moet minimaal 3 karakters bevatten');
  if (cleanTitle.length > 100) errors.push('Titel mag maximaal 100 karakters bevatten');
  if (cleanDescription.length < 10) errors.push('Beschrijving moet minimaal 10 karakters bevatten');
  if (cleanDescription.length > 300) errors.push('Beschrijving mag maximaal 300 karakters bevatten');
  if (!category) errors.push('Categorie is verplicht');
  
  // Content moderation
  if (containsForbiddenContent(cleanTitle) || containsForbiddenContent(cleanDescription)) {
    errors.push('Content bevat niet toegestane woorden');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Spam detection - check for repeated submissions
export function isSpamSubmission(title: string, description: string): boolean {
  const submissions = JSON.parse(localStorage.getItem('nederland-stemt-submissions') || '[]');
  const recent = submissions.filter((s: any) => {
    const age = Date.now() - new Date(s.submittedAt).getTime();
    return age < 24 * 60 * 60 * 1000; // 24 hours
  });
  
  // Check for duplicate content
  return recent.some((s: any) => 
    s.title.toLowerCase() === title.toLowerCase() ||
    s.description.toLowerCase() === description.toLowerCase()
  );
}

// Security headers (for middleware)
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' *.google-analytics.com; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
};