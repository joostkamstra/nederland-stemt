'use client';

import { useState, useEffect } from 'react';
import { checkRateLimit } from '@/lib/security';

export const dynamic = 'force-dynamic';

interface EmailSignup {
  id: string;
  email: string;
  source: 'vote_complete' | 'page_exit' | 'manual';
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferences: {
    weeklyReminder: boolean;
    resultsUpdate: boolean;
    newFeatures: boolean;
  };
}

export default function EmailsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [signups, setSignups] = useState<EmailSignup[]>([]);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    unsubscribed: 0,
    thisWeek: 0
  });

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadSignups();
    }
  }, []);

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
        loadSignups();
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const loadSignups = () => {
    const emailSignups = JSON.parse(localStorage.getItem('email_signups') || '[]');
    setSignups(emailSignups);
    
    // Calculate stats
    const total = emailSignups.length;
    const active = emailSignups.filter((s: EmailSignup) => s.status === 'active').length;
    const unsubscribed = emailSignups.filter((s: EmailSignup) => s.status === 'unsubscribed').length;
    
    // This week signups
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = emailSignups.filter((s: EmailSignup) => 
      new Date(s.subscribedAt) > oneWeekAgo
    ).length;
    
    setStats({ total, active, unsubscribed, thisWeek });
  };

  const exportToCSV = () => {
    if (signups.length === 0) return;
    
    const headers = [
      'Email',
      'Source', 
      'Subscribed Date',
      'Status',
      'Weekly Reminder',
      'Results Update',
      'New Features'
    ];
    
    const csvContent = [
      headers.join(','),
      ...signups.map(signup => [
        signup.email,
        signup.source,
        new Date(signup.subscribedAt).toLocaleDateString('nl-NL'),
        signup.status,
        signup.preferences.weeklyReminder ? 'Yes' : 'No',
        signup.preferences.resultsUpdate ? 'Yes' : 'No',
        signup.preferences.newFeatures ? 'Yes' : 'No'
      ].join(','))
    ].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `nederland-stemt-emails-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'vote_complete': return 'Na stemmen';
      case 'page_exit': return 'Bij verlaten';
      case 'manual': return 'Handmatig';
      default: return source;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Email Admin
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#0052CC] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Email Inschrijvingen
            </h1>
            <p className="text-gray-600 mt-1">
              Beheer nieuwsbrief abonnees en export gegevens
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              disabled={signups.length === 0}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                signups.length > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-500 hover:text-gray-700 px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#0052CC]">{stats.total}</div>
            <div className="text-gray-600 text-sm">Totaal inschrijvingen</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            <div className="text-gray-600 text-sm">Actieve abonnees</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-red-600">{stats.unsubscribed}</div>
            <div className="text-gray-600 text-sm">Uitgeschreven</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#FF6B00]">{stats.thisWeek}</div>
            <div className="text-gray-600 text-sm">Deze week</div>
          </div>
        </div>

        {/* Signups Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {signups.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-gray-500 text-lg">Nog geen email inschrijvingen.</p>
              <p className="text-gray-400 text-sm mt-2">
                Inschrijvingen verschijnen hier zodra gebruikers zich aanmelden.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bron
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingeschreven
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Voorkeuren
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {signup.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          signup.source === 'vote_complete' ? 'bg-blue-100 text-blue-800' :
                          signup.source === 'page_exit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getSourceLabel(signup.source)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(signup.subscribedAt).toLocaleDateString('nl-NL', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          signup.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {signup.status === 'active' ? 'Actief' : 'Uitgeschreven'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          {signup.preferences.weeklyReminder && (
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              📅 Wekelijks
                            </div>
                          )}
                          {signup.preferences.resultsUpdate && (
                            <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                              📊 Resultaten
                            </div>
                          )}
                          {signup.preferences.newFeatures && (
                            <div className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                              ✨ Nieuws
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Gebruik instructies</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Email adressen worden automatisch verzameld via de website</li>
            <li>• Export naar CSV voor gebruik in externe nieuwsbrief systemen</li>
            <li>• Voorkeuren bepalen welke type emails gebruikers willen ontvangen</li>
            <li>• Bron toont waar de gebruiker zich heeft ingeschreven</li>
          </ul>
        </div>
      </div>
    </div>
  );
}