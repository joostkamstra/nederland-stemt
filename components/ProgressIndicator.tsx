'use client';

import { useState, useEffect } from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label: string;
  showPercent?: boolean;
  color?: 'blue' | 'orange' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressIndicator({
  current,
  total,
  label,
  showPercent = true,
  color = 'blue',
  size = 'md',
  animated = true
}: ProgressIndicatorProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(current);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(current);
    }
  }, [current, animated]);

  const colorClasses = {
    blue: 'bg-[#0052CC]',
    orange: 'bg-[#FF6B00]',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  const bgColorClasses = {
    blue: 'bg-blue-100',
    orange: 'bg-orange-100', 
    green: 'bg-green-100',
    red: 'bg-red-100'
  };

  const sizeClasses = {
    sm: { bar: 'h-2', text: 'text-sm' },
    md: { bar: 'h-3', text: 'text-base' },
    lg: { bar: 'h-4', text: 'text-lg' }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium text-gray-900 ${sizeClasses[size].text}`}>
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-gray-600 ${sizeClasses[size].text}`}>
            {displayValue}
            {total > 0 && ` / ${total}`}
          </span>
          {showPercent && (
            <span className={`font-semibold ${colorClasses[color].replace('bg-', 'text-')} ${sizeClasses[size].text}`}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
      
      <div className={`w-full ${bgColorClasses[color]} rounded-full ${sizeClasses[size].bar} overflow-hidden`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size].bar} rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: `${percentage}%`,
            transform: animated ? 'translateX(0)' : undefined
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${percentage.toFixed(1)}% voltooid`}
        />
      </div>
    </div>
  );
}