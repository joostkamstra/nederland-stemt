'use client';

import { useState } from 'react';
import { Priority } from '@/lib/priorities';

interface VoteCardProps {
  priority: Priority;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (priorityId: string) => void;
  index: number;
}

export default function VoteCard({ priority, isSelected, isDisabled, onToggle, index }: VoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Huisvesting': 'bg-blue-100 text-blue-800',
      'Gezondheid': 'bg-red-100 text-red-800',
      'Milieu': 'bg-green-100 text-green-800',
      'Onderwijs': 'bg-purple-100 text-purple-800',
      'Samenleving': 'bg-yellow-100 text-yellow-800',
      'Economie': 'bg-indigo-100 text-indigo-800',
      'Veiligheid': 'bg-gray-100 text-gray-800',
      'Overheid': 'bg-teal-100 text-teal-800',
      'Internationaal': 'bg-pink-100 text-pink-800',
      'Werk': 'bg-cyan-100 text-cyan-800',
      'Mobiliteit': 'bg-orange-100 text-orange-800',
      'Natuur': 'bg-lime-100 text-lime-800',
      'Cultuur': 'bg-violet-100 text-violet-800',
      'Digitaal': 'bg-slate-100 text-slate-800',
      'Zorg': 'bg-rose-100 text-rose-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  const handleClick = () => {
    if (!isDisabled) {
      onToggle(priority.id);
    }
  };

  return (
    <div
      className={`
        group relative transition-all duration-300 ease-out transform
        ${isSelected ? 'scale-105 z-10' : isHovered && !isDisabled ? 'scale-102 z-5' : ''}
        ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Card background with gradient and shadow effects */}
      <div className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-300
        ${isSelected 
          ? 'border-[#FF6B00] bg-gradient-to-br from-orange-50 to-orange-100 shadow-xl shadow-orange-200/50' 
          : isDisabled
            ? 'border-gray-200 bg-gray-50 opacity-60'
            : isHovered
              ? 'border-[#0052CC] bg-gradient-to-br from-blue-50 to-white shadow-lg shadow-blue-200/30'
              : 'border-gray-200 bg-white shadow-sm hover:shadow-md'
        }
      `}>
        
        {/* Selection indicator */}
        <div className={`
          absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#E55A00] 
          transform transition-transform duration-500 origin-left
          ${isSelected ? 'scale-x-100' : 'scale-x-0'}
        `} />
        
        {/* Hover glow effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-[#0052CC]/5 to-[#FF6B00]/5 
          opacity-0 transition-opacity duration-300
          ${isHovered && !isDisabled && !isSelected ? 'opacity-100' : ''}
        `} />
        
        <div className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Checkbox with smooth animations */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`
                  relative w-7 h-7 rounded-full border-2 flex items-center justify-center 
                  transition-all duration-300 transform
                  ${isSelected 
                    ? 'border-[#FF6B00] bg-[#FF6B00] text-white scale-110' 
                    : isHovered && !isDisabled
                      ? 'border-[#0052CC] scale-105'
                      : 'border-gray-300'
                  }
                  ${!isDisabled ? 'group-hover:scale-105' : ''}
                `}>
                  {/* Checkmark with entrance animation */}
                  <svg 
                    className={`w-4 h-4 transition-all duration-300 transform ${
                      isSelected ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  
                  {/* Ripple effect on selection */}
                  <div className={`
                    absolute inset-0 rounded-full bg-[#FF6B00] opacity-30 
                    transform transition-transform duration-500
                    ${isSelected ? 'scale-150' : 'scale-0'}
                  `} />
                </div>
                
                <h3 className={`
                  font-bold text-lg transition-colors duration-300
                  ${isSelected ? 'text-[#FF6B00]' : 'text-gray-900'}
                  ${isHovered && !isDisabled && !isSelected ? 'text-[#0052CC]' : ''}
                `}>
                  {priority.title}
                </h3>
              </div>
              
              {/* Description with dynamic color */}
              <p className={`
                text-sm mb-4 leading-relaxed transition-colors duration-300
                ${isSelected ? 'text-orange-700' : 'text-gray-600'}
                ${isHovered && !isDisabled && !isSelected ? 'text-blue-700' : ''}
              `}>
                {priority.description}
              </p>
              
              {/* Category badge */}
              <span className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                transition-all duration-300
                ${getCategoryColor(priority.category)}
                ${isSelected ? 'ring-2 ring-[#FF6B00] ring-opacity-50' : ''}
              `}>
                {priority.category}
              </span>
            </div>
          </div>
          
          {/* Selection number indicator */}
          {isSelected && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-sm font-bold animate-bounce-in">
              ✓
            </div>
          )}
          
          {/* Disabled overlay */}
          {isDisabled && !isSelected && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                Maximum bereikt
              </div>
            </div>
          )}
        </div>
        
        {/* Interactive border highlight */}
        <div className={`
          absolute inset-0 rounded-xl border-2 border-transparent 
          transition-all duration-300 pointer-events-none
          ${isHovered && !isDisabled && !isSelected 
            ? 'border-[#0052CC] shadow-[0_0_20px_rgba(0,82,204,0.2)]' 
            : ''
          }
          ${isSelected 
            ? 'border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.3)]' 
            : ''
          }
        `} />
      </div>
    </div>
  );
}