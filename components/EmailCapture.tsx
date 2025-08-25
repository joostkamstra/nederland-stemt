'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/security';

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'vote_complete' | 'page_exit' | 'manual';
  title?: string;
  description?: string;
}

export default function EmailCapture({ 
  isOpen, 
  onClose, 
  trigger = 'manual',
  title,
  description 
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const getContent = () => {
    switch (trigger) {
      case 'vote_complete':
        return {
          title: 'Bedankt voor je stem! 🗳️',
          description: 'Wil je op de hoogte blijven van de wekelijkse resultaten en nieuwe stemmingen?',
          buttonText: 'Ja, houd me op de hoogte'
        };
      case 'page_exit':
        return {
          title: 'Mis geen enkele stemming! 📧',
          description: 'Ontvang elke week een herinnering om te stemmen op Nederland\'s prioriteiten.',
          buttonText: 'Schrijf me in'
        };
      default:
        return {
          title: title || 'Blijf op de hoogte',
          description: description || 'Ontvang wekelijkse updates over Nederland\'s prioriteiten.',
          buttonText: 'Inschrijven'
        };
    }
  };

  const content = getContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Vul een e-mailadres in');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Vul een geldig e-mailadres in');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if already subscribed
      const existingSignups = JSON.parse(localStorage.getItem('email_signups') || '[]');
      const emailExists = existingSignups.some((signup: any) => 
        signup.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        setError('Dit e-mailadres is al ingeschreven');
        setIsSubmitting(false);
        return;
      }

      // Store email signup
      const newSignup = {
        id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: email.trim().toLowerCase(),
        source: trigger,
        subscribedAt: new Date().toISOString(),
        status: 'active',
        preferences: {
          weeklyReminder: true,
          resultsUpdate: true,
          newFeatures: false
        }
      };

      existingSignups.push(newSignup);
      localStorage.setItem('email_signups', JSON.stringify(existingSignups));

      // Track signup event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_signup', {
          event_category: 'engagement',
          event_label: trigger,
          value: 1
        });
      }

      setIsSubmitted(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Email signup failed:', error);
      setError('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Inschrijving gelukt! ✅
            </h3>
            <p className="text-gray-600">
              Je ontvangt nu wekelijks updates over Nederland Stemt.
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Je kunt je altijd uitschrijven via de links in onze e-mails.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {content.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] rounded-lg p-1"
              aria-label="Sluit modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {content.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mailadres *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
                placeholder="jouw@email.nl"
                aria-describedby={error ? "email-error" : undefined}
                required
              />
              {error && (
                <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Je ontvangt:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Wekelijkse stemherinnering (maandag)</li>
                <li>✅ Resultaten naar de Tweede Kamer (vrijdag)</li>
                <li>✅ Nieuwe prioriteiten om op te stemmen</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0052CC] text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
                }`}
              >
                {isSubmitting ? 'Bezig...' : content.buttonText}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors"
              >
                Later
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Door in te schrijven ga je akkoord met onze{' '}
              <a href="/privacy" className="text-[#0052CC] hover:underline">
                privacyverklaring
              </a>. 
              Je kunt je altijd uitschrijven.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}