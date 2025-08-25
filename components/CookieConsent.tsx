'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: Date.now()
    }));
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleSavePreferences = (functional: boolean, analytics: boolean) => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      necessary: true,
      functional,
      analytics,
      timestamp: Date.now()
    }));
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Cookie Banner */}
      <div className="relative bg-white rounded-t-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Wij gebruiken cookies
                </h2>
                <p className="text-sm text-gray-600">
                  Voor de beste ervaring en om Nederland Stemt te verbeteren
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Nederland Stemt gebruikt cookies om de website goed te laten werken, 
            uw voorkeuren te onthouden en om te begrijpen hoe u de site gebruikt. 
            Sommige cookies zijn noodzakelijk, andere kunt u aanpassen.
          </p>

          {!showDetails ? (
            // Simple view
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="bg-[#0052CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Accepteer alle cookies
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Alleen noodzakelijke
                </button>
                <button
                  onClick={handleCustomize}
                  className="text-[#0052CC] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Aanpassen
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                Lees meer in onze{' '}
                <a href="/cookies" className="text-[#0052CC] hover:underline">
                  cookieverklaring
                </a>{' '}
                en{' '}
                <a href="/privacy" className="text-[#0052CC] hover:underline">
                  privacyverklaring
                </a>.
              </p>
            </div>
          ) : (
            // Detailed view
            <CookieDetails onSave={handleSavePreferences} onBack={handleCustomize} />
          )}
        </div>
      </div>
    </div>
  );
}

interface CookieDetailsProps {
  onSave: (functional: boolean, analytics: boolean) => void;
  onBack: () => void;
}

function CookieDetails({ onSave, onBack }: CookieDetailsProps) {
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Necessary Cookies */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Noodzakelijke cookies</h3>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Altijd aan
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Essentieel voor de werking van het platform. Voorkomt dubbele stemmen 
            en houdt u ingelogd als admin.
          </p>
          <p className="text-xs text-gray-500">
            Cookies: nederland-stemt-votes, admin_token, csrf_token
          </p>
        </div>

        {/* Functional Cookies */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Functionele cookies</h3>
            <button
              onClick={() => setFunctional(!functional)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 ${
                functional ? 'bg-[#0052CC]' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={functional}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  functional ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Onthouden van uw voorkeuren zoals taal en kleurthema. 
            Voorkomt herhaalde tutorials.
          </p>
          <p className="text-xs text-gray-500">
            Cookies: theme_preference, language_preference, onboarding_completed
          </p>
        </div>

        {/* Analytics Cookies */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Analytische cookies</h3>
            <button
              onClick={() => setAnalytics(!analytics)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 ${
                analytics ? 'bg-[#0052CC]' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={analytics}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  analytics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Helpen ons begrijpen hoe u de website gebruikt zodat wij deze kunnen verbeteren. 
            Volledig anoniem.
          </p>
          <p className="text-xs text-gray-500">
            Cookies: _ga, _gid (Google Analytics)
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => onSave(functional, analytics)}
          className="bg-[#0052CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Voorkeuren opslaan
        </button>
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Terug
        </button>
      </div>
    </div>
  );
}