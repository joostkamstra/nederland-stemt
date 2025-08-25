'use client';

import { useState } from 'react';
import OnboardingModal from './OnboardingModal';

export default function HelpButton() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleShowHelp = () => {
    setShowOnboarding(true);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <>
      <button
        onClick={handleShowHelp}
        className="text-gray-700 hover:text-[#0052CC] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded-lg px-3 py-2 font-medium flex items-center gap-2"
        aria-label="Help en uitleg"
        title="Bekijk de uitleg hoe Nederland Stemt werkt"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden sm:inline">Help</span>
      </button>
      
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleCompleteOnboarding}
        onSkip={handleSkipOnboarding}
      />
    </>
  );
}