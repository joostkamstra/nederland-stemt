'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { defaultPriorities } from '@/lib/priorities';
import { storage } from '@/lib/storage';
import { generateOrganizationLD, generateWebSiteLD, generateFAQLD } from '@/lib/structured-data';
import '@/lib/demo-data';

export default function Home() {
  const [topPriorities, setTopPriorities] = useState<typeof defaultPriorities>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    const counts = storage.getVoteCounts();
    const prioritiesWithVotes = defaultPriorities.map(p => ({
      ...p,
      votes: counts[p.id] || 0
    }));
    
    const sorted = [...prioritiesWithVotes].sort((a, b) => b.votes - a.votes);
    setTopPriorities(sorted.slice(0, 5));
    
    const total = Object.values(counts).reduce((sum: number, count: number) => sum + count, 0);
    setTotalVotes(total);

    // Generate structured data client-side
    setStructuredData([
      generateOrganizationLD(),
      generateWebSiteLD(),
      generateFAQLD()
    ]);
  }, []);

  return (
    <>
      {/* Structured Data */}
      {structuredData && structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
          suppressHydrationWarning
        />
      )}
      
      {/* Premium Hero Section with Dutch Heritage Colors */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-16 md:py-24">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-medium mb-4 sm:mb-8 text-center">
              🇳🇱 Officieel Burgerinitiatief voor Democratische Participatie
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
              <span className="text-blue-600 dark:text-blue-400">De stem</span> van Nederland.
              <br className="hidden sm:block" />
              <span className="text-orange-500 dark:text-orange-400">Elke week.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Stem op de belangrijkste prioriteiten voor Nederland. 
              <span className="font-medium text-gray-900 dark:text-gray-100">Geen partijpolitiek</span>, gewoon jouw stem.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-8 sm:mb-10 text-gray-600 dark:text-gray-400">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{totalVotes}+</div>
                <div className="text-xs sm:text-sm">Stemmen</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 dark:text-orange-400">17M</div>
                <div className="text-xs sm:text-sm">Nederlanders</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className="text-xs sm:text-sm">Transparant</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Link 
                href="/stem"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 dark:bg-blue-500 text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
                aria-label="Ga nu stemmen op Nederland's prioriteiten"
              >
                <span>Stem Nu</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/resultaten"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-lg font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
                aria-label="Bekijk huidige stemresultaten"
              >
                Bekijk Resultaten
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-orange-100 dark:bg-orange-900 rounded-full opacity-30 dark:opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Stats */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform statistieken</h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0052CC] dark:text-blue-400" aria-label={`${totalVotes} stemmen`}>
              {totalVotes}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Stemmen deze week</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0052CC] dark:text-blue-400" aria-label="20 prioriteiten beschikbaar">
              20
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Prioriteiten</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0052CC] dark:text-blue-400" aria-label="100 procent transparant">
              100%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Transparant</div>
          </div>
        </div>
      </section>

      {/* Top Priorities */}
      <section className="mb-6 sm:mb-8" aria-labelledby="top-priorities-heading">
        <h2 id="top-priorities-heading" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          Top 5 Prioriteiten Deze Week
        </h2>
        <ol className="space-y-4" role="list">
          {topPriorities.map((priority, index) => {
            const percentage = totalVotes > 0 ? (priority.votes / totalVotes) * 100 : 0;
            return (
              <li 
                key={priority.id} 
                className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm"
                role="listitem"
              >
                <article>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span 
                        className="text-xl sm:text-2xl font-bold text-[#FF6B00] dark:text-orange-400 flex-shrink-0" 
                        aria-label={`Positie ${index + 1}`}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{priority.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{priority.description}</p>
                      </div>
                    </div>
                    <div className="text-right sm:text-right flex-shrink-0">
                      <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {priority.votes} stemmen
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" 
                       aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} 
                       aria-label={`${percentage.toFixed(1)}% van de stemmen`}>
                    <div 
                      className="bg-[#0052CC] dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
          Laat jouw stem horen
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-2 sm:px-0">
          Elke week verzamelen we de prioriteiten van Nederland. 
          De resultaten gaan rechtstreeks naar de Tweede Kamer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <Link 
            href="/stem"
            className="w-full sm:w-auto bg-[#FF6B00] dark:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A00] dark:hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-600 transition-colors min-w-[120px] text-center"
            aria-label="Begin met stemmen op prioriteiten"
          >
            Stem Nu
          </Link>
          <Link 
            href="/resultaten"
            className="w-full sm:w-auto bg-white dark:bg-gray-700 text-[#0052CC] dark:text-blue-400 border border-[#0052CC] dark:border-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 transition-colors min-w-[120px] text-center"
            aria-label="Bekijk huidige stemresultaten"
          >
            Bekijk Resultaten
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}