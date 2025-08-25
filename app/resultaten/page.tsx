'use client';

import { useEffect, useState } from 'react';
import { defaultPriorities } from '@/lib/priorities';
import { storage } from '@/lib/storage';

export default function ResultsPage() {
  const [results, setResults] = useState<typeof defaultPriorities>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = () => {
      const counts = storage.getVoteCounts();
      const prioritiesWithVotes = defaultPriorities.map(p => ({
        ...p,
        votes: counts[p.id] || 0
      }));
      
      const sorted = [...prioritiesWithVotes].sort((a, b) => b.votes - a.votes);
      setResults(sorted);
      
      const total = Object.values(counts).reduce((sum: number, count: number) => sum + count, 0);
      setTotalVotes(total);
      setLoading(false);
    };

    loadResults();
    
    // Update every 10 seconds for real-time feel
    const interval = setInterval(loadResults, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return (votes / totalVotes) * 100;
  };

  const getBarColor = (index: number) => {
    if (index === 0) return 'bg-[#FF6B00]'; // Gold for #1
    if (index === 1) return 'bg-[#0052CC]'; // Blue for #2
    if (index === 2) return 'bg-purple-500'; // Purple for #3
    return 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0052CC] mx-auto"></div>
          <p className="mt-4 text-gray-600">Resultaten laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Live Resultaten
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#0052CC]">{totalVotes}</div>
              <div className="text-gray-600 text-sm">Totaal Stemmen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0052CC]">{results.filter(r => r.votes > 0).length}</div>
              <div className="text-gray-600 text-sm">Actieve Prioriteiten</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0052CC]">
                {results[0]?.votes || 0}
              </div>
              <div className="text-gray-600 text-sm">Hoogste Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0052CC]">LIVE</div>
              <div className="text-gray-600 text-sm">Updates Automatisch</div>
            </div>
          </div>
        </div>
      </div>

      {totalVotes === 0 ? (
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Nog geen stemmen
          </h2>
          <p className="text-gray-600 mb-6">
            Wees de eerste om te stemmen op de prioriteiten van Nederland
          </p>
          <a
            href="/stem"
            className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A00] transition-colors"
          >
            Eerste Stem Uitbrengen
          </a>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Top 3 Prioriteiten
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {results.slice(0, 3).map((priority, index) => {
                const percentage = getPercentage(priority.votes);
                const medals = ['🥇', '🥈', '🥉'];
                
                return (
                  <div key={priority.id} className="text-center">
                    <div className={`
                      bg-white rounded-lg p-6 shadow-lg border-2 
                      ${index === 0 ? 'border-[#FF6B00] scale-105' : 
                        index === 1 ? 'border-[#0052CC]' : 'border-purple-500'
                      }
                    `}>
                      <div className="text-4xl mb-2">{medals[index]}</div>
                      <h3 className="font-bold text-lg mb-2">{priority.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{priority.description}</p>
                      
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {priority.votes} stemmen
                        </div>
                        <div className="text-lg font-semibold text-gray-600">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Results */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Alle Resultaten
            </h2>
            <div className="space-y-3">
              {results.map((priority, index) => {
                const percentage = getPercentage(priority.votes);
                
                return (
                  <div key={priority.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className={`
                          text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full text-white
                          ${index < 3 ? getBarColor(index) : 'bg-gray-400'}
                        `}>
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{priority.title}</h3>
                          <p className="text-sm text-gray-600">{priority.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {priority.votes}
                        </div>
                        <div className="text-sm text-gray-600">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${getBarColor(index)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{priority.category}</span>
                      {priority.votes === 0 && (
                        <span className="text-xs text-gray-400">Nog geen stemmen</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Share Results */}
          <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Deel deze resultaten
            </h2>
            <p className="text-gray-600 mb-6">
              Laat anderen ook zien wat Nederland belangrijk vindt
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  const text = `Top 3 prioriteiten Nederland:\n1. ${results[0]?.title} (${results[0]?.votes} stemmen)\n2. ${results[1]?.title} (${results[1]?.votes} stemmen)\n3. ${results[2]?.title} (${results[2]?.votes} stemmen)\n\nStem ook: ${window.location.origin}`;
                  if (navigator.share) {
                    navigator.share({ text });
                  } else {
                    navigator.clipboard.writeText(text);
                  }
                }}
                className="bg-[#0052CC] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📱 Deel via App
              </button>
              
              <button
                onClick={() => {
                  const url = `https://wa.me/?text=${encodeURIComponent(`Zie de live prioriteiten van Nederland: ${window.location.href}`)}`;
                  window.open(url, '_blank');
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}