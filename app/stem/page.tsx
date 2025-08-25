'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { defaultPriorities } from '@/lib/priorities';
import { storage } from '@/lib/storage';
import EmailCapture from '@/components/EmailCapture';
import { ClickTracker } from '@/components/EventTracker';
import { analytics } from '@/components/AnalyticsTracker';
import OnboardingModal, { useOnboarding } from '@/components/OnboardingModal';

export default function VotePage() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const router = useRouter();
  
  // Onboarding hook
  const {
    shouldShowOnboarding,
    completeOnboarding,
    skipOnboarding
  } = useOnboarding();

  useEffect(() => {
    if (storage.hasVotedThisWeek()) {
      setHasVoted(true);
      const voteData = storage.getVotes();
      if (voteData) {
        setSelectedPriorities(voteData.priorities);
      }
    }
  }, []);

  const handlePriorityToggle = (priorityId: string) => {
    if (hasVoted) return;

    setSelectedPriorities(prev => {
      const isAlreadySelected = prev.includes(priorityId);
      const priority = defaultPriorities.find(p => p.id === priorityId);
      
      if (isAlreadySelected) {
        // Track deselection
        analytics.trackEvent('priority_deselected', {
          category: 'voting',
          label: priorityId,
          priority_title: priority?.title,
          position: prev.indexOf(priorityId) + 1
        });
        return prev.filter(id => id !== priorityId);
      } else if (prev.length < 3) {
        // Track selection
        analytics.trackEvent('priority_selected', {
          category: 'voting',
          label: priorityId,
          priority_title: priority?.title,
          position: prev.length + 1
        });
        return [...prev, priorityId];
      } else {
        // Track attempt to select more than 3
        analytics.trackEvent('max_selections_reached', {
          category: 'voting',
          label: 'selection_limit'
        });
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    if (selectedPriorities.length !== 3 || hasVoted) return;

    setIsSubmitting(true);
    const startTime = Date.now();
    
    try {
      // Track vote submission start
      analytics.trackEvent('vote_submission_started', {
        category: 'voting',
        selected_count: selectedPriorities.length,
        selected_priorities: selectedPriorities.join(',')
      });
      
      // Store votes locally
      storage.setVotes(selectedPriorities);
      storage.incrementVotes(selectedPriorities);
      
      // Call API to store votes (for future use)
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priorities: selectedPriorities })
      });

      if (response.ok) {
        const completionTime = Date.now() - startTime;
        
        // Track successful vote
        analytics.trackVote(selectedPriorities, completionTime);
        analytics.trackTiming('vote_completion', completionTime, 'voting');
        
        setHasVoted(true);
        // Show email capture after successful vote
        setTimeout(() => {
          setShowEmailCapture(true);
        }, 1500);
      }
    } catch (error) {
      console.error('Vote submission failed:', error);
      
      // Track error
      analytics.trackError(`Vote submission failed: ${error}`, false);
      
      // Still mark as voted locally for MVP
      setHasVoted(true);
      setTimeout(() => {
        setShowEmailCapture(true);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearVotes = () => {
    storage.clearVotes();
    setSelectedPriorities([]);
    setHasVoted(false);
  };

  if (hasVoted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center bg-green-50 rounded-lg p-8">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bedankt voor je stem!
          </h1>
          <p className="text-gray-600 mb-6">
            Je hebt deze week al gestemd. De resultaten worden vrijdag bekendgemaakt.
          </p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Jouw gekozen prioriteiten:</h3>
            <div className="space-y-2">
              {selectedPriorities.map(id => {
                const priority = defaultPriorities.find(p => p.id === id);
                return (
                  <div key={id} className="bg-white p-3 rounded border">
                    {priority?.title}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/resultaten')}
              className="bg-[#0052CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Bekijk Resultaten
            </button>
            <button
              onClick={clearVotes}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Stem Opnieuw (Test)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Kies jouw top 3 prioriteiten
        </h1>
        <p className="text-gray-600 mb-2">
          Selecteer exact 3 onderwerpen die jij het belangrijkst vindt voor Nederland
        </p>
        <div className="text-sm text-gray-500">
          Geselecteerd: {selectedPriorities.length}/3
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {defaultPriorities.map((priority) => {
          const isSelected = selectedPriorities.includes(priority.id);
          const isDisabled = !isSelected && selectedPriorities.length >= 3;

          return (
            <div
              key={priority.id}
              onClick={() => handlePriorityToggle(priority.id)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-[#FF6B00] bg-orange-50 shadow-md' 
                  : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 bg-white hover:border-[#0052CC] hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected 
                        ? 'border-[#FF6B00] bg-[#FF6B00] text-white' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900">{priority.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{priority.description}</p>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {priority.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <ClickTracker
          name="vote_submit_button"
          category="voting"
          data={{ selections_count: selectedPriorities.length }}
        >
          <button
            onClick={handleSubmit}
            disabled={selectedPriorities.length !== 3 || isSubmitting}
            className={`
              px-8 py-4 rounded-lg font-semibold text-lg transition-colors
              ${selectedPriorities.length === 3 && !isSubmitting
                ? 'bg-[#FF6B00] text-white hover:bg-[#E55A00]' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? 'Bezig met stemmen...' : `Stem Nu (${selectedPriorities.length}/3)`}
          </button>
        </ClickTracker>
        
        {selectedPriorities.length > 0 && selectedPriorities.length < 3 && (
          <p className="text-sm text-gray-500 mt-2">
            Selecteer nog {3 - selectedPriorities.length} prioriteit{3 - selectedPriorities.length > 1 ? 'en' : ''}
          </p>
        )}
      </div>

      {/* Email Capture Modal */}
      <EmailCapture
        isOpen={showEmailCapture}
        onClose={() => {
          setShowEmailCapture(false);
          // Navigate to results after email capture closes
          setTimeout(() => {
            router.push('/resultaten');
          }, 500);
        }}
        trigger="vote_complete"
      />
      
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={shouldShowOnboarding}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />
    </div>
  );
}