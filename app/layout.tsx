import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="nl">
      <body className="bg-gray-50">
        {/* Skip to main content link for keyboard navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#0052CC] text-white px-4 py-2 rounded-lg z-50 font-semibold"
        >
          Ga naar hoofdinhoud
        </a>
        
        <nav className="bg-white border-b border-gray-200" role="navigation" aria-label="Hoofdnavigatie">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="text-xl font-bold text-[#0052CC] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded-lg px-2 py-1"
                  aria-label="Nederland Stemt - Naar homepage"
                >
                  Nederland Stemt
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/stem" 
                  className="text-gray-700 hover:text-[#0052CC] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded-lg px-3 py-2 font-medium"
                  aria-label="Ga naar stempagina"
                >
                  Stem
                </Link>
                <Link 
                  href="/resultaten" 
                  className="text-gray-700 hover:text-[#0052CC] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded-lg px-3 py-2 font-medium"
                  aria-label="Bekijk stemresultaten"
                >
                  Resultaten
                </Link>
                <Link 
                  href="/nieuw" 
                  className="text-gray-700 hover:text-[#0052CC] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 rounded-lg px-3 py-2 font-medium"
                  aria-label="Dien nieuw voorstel in"
                >
                  Voorstel
                </Link>
                <HelpButton />
              </div>
            </div>
          </div>
        </nav>
        <main id="main-content" className="min-h-screen" role="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="bg-gray-100 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
            <p>Nederland Stemt - Onafhankelijk burgerinitiatief</p>
            <p className="text-sm mt-2">Geen partijpolitiek, geen commerciële belangen</p>
            <div className="flex justify-center space-x-6 mt-4 text-xs">
              <Link href="/privacy" className="hover:text-[#0052CC]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#0052CC]">Voorwaarden</Link>
              <Link href="/cookies" className="hover:text-[#0052CC]">Cookies</Link>
            </div>
          </div>
        </footer>
        
        {/* Analytics Tracking */}
        <AnalyticsTracker />
        
        {/* Performance Monitoring */}
        <PerformanceTracker />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}
