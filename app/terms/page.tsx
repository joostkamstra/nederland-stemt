import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Algemene Voorwaarden</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nederland Stemt:</strong> Het democratische participatieplatform</li>
            <li><strong>Gebruiker:</strong> Iedere persoon die gebruik maakt van het platform</li>
            <li><strong>Stemming:</strong> Wekelijkse prioriteitenstemming voor Nederlandse burgers</li>
            <li><strong>Voorstel:</strong> Door gebruikers ingediende prioriteitsvoorstellen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Toepasselijkheid</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op alle gebruik van Nederland Stemt. 
            Door het platform te gebruiken gaat u akkoord met deze voorwaarden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Toegang tot het platform</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Het platform is gratis toegankelijk voor Nederlandse burgers van 16 jaar en ouder</li>
            <li>U mag per week slechts één keer stemmen</li>
            <li>Misbruik van het stemrecht kan leiden tot uitsluiting</li>
            <li>Wij behouden het recht om toegang te weigeren zonder opgave van redenen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Gebruik van het platform</h2>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Toegestaan gebruik:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Stemmen op nationale prioriteiten</li>
            <li>Voorstellen indienen voor nieuwe prioriteiten</li>
            <li>Inzien van stemresultaten</li>
            <li>Constructieve discussie in reacties</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verboden gebruik:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meerdere accounts aanmaken</li>
            <li>Automatische stemming of bot-gebruik</li>
            <li>Haatdragende, discriminerende of beledigende content</li>
            <li>Spam, reclame of commerciële promotie</li>
            <li>Manipulatie van stemresultaten</li>
            <li>Inbreuk op intellectueel eigendom</li>
            <li>Illegale activiteiten</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Voorstellen indienen</h2>
          <p>Wanneer u een voorstel indient:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Moet het voorstel relevantie hebben voor heel Nederland</li>
            <li>Mag het niet discriminerend, beledigend of illegaal zijn</li>
            <li>Geeft u Nederland Stemt het recht om het te publiceren en te delen</li>
            <li>Blijft u verantwoordelijk voor de inhoud</li>
            <li>Accepteert u dat wij het recht hebben om voorstellen te weigeren</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Democratische impact</h2>
          <p>
            Nederland Stemt faciliteert democratische participatie door:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Wekelijks stemresultaten te delen met de Tweede Kamer</li>
            <li>Transparante rapportage van alle stemuitkomsten</li>
            <li>Open communicatie over welke voorstellen worden opgenomen</li>
          </ul>
          <p className="mt-4">
            <strong>Belangrijk:</strong> Nederland Stemt is geen officieel overheidsorgaan. 
            Stemresultaten zijn adviserend en niet juridisch bindend.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectueel eigendom</h2>
          <p>
            Alle content op het platform (behalve door gebruikers ingediende voorstellen) 
            is eigendom van Nederland Stemt. U mag deze content niet kopiëren of 
            hergebruiken zonder toestemming.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Beschikbaarheid en onderhoud</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Wij streven naar 99% uptime maar garanderen dit niet</li>
            <li>Onderhoud kan tijdelijke onbeschikbaarheid veroorzaken</li>
            <li>Wij zijn niet aansprakelijk voor gemiste stemmingen door technische problemen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Aansprakelijkheid</h2>
          <p>Nederland Stemt is niet aansprakelijk voor:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Directe, indirecte of gevolgschade door gebruik van het platform</li>
            <li>Inhoud van door gebruikers ingediende voorstellen</li>
            <li>Technische problemen of gegevensverlies</li>
            <li>Politieke gevolgen van stemresultaten</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Moderatie en sancties</h2>
          <p>Bij overtreding van deze voorwaarden kunnen wij:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Waarschuwingen geven</li>
            <li>Content verwijderen</li>
            <li>Accounts tijdelijk of permanent opschorten</li>
            <li>IP-adressen blokkeren</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacybeleid</h2>
          <p>
            Ons privacybeleid beschrijft hoe wij omgaan met uw persoonlijke gegevens. 
            Lees dit door op onze <a href="/privacy" className="text-[#0052CC] hover:underline">privacypagina</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Wijzigingen</h2>
          <p>
            Wij kunnen deze voorwaarden wijzigen. Belangrijke wijzigingen communiceren 
            wij via het platform. Voortgezet gebruik betekent acceptatie van de nieuwe voorwaarden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Toepasselijk recht</h2>
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden 
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact</h2>
          <p>Voor vragen over deze voorwaarden:</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p><strong>Nederland Stemt</strong></p>
            <p>E-mail: info@nederlandstemt.nl</p>
            <p>Website: <a href="/contact" className="text-[#0052CC] hover:underline">/contact</a></p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-[#0052CC] hover:underline"
          >
            ← Terug naar home
          </Link>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-gray-500 hover:text-gray-700">Privacy</a>
            <a href="/cookies" className="text-gray-500 hover:text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  );
}