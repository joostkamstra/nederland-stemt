'use client';

import { useState, useEffect } from 'react';
import { Priority } from '@/lib/priorities';

interface SuccessModalProps {
  isOpen: boolean;
  selectedPriorities: string[];
  priorities: Priority[];
  onContinue: () => void;
  onVoteAgain?: () => void;
}

export default function SuccessModal({ 
  isOpen, 
  selectedPriorities, 
  priorities, 
  onContinue, 
  onVoteAgain 
}: SuccessModalProps) {
  const [animationStage, setAnimationStage] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number, x: number, delay: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Reset animation
      setAnimationStage(0);
      
      // Generate confetti pieces
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2000
      }));
      setConfettiPieces(pieces);
      
      // Animation sequence
      const timers = [
        setTimeout(() => setAnimationStage(1), 100), // Modal entrance
        setTimeout(() => setAnimationStage(2), 400), // Checkmark
        setTimeout(() => setAnimationStage(3), 800), // Content
        setTimeout(() => setAnimationStage(4), 1200), // Priorities list
        setTimeout(() => setAnimationStage(5), 1600), // Buttons
      ];
      
      return () => timers.forEach(clearTimeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedPriorityDetails = selectedPriorities.map(id => 
    priorities.find(p => p.id === id)
  ).filter(Boolean) as Priority[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black transition-opacity duration-500
          ${animationStage >= 1 ? 'opacity-50' : 'opacity-0'}
        `} 
        onClick={onContinue}
      />
      
      {/* Confetti */}
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 pointer-events-none animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: '-10px',
            backgroundColor: piece.id % 3 === 0 ? '#FF6B00' : piece.id % 3 === 1 ? '#0052CC' : '#10B981',
            animationDelay: `${piece.delay}ms`,
            animationDuration: '3s'
          }}
        />
      ))}
      
      {/* Modal */}
      <div 
        className={`
          relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden
          transform transition-all duration-500 ease-out
          ${animationStage >= 1 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
          }
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 opacity-60" />
        
        {/* Success header */}
        <div className="relative z-10 text-center pt-8 pb-6 px-6">
          {/* Animated checkmark */}
          <div className={`
            relative inline-flex items-center justify-center w-20 h-20 mb-6
            transform transition-all duration-700 ease-out
            ${animationStage >= 2 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-0 rotate-45'
            }
          `}>
            {/* Outer ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-1 bg-white rounded-full" />
            
            {/* Checkmark */}
            <svg 
              className={`
                w-10 h-10 text-green-500 transform transition-all duration-500 delay-200
                ${animationStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
              `} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
                className="animate-draw-check"
              />
            </svg>
            
            {/* Success particles */}
            <div className="absolute inset-0 rounded-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 30}px`,
                    left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 30}px`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Success message */}
          <div className={`
            transform transition-all duration-500 delay-300
            ${animationStage >= 3 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gefeliciteerd! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Je stem is succesvol uitgebracht. Bedankt dat je meedoet aan de democratie!
            </p>
          </div>
        </div>
        
        {/* Selected priorities */}
        <div className="relative z-10 px-6 pb-6">
          <div className={`
            transform transition-all duration-500 delay-500
            ${animationStage >= 4 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}>
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Jouw gekozen prioriteiten:
            </h3>
            
            <div className="space-y-3">
              {selectedPriorityDetails.map((priority, index) => (
                <div 
                  key={priority.id}
                  className={`
                    flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-xl
                    transform transition-all duration-300
                    ${animationStage >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                  `}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0052CC] to-[#FF6B00] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {priority.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {priority.category}
                    </div>
                  </div>
                  <div className="text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className={`
          relative z-10 p-6 bg-gray-50 bg-opacity-80
          transform transition-all duration-500 delay-700
          ${animationStage >= 5 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
          }
        `}>
          <div className="flex gap-3">
            <button
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-[#0052CC] to-[#004699] text-white py-3 px-6 rounded-xl font-semibold text-sm hover:from-[#0066FF] hover:to-[#0052CC] transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Bekijk Resultaten 📊
            </button>
            
            {onVoteAgain && (
              <button
                onClick={onVoteAgain}
                className="px-4 py-3 bg-white bg-opacity-80 text-gray-700 rounded-xl font-semibold text-sm hover:bg-opacity-100 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                title="Voor testing doeleinden"
              >
                🔄
              </button>
            )}
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            De resultaten worden vrijdag naar de Tweede Kamer gestuurd
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#0052CC] rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0052CC] to-[#FF6B00] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}