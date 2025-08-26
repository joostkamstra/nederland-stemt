import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookieverklaring</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen 
            wanneer u onze website bezoekt. Ze helpen ons de website beter te laten 
            functioneren en uw ervaring te verbeteren.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welke cookies gebruiken wij?</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Noodzakelijke cookies</h3>
          <p className="mb-4">Deze cookies zijn essentieel voor de werking van het platform:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bewaartijd</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">nederland-stemt-votes</td>
                  <td className="border border-gray-300 px-4 py-2">Voorkomt dubbele stemmen</td>
                  <td className="border border-gray-300 px-4 py-2">7 dagen</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">admin_token</td>
                  <td className="border border-gray-300 px-4 py-2">Admin authenticatie</td>
                  <td className="border border-gray-300 px-4 py-2">24 uur</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">csrf_token</td>
                  <td className="border border-gray-300 px-4 py-2">Beveiliging tegen aanvallen</td>
                  <td className="border border-gray-300 px-4 py-2">1 uur</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Functionele cookies</h3>
          <p className="mb-4">Deze cookies verbeteren uw gebruikerservaring:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bewaartijd</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">theme_preference</td>
                  <td className="border border-gray-300 px-4 py-2">Onthoudt uw kleurthema</td>
                  <td className="border border-gray-300 px-4 py-2">1 jaar</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">language_preference</td>
                  <td className="border border-gray-300 px-4 py-2">Onthoudt uw taalvoorkeur</td>
                  <td className="border border-gray-300 px-4 py-2">1 jaar</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">onboarding_completed</td>
                  <td className="border border-gray-300 px-4 py-2">Voorkomt herhaalde tutorials</td>
                  <td className="border border-gray-300 px-4 py-2">1 jaar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Analytische cookies (optioneel)</h3>
          <p className="mb-4">Deze cookies helpen ons de website te verbeteren:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Doel</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bewaartijd</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_ga</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics - gebruikersgedrag</td>
                  <td className="border border-gray-300 px-4 py-2">2 jaar</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_gid</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics - sessie-info</td>
                  <td className="border border-gray-300 px-4 py-2">1 dag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Local Storage</h2>
          <p className="mb-4">
            Naast cookies gebruiken wij Local Storage om gegevens lokaal op te slaan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>nederland-stemt-votes:</strong> Uw stemgeschiedenis (voorkomt dubbele stemmen)</li>
            <li><strong>nederland-stemt-submissions:</strong> Ingediende voorstellen (admin functionaliteit)</li>
            <li><strong>nederland-stemt-priorities:</strong> Goedgekeurde prioriteiten (admin functionaliteit)</li>
            <li><strong>email_signups:</strong> E-mailadressen voor nieuwsbrief (tijdelijk)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Uw keuzes</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies accepteren of weigeren</h3>
          <p className="mb-4">
            U kunt zelf kiezen welke cookies u accepteert:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Noodzakelijke cookies:</strong> Kunnen niet worden uitgeschakeld</li>
            <li><strong>Functionele cookies:</strong> Kunt u uitschakelen in uw browserinstellingen</li>
            <li><strong>Analytische cookies:</strong> Kunt u weigeren via onze cookiebanner</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies verwijderen</h3>
          <p className="mb-4">U kunt cookies verwijderen via:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uw browserinstellingen (alle cookies)</li>
            <li>Browser-extensies voor privacy</li>
            <li>Incognito/privé browsing voor nieuwe sessies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser-specifieke instructies</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Chrome</h3>
          <p>Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Firefox</h3>
          <p>Instellingen → Privacy en beveiliging → Cookies en sitegegevens</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Safari</h3>
          <p>Voorkeuren → Privacy → Cookies en websitegegevens</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">Edge</h3>
          <p>Instellingen → Cookies en sitemachtigingen → Cookies en sitegegevens</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gevolgen van weigeren</h2>
          <p>Als u cookies weigert of verwijdert:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Kunt u mogelijk meerdere keren per week stemmen (niet bedoeld)</li>
            <li>Moeten wij uw voorkeuren opnieuw instellen bij elk bezoek</li>
            <li>Werken sommige functies mogelijk niet optimaal</li>
            <li>Kunnen wij de website minder goed verbeteren</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates</h2>
          <p>
            Wij kunnen deze cookieverklaring bijwerken. De meest recente versie 
            vindt u altijd op deze pagina.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p>Vragen over cookies? Neem contact met ons op:</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p><strong>Nederland Stemt</strong></p>
            <p>E-mail: privacy@nederlandstemt.nl</p>
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
            <a href="/terms" className="text-gray-500 hover:text-gray-700">Voorwaarden</a>
          </div>
        </div>
      </div>
    </div>
  );
}