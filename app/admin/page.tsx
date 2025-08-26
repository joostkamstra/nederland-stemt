'use client';

import { useState, useEffect, Suspense } from 'react';
import { checkRateLimit, sanitizeInput } from '@/lib/security';

export const dynamic = 'force-dynamic';

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadProposals();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('admin_login', 5)) {
      setError('Te veel inlogpogingen. Probeer over een minuut opnieuw.');
      return;
    }
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('admin_token', token);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const loadProposals = () => {
    const submissions = JSON.parse(localStorage.getItem('nederland-stemt-submissions') || '[]');
    setProposals(submissions);
  };

  const handleApprove = async (proposalId: string) => {
    const updated = proposals.map(p => 
      p.id === proposalId ? { ...p, status: 'approved' as const } : p
    );
    setProposals(updated);
    localStorage.setItem('nederland-stemt-submissions', JSON.stringify(updated));
    
    // Add to main priorities
    const approved = updated.find(p => p.id === proposalId);
    if (approved) {
      const existingPriorities = JSON.parse(localStorage.getItem('nederland-stemt-priorities') || '[]');
      const newPriority = {
        id: approved.id,
        title: approved.title,
        description: approved.description,
        category: approved.category,
        votes: 0
      };
      existingPriorities.push(newPriority);
      localStorage.setItem('nederland-stemt-priorities', JSON.stringify(existingPriorities));
    }
  };

  const handleReject = (proposalId: string) => {
    const updated = proposals.map(p => 
      p.id === proposalId ? { ...p, status: 'rejected' as const } : p
    );
    setProposals(updated);
    localStorage.setItem('nederland-stemt-submissions', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                🔐 Beveiligde Toegang
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-600">Nederland Stemt Beheer</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                  Beheerderswachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                  placeholder="Voer wachtwoord in..."
                  required
                />
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Toegang Verkrijgen
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-3">
              👨‍💼 Admin Dashboard
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Voorstellen Beheer
            </h1>
            <p className="text-gray-600 mt-2">Beheer ingediende voorstellen voor Nederland Stemt</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors duration-200"
          >
            🚪 Uitloggen
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          {proposals.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Geen voorstellen</h3>
              <p className="text-gray-600">Er zijn nog geen voorstellen ingediend.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-orange-50 border-b border-blue-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Voorstel
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Categorie
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Ingediend
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {proposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-blue-25 transition-colors duration-200">
                      <td className="px-6 py-6">
                        <div>
                          <div className="text-base font-semibold text-gray-900 mb-1">
                            {proposal.title}
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {proposal.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                          {proposal.category}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {new Date(proposal.submittedAt).toLocaleDateString('nl-NL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          proposal.status === 'approved' ? 'bg-green-100 text-green-800' :
                          proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {proposal.status === 'approved' ? '✅ Goedgekeurd' :
                           proposal.status === 'rejected' ? '❌ Afgewezen' :
                           '⏳ In behandeling'}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        {proposal.status === 'pending' && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleApprove(proposal.id)}
                              className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-all duration-200 border border-green-200 hover:border-green-300"
                            >
                              ✅ Goedkeuren
                            </button>
                            <button
                              onClick={() => handleReject(proposal.id)}
                              className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium transition-all duration-200 border border-red-200 hover:border-red-300"
                            >
                              ❌ Afwijzen
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}