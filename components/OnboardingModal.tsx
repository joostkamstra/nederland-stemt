'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { analytics } from './AnalyticsTracker';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  action?: {
    text: string;
    highlight?: string;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welkom bij Nederland Stemt!',
    description: 'Jouw stem telt. Elke week kun je stemmen op de 3 belangrijkste prioriteiten voor Nederland. Geen partijpolitiek, gewoon jouw mening.',
    icon: '🇳🇱'
  },
  {
    id: 'how-it-works',
    title: 'Hoe werkt het?',
    description: 'Kies uit de verschillende onderwerpen die spelen in Nederland. Selecteer de 3 prioriteiten die jij het belangrijkst vindt.',
    icon: '🗳️',
    action: {
      text: 'Selecteer exact',
      highlight: '3 prioriteiten'
    }
  },
  {
    id: 'weekly-voting',
    title: 'Wekelijks stemmen',
    description: 'Elke week opnieuw kun je stemmen. De resultaten worden vrijdag bekendgemaakt en gaan naar de Tweede Kamer.',
    icon: '📅'
  },
  {
    id: 'your-impact',
    title: 'Jouw impact',
    description: 'Samen met andere Nederlanders bepaal jij wat er prioriteit krijgt. Directe democratie in actie!',
    icon: '💪'
  },
  {
    id: 'privacy',
    title: 'Privacy & Transparantie',
    description: 'Jouw stem is anoniem. We respecteren je privacy en zijn volledig transparant over hoe we omgaan met data.',
    icon: '🔒'
  }
];

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingModal({ isOpen, onComplete, onSkip }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Track onboarding start
      analytics.trackEvent('onboarding_started', {
        category: 'onboarding',
        step: 1,
        total_steps: onboardingSteps.length
      });
    }
  }, [isOpen]);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    
    // Track step completion
    analytics.trackEvent('onboarding_step_completed', {
      category: 'onboarding',
      step: currentStep + 1,
      step_id: onboardingSteps[currentStep].id,
      total_steps: onboardingSteps.length
    });

    if (nextStep < onboardingSteps.length) {
      setCurrentStep(nextStep);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Track step back
      analytics.trackEvent('onboarding_step_back', {
        category: 'onboarding',
        step: currentStep,
        step_id: onboardingSteps[currentStep].id
      });
    }
  };

  const handleComplete = () => {
    // Mark onboarding as completed in storage
    storage.setUserPreference('onboardingCompleted', true);
    
    // Track completion
    analytics.trackEvent('onboarding_completed', {
      category: 'onboarding',
      completed_steps: onboardingSteps.length,
      total_steps: onboardingSteps.length
    });

    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    // Track skip
    analytics.trackEvent('onboarding_skipped', {
      category: 'onboarding',
      step: currentStep + 1,
      step_id: onboardingSteps[currentStep].id,
      total_steps: onboardingSteps.length
    });

    // Still mark as completed to avoid showing again
    storage.setUserPreference('onboardingCompleted', true);
    
    setIsVisible(false);
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    
    // Track direct step navigation
    analytics.trackEvent('onboarding_step_clicked', {
      category: 'onboarding',
      from_step: currentStep + 1,
      to_step: stepIndex + 1,
      step_id: onboardingSteps[stepIndex].id
    });
  };

  if (!isOpen) return null;

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">{currentStepData.icon}</div>
              <div className="text-sm text-gray-500">
                Stap {currentStep + 1} van {onboardingSteps.length}
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 text-sm underline focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded"
              aria-label="Onboarding overslaan"
            >
              Overslaan
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Onboarding voortgang: ${Math.round(progress)}%`}
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-1 ${
                  index === currentStep
                    ? 'bg-[#FF6B00] scale-125'
                    : index < currentStep
                    ? 'bg-[#FF6B00] opacity-60'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ga naar stap ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <h2 
            id="onboarding-title" 
            className="text-xl font-bold text-gray-900 mb-3"
          >
            {currentStepData.title}
          </h2>
          
          <p 
            id="onboarding-description" 
            className="text-gray-600 leading-relaxed mb-6"
          >
            {currentStepData.description}
            {currentStepData.action && (
              <span className="block mt-2 font-semibold text-[#FF6B00]">
                {currentStepData.action.text}{' '}
                {currentStepData.action.highlight && (
                  <span className="bg-[#FF6B00] text-white px-1 rounded">
                    {currentStepData.action.highlight}
                  </span>
                )}
              </span>
            )}
          </p>
          
          {/* Action buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              aria-label="Vorige stap"
            >
              ← Vorige
            </button>
            
            <button
              onClick={handleNext}
              className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#E55A00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2"
              aria-label={currentStep === onboardingSteps.length - 1 ? 'Onboarding afronden' : 'Volgende stap'}
            >
              {currentStep === onboardingSteps.length - 1 ? 'Beginnen!' : 'Volgende →'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        {currentStep === onboardingSteps.length - 1 && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            <div className="text-center text-sm text-gray-500">
              Je kunt deze uitleg altijd terugvinden in het menu
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook to manage onboarding state
export function useOnboarding() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const userPrefs = storage.getUserPreferences();
    const hasCompleted = userPrefs.onboardingCompleted;
    
    // Show onboarding for new users
    if (!hasCompleted) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setShouldShowOnboarding(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    setShouldShowOnboarding(false);
  };

  const skipOnboarding = () => {
    setShouldShowOnboarding(false);
  };

  // Function to manually trigger onboarding (for help/tutorial)
  const showOnboarding = () => {
    setShouldShowOnboarding(true);
  };

  return {
    shouldShowOnboarding,
    completeOnboarding,
    skipOnboarding,
    showOnboarding
  };
}