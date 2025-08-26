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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Panel
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Panel - Proposals
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {proposals.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No proposals submitted yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposals.map((proposal) => (
                    <tr key={proposal.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {proposal.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {proposal.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {proposal.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(proposal.submittedAt).toLocaleDateString('nl-NL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          proposal.status === 'approved' ? 'bg-green-100 text-green-800' :
                          proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {proposal.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(proposal.id)}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(proposal.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
                            >
                              Reject
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