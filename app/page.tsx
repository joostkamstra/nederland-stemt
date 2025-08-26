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
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Premium Hero Section with Dutch Heritage Colors */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              🇳🇱 Officieel Burgerinitiatief voor Democratische Participatie
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-blue-600">De stem</span> van Nederland.
              <br className="hidden sm:block" />
              <span className="text-orange-500">Elke week.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stem op de belangrijkste prioriteiten voor Nederland. 
              <span className="font-medium text-gray-900">Geen partijpolitiek</span>, gewoon jouw stem.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 mb-10 text-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalVotes}+</div>
                <div className="text-sm">Stemmen</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">17M</div>
                <div className="text-sm">Nederlanders</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm">Transparant</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/stem"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl group"
                aria-label="Ga nu stemmen op Nederland's prioriteiten"
              >
                <span>Stem Nu</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/resultaten"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                aria-label="Bekijk huidige stemresultaten"
              >
                Bekijk Resultaten
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-orange-100 rounded-full opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform statistieken</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0052CC]" aria-label={`${totalVotes} stemmen`}>
              {totalVotes}
            </div>
            <div className="text-gray-600">Stemmen deze week</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0052CC]" aria-label="20 prioriteiten beschikbaar">
              20
            </div>
            <div className="text-gray-600">Prioriteiten</div>
          </div>
          <div className="md:col-span-1 col-span-2">
            <div className="text-3xl font-bold text-[#0052CC]" aria-label="100 procent transparant">
              100%
            </div>
            <div className="text-gray-600">Transparant</div>
          </div>
        </div>
      </section>

      {/* Top Priorities */}
      <section className="mb-8" aria-labelledby="top-priorities-heading">
        <h2 id="top-priorities-heading" className="text-2xl font-bold text-gray-900 mb-6">
          Top 5 Prioriteiten Deze Week
        </h2>
        <ol className="space-y-4" role="list">
          {topPriorities.map((priority, index) => {
            const percentage = totalVotes > 0 ? (priority.votes / totalVotes) * 100 : 0;
            return (
              <li 
                key={priority.id} 
                className="bg-white rounded-lg p-4 shadow-sm"
                role="listitem"
              >
                <article>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-2xl font-bold text-[#FF6B00]" 
                        aria-label={`Positie ${index + 1}`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{priority.title}</h3>
                        <p className="text-sm text-gray-600">{priority.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {priority.votes} stemmen
                      </div>
                      <div className="text-sm text-gray-600">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" 
                       aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} 
                       aria-label={`${percentage.toFixed(1)}% van de stemmen`}>
                    <div 
                      className="bg-[#0052CC] h-2 rounded-full transition-all duration-500"
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
      <section className="text-center bg-blue-50 rounded-lg p-8" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-2xl font-bold text-gray-900 mb-4">
          Laat jouw stem horen
        </h2>
        <p className="text-gray-600 mb-6">
          Elke week verzamelen we de prioriteiten van Nederland. 
          De resultaten gaan rechtstreeks naar de Tweede Kamer.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/stem"
            className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A00] focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors min-w-[120px]"
            aria-label="Begin met stemmen op prioriteiten"
          >
            Stem Nu
          </Link>
          <Link 
            href="/resultaten"
            className="bg-white text-[#0052CC] border border-[#0052CC] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors min-w-[120px]"
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