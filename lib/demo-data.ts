// Demo data for testing
import { storage } from './storage';

export function addDemoData() {
  // Add some demo votes to test the UI
  const demoVotes = {
    'woningmarkt': 156,
    'zorgkosten': 134,
    'klimaat': 98,
    'onderwijs': 87,
    'immigratie': 76,
    'pensioen': 65,
    'criminaliteit': 54,
    'mentale-gezondheid': 43,
    'digitalisering': 32,
    'eu-verhoudingen': 21,
    'inflatie': 145,
    'arbeidsmarkt': 67,
    'infrastructuur': 45,
    'landbouw': 38,
    'cultuur': 23,
    'privacy': 19,
    'energie': 89,
    'jeugdzorg': 56,
    'belasting': 78,
    'democratie': 34
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('nederland-stemt-vote-counts', JSON.stringify(demoVotes));
  }
  
  console.log('Demo data added! Total votes:', Object.values(demoVotes).reduce((a, b) => a + b, 0));
}

// Add demo data automatically in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const hasDemoData = localStorage.getItem('nederland-stemt-demo-added');
  if (!hasDemoData) {
    setTimeout(() => {
      addDemoData();
      localStorage.setItem('nederland-stemt-demo-added', 'true');
      window.location.reload(); // Refresh to show the demo data
    }, 1000);
  }
}