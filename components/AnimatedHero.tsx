'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AnimatedHeroProps {
  totalVotes: number;
  onCtaClick?: () => void;
}

export default function AnimatedHero({ totalVotes, onCtaClick }: AnimatedHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate vote counter
    if (totalVotes > 0) {
      const duration = 2000;
      const increment = totalVotes / (duration / 50);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalVotes) {
          setVoteCount(totalVotes);
          clearInterval(timer);
        } else {
          setVoteCount(Math.floor(current));
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [totalVotes]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#004699] via-[#0052CC] to-[#FF6B00] text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full animate-float-slow"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center">
          {/* Main heading with staggered animation */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block animate-slide-up">Nederland</span>
              <span className="block animate-slide-up-delayed text-[#FF6B00]">Stemt</span>
            </h1>
          </div>
          
          {/* Subtitle with fade-in */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
              De stem van Nederland. Elke week.
            </p>
            <p className="text-lg opacity-90 mb-10">
              Geen partijpolitiek. Geen agenda. Gewoon jouw stem.
            </p>
          </div>
          
          {/* CTA Button with hover animations */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link 
              href="/stem"
              onClick={onCtaClick}
              className="group inline-flex items-center gap-3 bg-[#FF6B00] hover:bg-[#E55A00] text-white px-8 py-4 md:px-12 md:py-5 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Stem Nu
              </span>
              <svg 
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Stats with count-up animation */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-[#FF6B00]">
                  {voteCount.toLocaleString('nl-NL')}
                </div>
                <div className="text-sm md:text-base opacity-90">Stemmen deze week</div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-[#FF6B00]">20</div>
                <div className="text-sm md:text-base opacity-90">Prioriteiten</div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-[#FF6B00]">100%</div>
                <div className="text-sm md:text-base opacity-90">Transparant</div>
              </div>
            </div>
          </div>
          
          {/* Pulse indicator for live voting */}
          {totalVotes > 0 && (
            <div className={`transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
                <span className="text-sm opacity-75">Live stemmen actief</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}