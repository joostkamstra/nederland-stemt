import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CookieConsent from '@/components/CookieConsent';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import PerformanceTracker from '@/components/PerformanceTracker';
import HelpButton from '@/components/HelpButton';
import "./globals.css";

export const metadata: Metadata = {
  title: "Nederland Stemt - De stem van Nederland",
  description: "Stem wekelijks op de prioriteiten van Nederland. Geen partijpolitiek, gewoon jouw stem. Elke week gaan de resultaten naar de Tweede Kamer.",
  keywords: ["nederland", "stemmen", "democratie", "prioriteiten", "politiek", "tweede kamer", "burger participatie"],
  authors: [{ name: "Nederland Stemt" }],
  creator: "Nederland Stemt",
  publisher: "Nederland Stemt",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://nederlandstemt.nl",
    title: "Nederland Stemt - De stem van Nederland",
    description: "Stem wekelijks op de prioriteiten van Nederland. Geen partijpolitiek, gewoon jouw stem. Elke week gaan de resultaten naar de Tweede Kamer.",
    siteName: "Nederland Stemt",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nederland Stemt - Democratische participatie voor iedereen"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@nederlandstemt",
    creator: "@nederlandstemt",
    title: "Nederland Stemt - De stem van Nederland",
    description: "Stem wekelijks op de prioriteiten van Nederland. Geen partijpolitiek, gewoon jouw stem.",
    images: ["/og-image.png"]
  },

  // Additional Meta
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Mobile viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Language and region
  alternates: {
    canonical: "https://nederlandstemt.nl",
    languages: {
      "nl-NL": "https://nederlandstemt.nl",
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Skip to main content link for keyboard navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#0052CC] text-white px-4 py-2 rounded-lg z-50 font-semibold"
        >
          Ga naar hoofdinhoud
        </a>
        
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-blue-100 dark:border-gray-700" role="navigation" aria-label="Hoofdnavigatie">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center min-w-0">
                <Link 
                  href="/" 
                  className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg px-2 sm:px-3 py-2 transition-colors duration-200 truncate"
                  aria-label="Nederland Stemt - Naar homepage"
                >
                  🇳🇱 <span className="hidden xs:inline">Nederland </span>Stemt
                </Link>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-6">
                <Link 
                  href="/stem" 
                  className="inline-flex items-center px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg font-semibold transition-all duration-200"
                  aria-label="Ga naar stempagina"
                >
                  Stem
                </Link>
                <Link 
                  href="/resultaten" 
                  className="inline-flex items-center px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg font-semibold transition-all duration-200"
                  aria-label="Bekijk stemresultaten"
                >
                  <span className="hidden sm:inline">Resultaten</span><span className="sm:hidden">📊</span>
                </Link>
                <Link 
                  href="/nieuw" 
                  className="inline-flex items-center px-2 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg font-semibold transition-all duration-200"
                  aria-label="Dien nieuw voorstel in"
                >
                  <span className="hidden sm:inline">Voorstel</span><span className="sm:hidden">💡</span>
                </Link>
                <HelpButton />
              </div>
            </div>
          </div>
        </nav>
        <main id="main-content" className="min-h-screen" role="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-t border-blue-100 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Nederland Stemt</h2>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Onafhankelijk burgerinitiatief voor democratische participatie</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Geen partijpolitiek, geen commerciële belangen</p>
            </div>
            <div className="flex justify-center space-x-8 text-sm">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Privacy</Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Voorwaarden</Link>
              <Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Cookies</Link>
            </div>
            <div className="mt-6 pt-6 border-t border-blue-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-500">© 2025 Nederland Stemt. Transparante democratie voor iedereen.</p>
            </div>
          </div>
        </footer>
        
        {/* Analytics Tracking */}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        
        {/* Performance Monitoring */}
        <PerformanceTracker />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}
