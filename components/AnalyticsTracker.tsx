'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (command: string, targetId: string | Date, config?: any) => void;
  }
}

interface AnalyticsTrackerProps {
  trackingId?: string;
}

export default function AnalyticsTracker({ trackingId = 'G-XXXXXXXXXX' }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function() {
      // @ts-ignore
      (window.dataLayer = window.dataLayer || []).push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_dimension_1': 'user_type'
      }
    });

    // Track initial page view
    trackPageView(pathname, searchParams.toString());
  }, [trackingId]);

  useEffect(() => {
    // Track page changes
    if (pathname && typeof window.gtag !== 'undefined') {
      trackPageView(pathname, searchParams.toString());
    }
  }, [pathname, searchParams]);

  const trackPageView = (path: string, search: string) => {
    const url = search ? `${path}?${search}` : path;
    
    window.gtag('config', trackingId, {
      page_path: url,
      page_title: getPageTitle(path),
      custom_map: {
        'page_type': getPageType(path)
      }
    });
  };

  return null; // This component doesn't render anything
}

function getPageTitle(pathname: string): string {
  const titles: { [key: string]: string } = {
    '/': 'Home - Nederland Stemt',
    '/stem': 'Stemmen - Nederland Stemt', 
    '/resultaten': 'Resultaten - Nederland Stemt',
    '/nieuw': 'Nieuw Voorstel - Nederland Stemt',
    '/admin': 'Admin - Nederland Stemt',
    '/privacy': 'Privacy - Nederland Stemt',
    '/terms': 'Voorwaarden - Nederland Stemt',
    '/cookies': 'Cookies - Nederland Stemt'
  };
  
  return titles[pathname] || `${pathname} - Nederland Stemt`;
}

function getPageType(pathname: string): string {
  if (pathname === '/') return 'homepage';
  if (pathname === '/stem') return 'voting';
  if (pathname === '/resultaten') return 'results';
  if (pathname === '/nieuw') return 'proposal';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.includes('privacy') || pathname.includes('terms') || pathname.includes('cookies')) return 'legal';
  return 'content';
}

// Utility functions for tracking events
export const analytics = {
  // Track user interactions
  trackEvent: (eventName: string, parameters: any = {}) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label,
        value: parameters.value,
        custom_parameter_1: parameters.custom1,
        custom_parameter_2: parameters.custom2,
        ...parameters
      });
    }
  },

  // Track voting events
  trackVote: (selectedPriorities: string[], totalTime?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'vote_submitted', {
        event_category: 'voting',
        event_label: 'priority_selection',
        value: selectedPriorities.length,
        custom_priorities: selectedPriorities.join(','),
        completion_time: totalTime
      });

      // Track each individual priority selection
      selectedPriorities.forEach((priority, index) => {
        window.gtag('event', 'priority_selected', {
          event_category: 'voting',
          event_label: priority,
          value: index + 1, // position
          priority_id: priority
        });
      });
    }
  },

  // Track proposal submissions
  trackProposal: (title: string, category: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'proposal_submitted', {
        event_category: 'engagement', 
        event_label: 'new_proposal',
        value: 1,
        proposal_category: category,
        proposal_length: title.length
      });
    }
  },

  // Track email signups
  trackEmailSignup: (source: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'email_signup', {
        event_category: 'conversion',
        event_label: source,
        value: 1
      });
    }
  },

  // Track social sharing
  trackShare: (platform: string, content_type: string, content_id?: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'share', {
        event_category: 'engagement',
        event_label: platform,
        method: platform,
        content_type: content_type,
        item_id: content_id
      });
    }
  },

  // Track user engagement
  trackEngagement: (action: string, element: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'engagement', {
        event_category: 'user_interaction',
        event_label: `${action}_${element}`,
        value: value
      });
    }
  },

  // Track errors
  trackError: (error: string, fatal: boolean = false) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'exception', {
        description: error,
        fatal: fatal
      });
    }
  },

  // Track timing/performance
  trackTiming: (name: string, value: number, category: string = 'performance') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(value),
        event_category: category
      });
    }
  }
};