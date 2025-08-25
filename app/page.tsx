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
      
      <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          De stem van Nederland. Elke week.
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Stem op de belangrijkste prioriteiten voor Nederland. 
          Geen partijpolitiek, gewoon jouw stem.
        </p>
        <Link 
          href="/stem"
          className="inline-block bg-[#FF6B00] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#E55A00] focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors"
          aria-label="Ga nu stemmen op Nederland's prioriteiten"
        >
          → Stem Nu
        </Link>
      </header>

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