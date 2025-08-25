'use client';

import { useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance';

export default function PerformanceTracker() {
  useEffect(() => {
    // Initialize performance monitoring
    const startTime = performance.now();
    
    // Track page load completion
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Page loaded in ${Math.round(loadTime)}ms`);
      
      // Report performance summary in development
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          performanceMonitor.reportSummary();
        }, 2000);
      }
    };

    // Track visibility changes for performance impact
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page became visible - resuming performance monitoring');
      } else {
        console.log('Page became hidden - pausing performance monitoring');
      }
    };

    // Add event listeners
    window.addEventListener('load', handleLoad);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Monitor memory usage in development
    if (process.env.NODE_ENV === 'development') {
      const memoryInterval = setInterval(() => {
        const memory = (performance as any).memory;
        if (memory) {
          const used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
          const limit = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
          
          if (used > limit * 0.8) {
            console.warn(`High memory usage: ${used}MB / ${limit}MB`);
          }
        }
      }, 30000); // Check every 30 seconds

      return () => {
        clearInterval(memoryInterval);
        window.removeEventListener('load', handleLoad);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Track unhandled errors that might impact performance
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Performance-impacting error:', event.error);
      
      // Track error in analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
          custom_parameter_1: 'performance_error'
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Performance-impacting promise rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This is a tracking component with no visual output
}