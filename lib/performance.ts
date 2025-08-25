// Performance monitoring utilities for Nederland Stemt
import React, { useEffect } from 'react';

interface PerformanceMetrics {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

interface NavigationTiming {
  dns: number;
  connection: number;
  request: number;
  response: number;
  processing: number;
  load: number;
  total: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Web Vitals observer
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      // Observe different performance entry types
      const entryTypes = ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift'];
      
      entryTypes.forEach(type => {
        try {
          observer.observe({ type, buffered: true });
        } catch (error) {
          console.warn(`Performance observer for ${type} not supported:`, error);
        }
      });

      this.observers.push(observer);
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Monitor resource loading times
    this.monitorResourceTiming();
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'paint':
        this.handlePaintEntry(entry as PerformancePaintTiming);
        break;
      case 'largest-contentful-paint':
        this.handleLCPEntry(entry as PerformanceEntry);
        break;
      case 'layout-shift':
        this.handleCLSEntry(entry as PerformanceEntry);
        break;
      case 'navigation':
        this.handleNavigationEntry(entry as PerformanceNavigationTiming);
        break;
    }
  }

  private handlePaintEntry(entry: PerformancePaintTiming) {
    const metric: PerformanceMetrics = {
      name: entry.name === 'first-paint' ? 'FP' : 'FCP',
      value: entry.startTime,
      rating: this.getRating(entry.startTime, { good: 1800, poor: 3000 }),
      threshold: { good: 1800, poor: 3000 }
    };
    
    this.addMetric(metric);
  }

  private handleLCPEntry(entry: PerformanceEntry) {
    const metric: PerformanceMetrics = {
      name: 'LCP',
      value: entry.startTime,
      rating: this.getRating(entry.startTime, { good: 2500, poor: 4000 }),
      threshold: { good: 2500, poor: 4000 }
    };
    
    this.addMetric(metric);
  }

  private handleCLSEntry(entry: any) {
    if (!entry.hadRecentInput) {
      const metric: PerformanceMetrics = {
        name: 'CLS',
        value: entry.value,
        rating: this.getRating(entry.value, { good: 0.1, poor: 0.25 }),
        threshold: { good: 0.1, poor: 0.25 }
      };
      
      this.addMetric(metric);
    }
  }

  private handleNavigationEntry(entry: PerformanceNavigationTiming) {
    const timing = this.calculateNavigationTiming(entry);
    
    // Track total page load time
    const metric: PerformanceMetrics = {
      name: 'Page Load',
      value: timing.total,
      rating: this.getRating(timing.total, { good: 2000, poor: 4000 }),
      threshold: { good: 2000, poor: 4000 }
    };
    
    this.addMetric(metric);

    // Track time to interactive
    const tti = entry.domInteractive - entry.startTime;
    const ttiMetric: PerformanceMetrics = {
      name: 'TTI',
      value: tti,
      rating: this.getRating(tti, { good: 3800, poor: 7300 }),
      threshold: { good: 3800, poor: 7300 }
    };
    
    this.addMetric(ttiMetric);
  }

  private calculateNavigationTiming(entry: PerformanceNavigationTiming): NavigationTiming {
    return {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      connection: entry.connectEnd - entry.connectStart,
      request: entry.responseStart - entry.requestStart,
      response: entry.responseEnd - entry.responseStart,
      processing: entry.domComplete - entry.domContentLoadedEventStart,
      load: entry.loadEventEnd - entry.loadEventStart,
      total: entry.loadEventEnd - entry.startTime
    };
  }

  private monitorResourceTiming() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      setInterval(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const slowResources = resources.filter(resource => resource.duration > 1000);
        
        if (slowResources.length > 0) {
          console.warn('Slow loading resources detected:', slowResources.map(r => ({
            name: r.name,
            duration: Math.round(r.duration),
            size: r.transferSize
          })));
        }
      }, 10000); // Check every 10 seconds
    }
  }

  private getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  }

  private addMetric(metric: PerformanceMetrics) {
    // Replace existing metric with same name or add new one
    const existingIndex = this.metrics.findIndex(m => m.name === metric.name);
    if (existingIndex >= 0) {
      this.metrics[existingIndex] = metric;
    } else {
      this.metrics.push(metric);
    }

    // Report to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: Math.round(metric.value),
        metric_rating: metric.rating,
        custom_parameter_1: 'nederland_stemt_performance'
      });
    }

    // Log poor performance in development
    if (process.env.NODE_ENV === 'development' && metric.rating === 'poor') {
      console.warn(`Poor performance detected for ${metric.name}: ${Math.round(metric.value)}ms (threshold: ${metric.threshold.poor}ms)`);
    }
  }

  // Public API
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getMetric(name: string): PerformanceMetrics | undefined {
    return this.metrics.find(m => m.name === name);
  }

  measureFunction<T>(name: string, fn: () => T): T {
    const startTime = performance.now();
    const result = fn();
    const duration = performance.now() - startTime;

    const metric: PerformanceMetrics = {
      name: `Function: ${name}`,
      value: duration,
      rating: this.getRating(duration, { good: 16, poor: 50 }), // 60fps = 16.67ms budget
      threshold: { good: 16, poor: 50 }
    };

    this.addMetric(metric);
    return result;
  }

  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    const result = await fn();
    const duration = performance.now() - startTime;

    const metric: PerformanceMetrics = {
      name: `Async: ${name}`,
      value: duration,
      rating: this.getRating(duration, { good: 100, poor: 500 }),
      threshold: { good: 100, poor: 500 }
    };

    this.addMetric(metric);
    return result;
  }

  reportSummary() {
    if (this.metrics.length === 0) {
      console.log('No performance metrics available');
      return;
    }

    console.group('Performance Summary');
    
    const goodMetrics = this.metrics.filter(m => m.rating === 'good');
    const needsImprovementMetrics = this.metrics.filter(m => m.rating === 'needs-improvement');
    const poorMetrics = this.metrics.filter(m => m.rating === 'poor');

    console.log(`✅ Good: ${goodMetrics.length} metrics`);
    console.log(`⚠️ Needs Improvement: ${needsImprovementMetrics.length} metrics`);
    console.log(`❌ Poor: ${poorMetrics.length} metrics`);

    if (poorMetrics.length > 0) {
      console.group('Poor Performance Issues:');
      poorMetrics.forEach(metric => {
        console.warn(`${metric.name}: ${Math.round(metric.value)}ms (threshold: ${metric.threshold.poor}ms)`);
      });
      console.groupEnd();
    }

    console.groupEnd();
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

// Performance utilities
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  return {
    metrics: performanceMonitor.getMetrics(),
    measureFunction: performanceMonitor.measureFunction.bind(performanceMonitor),
    measureAsync: performanceMonitor.measureAsync.bind(performanceMonitor),
    reportSummary: performanceMonitor.reportSummary.bind(performanceMonitor)
  };
}

// HOC for component performance monitoring
export function withPerformanceMonitoring<T extends {}>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: T) {
    const renderStart = performance.now();
    
    useEffect(() => {
      const renderTime = performance.now() - renderStart;
      
      const metric: PerformanceMetrics = {
        name: `Component: ${componentName}`,
        value: renderTime,
        rating: performanceMonitor['getRating'](renderTime, { good: 16, poor: 50 }),
        threshold: { good: 16, poor: 50 }
      };
      
      performanceMonitor['addMetric'](metric);
    });

    return React.createElement(Component, props);
  };
}

// Utility for measuring localStorage operations
export function measureStorageOperation<T>(operation: string, fn: () => T): T {
  return performanceMonitor.measureFunction(`localStorage:${operation}`, fn);
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
    };
  }
  return null;
}

// Export types
export type { PerformanceMetrics, NavigationTiming };