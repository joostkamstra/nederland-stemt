'use client';

import { useState, useEffect } from 'react';
import { Priority } from '@/lib/priorities';

interface ResultsChartProps {
  results: Priority[];
  totalVotes: number;
  showTop?: number;
  showPodium?: boolean;
}

export default function ResultsChart({ results, totalVotes, showTop = 10, showPodium = true }: ResultsChartProps) {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return (votes / totalVotes) * 100;
  };
  
  const getBarColor = (index: number, isHovered = false) => {
    if (index === 0) return isHovered ? 'from-[#FF8533] to-[#CC5500]' : 'from-[#FF6B00] to-[#E55A00]';
    if (index === 1) return isHovered ? 'from-[#0066FF] to-[#003D99]' : 'from-[#0052CC] to-[#004699]';
    if (index === 2) return isHovered ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-purple-700';
    return isHovered ? 'from-gray-500 to-gray-700' : 'from-gray-400 to-gray-600';
  };
  
  useEffect(() => {
    setIsVisible(true);
    
    // Animate bars with staggered delays
    const timer = setTimeout(() => {
      const percentages = results.slice(0, showTop).map((_, index) => {
        return getPercentage(results[index]?.votes || 0);
      });
      
      // Animate each bar individually
      percentages.forEach((targetPercentage, index) => {
        setTimeout(() => {
          setAnimatedPercentages(prev => {
            const newPercentages = [...prev];
            newPercentages[index] = targetPercentage;
            return newPercentages;
          });
        }, index * 150);
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [results, totalVotes, showTop]);

  const topResults = results.slice(0, showTop);
  const medals = ['🥇', '🥈', '🥉'];

  if (totalVotes === 0) {
    return (
      <div className="text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12">
        <div className="text-6xl mb-6 animate-bounce">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Nog geen resultaten
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Zodra de eerste stemmen binnen zijn, zie je hier de live resultaten met prachtige visualisaties
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0052CC] to-[#FF6B00] h-full rounded-full animate-pulse w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Podium for top 3 */}
      {showPodium && topResults.length >= 3 && (
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#0052CC] to-[#FF6B00] bg-clip-text text-transparent">
            🏆 Top 3 Podium
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topResults.slice(0, 3).map((priority, index) => {
              const percentage = getPercentage(priority.votes);
              const animatedPercentage = animatedPercentages[index] || 0;
              
              return (
                <div 
                  key={priority.id} 
                  className={`
                    group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                    transition-all duration-500 transform hover:scale-105
                    ${index === 0 ? 'order-2 md:scale-110 z-10' : index === 1 ? 'order-1' : 'order-3'}
                  `}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Glow effect for winner */}
                  {index === 0 && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00] to-[#E55A00] rounded-2xl opacity-20 animate-pulse"></div>
                  )}
                  
                  <div className="relative p-6 text-center">
                    {/* Medal and ranking */}
                    <div className="text-5xl mb-4 animate-bounce-in" style={{ animationDelay: `${index * 300}ms` }}>
                      {medals[index]}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-[#0052CC] transition-colors">
                      {priority.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {priority.description}
                    </p>
                    
                    {/* Animated circular progress */}
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={`url(#gradient-${index})`}
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - animatedPercentage / 100)}`}
                          className="transition-all duration-2000 ease-out"
                        />
                      </svg>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900">
                          {Math.round(animatedPercentage)}%
                        </span>
                      </div>
                      
                      {/* Gradient definitions */}
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={index === 0 ? '#FF6B00' : index === 1 ? '#0052CC' : '#8B5CF6'} />
                          <stop offset="100%" stopColor={index === 0 ? '#E55A00' : index === 1 ? '#004699' : '#7C3AED'} />
                        </linearGradient>
                      </defs>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900">
                        {priority.votes.toLocaleString('nl-NL')}
                      </div>
                      <div className="text-sm text-gray-500">stemmen</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Detailed results list */}
      <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
          Gedetailleerde Resultaten
        </h2>
        
        <div className="space-y-4">
          {topResults.map((priority, index) => {
            const percentage = getPercentage(priority.votes);
            const animatedPercentage = animatedPercentages[index] || 0;
            
            return (
              <div 
                key={priority.id} 
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Ranking badge */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                      bg-gradient-to-r ${getBarColor(index)} 
                      group-hover:bg-gradient-to-r group-hover:${getBarColor(index, true)}
                      transform transition-all duration-300 group-hover:scale-110
                    `}>
                      {index + 1}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052CC] transition-colors">
                        {priority.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {priority.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {priority.votes.toLocaleString('nl-NL')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {/* Animated progress bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`
                        h-full rounded-full bg-gradient-to-r ${getBarColor(index)}
                        transform transition-all duration-2000 ease-out relative overflow-hidden
                      `}
                      style={{ width: `${Math.min(animatedPercentage, 100)}%` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></div>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {priority.category}
                    </span>
                    
                    {animatedPercentage === percentage && animatedPercentage > 0 && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Live
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}