'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { defaultPriorities } from '@/lib/priorities';
import { storage } from '@/lib/storage';
import '@/lib/demo-data';

export default function Home() {
  const [topPriorities, setTopPriorities] = useState<typeof defaultPriorities>([]);
  const [totalVotes, setTotalVotes] = useState(0);

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
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          De stem van Nederland. Elke week.
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Stem op de belangrijkste prioriteiten voor Nederland. 
          Geen partijpolitiek, gewoon jouw stem.
        </p>
        <Link 
          href="/stem"
          className="inline-block bg-[#FF6B00] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#E55A00] transition-colors"
        >
          → Stem Nu
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0052CC]">{totalVotes}</div>
            <div className="text-gray-600">Stemmen deze week</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0052CC]">20</div>
            <div className="text-gray-600">Prioriteiten</div>
          </div>
          <div className="md:col-span-1 col-span-2">
            <div className="text-3xl font-bold text-[#0052CC]">100%</div>
            <div className="text-gray-600">Transparant</div>
          </div>
        </div>
      </div>

      {/* Top Priorities */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Top 5 Prioriteiten Deze Week
        </h2>
        <div className="space-y-4">
          {topPriorities.map((priority, index) => {
            const percentage = totalVotes > 0 ? (priority.votes / totalVotes) * 100 : 0;
            return (
              <div key={priority.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#FF6B00]">
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0052CC] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Laat jouw stem horen
        </h2>
        <p className="text-gray-600 mb-6">
          Elke week verzamelen we de prioriteiten van Nederland. 
          De resultaten gaan rechtstreeks naar de Tweede Kamer.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/stem"
            className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A00] transition-colors"
          >
            Stem Nu
          </Link>
          <Link 
            href="/resultaten"
            className="bg-white text-[#0052CC] border border-[#0052CC] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Bekijk Resultaten
          </Link>
        </div>
      </div>
    </div>
  );
}