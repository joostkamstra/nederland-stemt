'use client';

import { useState, useEffect } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  format?: 'number' | 'percentage' | 'currency' | 'text';
  color?: 'blue' | 'orange' | 'green' | 'red' | 'purple';
  subtitle?: string;
  loading?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  format = 'number',
  color = 'blue',
  subtitle,
  loading = false,
  animated = true,
  onClick
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (loading) return;
    
    if (animated && typeof value === 'number') {
      setIsAnimating(true);
      const start = typeof displayValue === 'number' ? displayValue : 0;
      const end = value;
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        setDisplayValue(Math.floor(current));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }
  }, [value, loading, animated, displayValue]);

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-[#0052CC]',
      icon: 'text-[#0052CC]',
      border: 'border-blue-200'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-[#FF6B00]',
      icon: 'text-[#FF6B00]',
      border: 'border-orange-200'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: 'text-red-600',
      border: 'border-red-200'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      icon: 'text-purple-600',
      border: 'border-purple-200'
    }
  };

  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return new Intl.NumberFormat('nl-NL', {
          style: 'currency',
          currency: 'EUR'
        }).format(val);
      case 'number':
        return new Intl.NumberFormat('nl-NL').format(val);
      default:
        return val.toString();
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-white rounded-lg p-6 border transition-all duration-200
        ${colorClasses[color].border}
        ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-105' : ''}
        ${isAnimating ? 'transform scale-105' : ''}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={onClick ? `${title}: ${formatValue(displayValue)}` : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${colorClasses[color].text}`}>
              {formatValue(displayValue)}
            </p>
            {trend && (
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">
                  {trend.period}
                </span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color].bg}`}>
            <div className={`w-6 h-6 ${colorClasses[color].icon}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}