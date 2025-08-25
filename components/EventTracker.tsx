'use client';

import { useEffect, useRef } from 'react';
import { analytics } from './AnalyticsTracker';

interface EventTrackerProps {
  children: React.ReactNode;
  eventType: 'click' | 'hover' | 'focus' | 'scroll' | 'view';
  eventName: string;
  eventData?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  };
  threshold?: number; // For scroll and view events
  once?: boolean; // Track only once
}

export default function EventTracker({
  children,
  eventType,
  eventName,
  eventData = {},
  threshold = 50, // percentage for scroll, milliseconds for view
  once = false
}: EventTrackerProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const trackEvent = () => {
    if (once && trackedRef.current) return;
    
    analytics.trackEvent(eventName, {
      category: eventData.category || 'interaction',
      label: eventData.label || eventType,
      value: eventData.value,
      timestamp: Date.now(),
      page: window.location.pathname,
      ...eventData
    });
    
    if (once) trackedRef.current = true;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    switch (eventType) {
      case 'click':
        element.addEventListener('click', trackEvent);
        break;
        
      case 'hover':
        element.addEventListener('mouseenter', trackEvent);
        break;
        
      case 'focus':
        element.addEventListener('focus', trackEvent);
        break;
        
      case 'view':
        // Track when element comes into view
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  if (entry.isIntersecting) {
                    trackEvent();
                  }
                }, threshold);
              }
            });
          },
          { threshold: 0.1 }
        );
        
        observerRef.current.observe(element);
        break;
        
      case 'scroll':
        // Track scroll depth within element
        const handleScroll = () => {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          scrollTimeoutRef.current = setTimeout(() => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;
            
            if (rect.top <= windowHeight && rect.bottom >= 0) {
              const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
              const scrollPercentage = (visibleHeight / elementHeight) * 100;
              
              if (scrollPercentage >= threshold) {
                trackEvent();
              }
            }
          }, 100);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
    }

    return () => {
      if (element) {
        element.removeEventListener('click', trackEvent);
        element.removeEventListener('mouseenter', trackEvent);
        element.removeEventListener('focus', trackEvent);
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [eventType, eventName, threshold, once]);

  return (
    <div ref={elementRef} className="contents">
      {children}
    </div>
  );
}

// Higher-order component for easy tracking
export function withEventTracking<T extends {}>(
  Component: React.ComponentType<T>,
  eventName: string,
  eventType: EventTrackerProps['eventType'] = 'click',
  eventData?: EventTrackerProps['eventData']
) {
  return function TrackedComponent(props: T) {
    return (
      <EventTracker
        eventType={eventType}
        eventName={eventName}
        eventData={eventData}
      >
        <Component {...props} />
      </EventTracker>
    );
  };
}

// Specialized tracking components
export function ClickTracker({ 
  children, 
  name, 
  category = 'interaction',
  data = {} 
}: { 
  children: React.ReactNode; 
  name: string; 
  category?: string;
  data?: any;
}) {
  return (
    <EventTracker
      eventType="click"
      eventName={name}
      eventData={{ category, ...data }}
    >
      {children}
    </EventTracker>
  );
}

export function ViewTracker({ 
  children, 
  name, 
  threshold = 1000,
  once = true 
}: { 
  children: React.ReactNode; 
  name: string; 
  threshold?: number;
  once?: boolean;
}) {
  return (
    <EventTracker
      eventType="view"
      eventName={name}
      eventData={{ category: 'engagement' }}
      threshold={threshold}
      once={once}
    >
      {children}
    </EventTracker>
  );
}

export function ScrollTracker({ 
  children, 
  name, 
  threshold = 75,
  once = true 
}: { 
  children: React.ReactNode; 
  name: string; 
  threshold?: number;
  once?: boolean;
}) {
  return (
    <EventTracker
      eventType="scroll"
      eventName={name}
      eventData={{ category: 'engagement' }}
      threshold={threshold}
      once={once}
    >
      {children}
    </EventTracker>
  );
}