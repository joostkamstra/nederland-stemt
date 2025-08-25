'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPriorityPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const categories = [
    'Huisvesting',
    'Gezondheid',
    'Milieu',
    'Onderwijs',
    'Samenleving',
    'Economie',
    'Veiligheid',
    'Overheid',
    'Internationaal',
    'Werk',
    'Mobiliteit',
    'Natuur',
    'Cultuur',
    'Digitaal',
    'Zorg'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !category) return;

    setIsSubmitting(true);

    try {
      // For MVP, just store locally and show success
      const newPriority = {
        id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: title.trim(),
        description: description.trim(),
        category,
        votes: 0,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Store in localStorage for now
      const existingSubmissions = JSON.parse(localStorage.getItem('nederland-stemt-submissions') || '[]');
      existingSubmissions.push(newPriority);
      localStorage.setItem('nederland-stemt-submissions', JSON.stringify(existingSubmissions));

      setIsSubmitted(true);
      
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center bg-green-50 rounded-lg p-8">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bedankt voor je voorstel!
          </h1>
          <p className="text-gray-600 mb-6">
            We hebben je prioriteit ontvangen. We bekijken alle voorstellen en voegen relevante onderwerpen toe aan toekomstige stemmingen.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#0052CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Terug naar Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Stel een nieuwe prioriteit voor
        </h1>
        <p className="text-gray-600">
          Mis je een belangrijk onderwerp in onze lijst? Stel het voor en we bekijken of we het toevoegen aan toekomstige stemmingen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titel van de prioriteit *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="bijv. Verkeersveiligheid verbeteren"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
            maxLength={60}
            required
          />
          <div className="text-sm text-gray-500 mt-1">{title.length}/60 karakters</div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Korte beschrijving *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Leg in 1-2 zinnen uit waarom dit belangrijk is voor Nederland"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
            rows={3}
            maxLength={150}
            required
          />
          <div className="text-sm text-gray-500 mt-1">{description.length}/150 karakters</div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categorie *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
            required
          >
            <option value="">Kies een categorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Let op:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• We beoordelen alle voorstellen op relevantie voor heel Nederland</li>
            <li>• Lokale onderwerpen (specifieke steden/gemeenten) worden niet toegevoegd</li>
            <li>• We voegen alleen onderwerpen toe die breed worden gedragen</li>
            <li>• Dit is geen garantie dat je voorstel wordt toegevoegd</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !description.trim() || !category || isSubmitting}
          className={`
            w-full px-6 py-4 rounded-lg font-semibold text-lg transition-colors
            ${title.trim() && description.trim() && category && !isSubmitting
              ? 'bg-[#FF6B00] text-white hover:bg-[#E55A00]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? 'Bezig met versturen...' : 'Verstuur Voorstel'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Wil je eerst stemmen op bestaande prioriteiten?{' '}
          <a href="/stem" className="text-[#0052CC] hover:underline">
            Ga naar stemmen
          </a>
        </p>
      </div>
    </div>
  );
}