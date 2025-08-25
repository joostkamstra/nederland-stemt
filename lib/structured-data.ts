// Structured data generators for SEO

export function generateOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nederland Stemt',
    description: 'Democratisch participatie platform voor Nederlandse burgers',
    url: 'https://nederlandstemt.nl',
    logo: 'https://nederlandstemt.nl/logo.png',
    sameAs: [
      'https://twitter.com/nederlandstemt',
      'https://linkedin.com/company/nederlandstemt',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressRegion: 'Nederland'
    },
    founder: {
      '@type': 'Person',
      name: 'Nederland Stemt Team'
    },
    foundingDate: '2024',
    areaServed: 'Netherlands',
    knowsLanguage: ['nl-NL']
  };
}

export function generateWebSiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nederland Stemt',
    url: 'https://nederlandstemt.nl',
    description: 'Stem wekelijks op de prioriteiten van Nederland. Geen partijpolitiek, gewoon jouw stem.',
    inLanguage: 'nl-NL',
    publisher: {
      '@type': 'Organization',
      name: 'Nederland Stemt'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nederlandstemt.nl/zoeken?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateVotingEventLD(totalVotes: number, week: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Nederland Stemt - Week ${week}`,
    description: `Wekelijkse stemming op nationale prioriteiten - ${totalVotes} stemmen uitgebracht`,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://nederlandstemt.nl/stem'
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nederland Stemt',
      url: 'https://nederlandstemt.nl'
    },
    isAccessibleForFree: true,
    audience: {
      '@type': 'Audience',
      audienceType: 'Nederlandse burgers 16+'
    }
  };
}

export function generateBreadcrumbLD(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateFAQLD() {
  const faqs = [
    {
      question: 'Hoe vaak kan ik stemmen?',
      answer: 'Je kunt één keer per week stemmen op 3 prioriteiten die jij het belangrijkst vindt voor Nederland.'
    },
    {
      question: 'Wat gebeurt er met de stemresultaten?',
      answer: 'Elke vrijdag worden de wekelijkse resultaten gedeeld met de Tweede Kamer als input voor het democratische proces.'
    },
    {
      question: 'Is Nederland Stemt partijpolitiek?',
      answer: 'Nee, Nederland Stemt is volledig onpartijdig en onafhankelijk. We focussen op onderwerpen, niet op partijen.'
    },
    {
      question: 'Hoe worden nieuwe prioriteiten toegevoegd?',
      answer: 'Burgers kunnen voorstellen indienen via de website. Deze worden beoordeeld op relevantie voor heel Nederland.'
    },
    {
      question: 'Is mijn stem anoniem?',
      answer: 'Ja, alle stemmen zijn volledig anoniem. We slaan geen persoonlijke gegevens op bij stemmen.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateGovernmentServiceLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Nederland Stemt Democratische Participatie',
    description: 'Online platform voor burgerparticipatie in Nederlandse democratie',
    provider: {
      '@type': 'Organization',
      name: 'Nederland Stemt'
    },
    areaServed: 'Netherlands',
    audience: {
      '@type': 'Audience',
      audienceType: 'Nederlandse burgers'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://nederlandstemt.nl',
      serviceType: 'Online'
    },
    serviceType: 'Democratische participatie',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
        'Friday', 'Saturday', 'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    }
  };
}