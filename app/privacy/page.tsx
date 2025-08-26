import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacyverklaring</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Wie zijn wij?</h2>
          <p>
            Nederland Stemt is een democratisch participatieplatform dat Nederlandse burgers 
            de mogelijkheid biedt om wekelijks te stemmen op nationale prioriteiten. Wij zijn 
            gevestigd in Nederland en vallen onder de Nederlandse en Europese privacywetgeving.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Welke gegevens verzamelen wij?</h2>
          <p>Wij verzamelen de volgende persoonlijke gegevens:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Stemgegevens:</strong> Uw keuzes bij wekelijkse stemmingen (anoniem opgeslagen)</li>
            <li><strong>E-mailadres:</strong> Indien u zich aanmeldt voor onze nieuwsbrief</li>
            <li><strong>Voorstellen:</strong> Tekstinhoud van door u ingediende prioriteitsvoorstellen</li>
            <li><strong>Technische gegevens:</strong> IP-adres, browserinformatie, bezoektijden</li>
            <li><strong>Cookies:</strong> Zie onze <a href="/cookies" className="text-[#0052CC] hover:underline">cookieverklaring</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Waarom verzamelen wij deze gegevens?</h2>
          <p>Wij gebruiken uw gegevens voor:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Het faciliteren van democratische participatie</li>
            <li>Het samenstellen van wekelijkse stemresultaten</li>
            <li>Het versturen van stemherinneringen (indien aangemeld)</li>
            <li>Het modereren van voorgestelde prioriteiten</li>
            <li>Het verbeteren van onze dienstverlening</li>
            <li>Het naleven van wettelijke verplichtingen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rechtsgrondslag</h2>
          <p>Wij verwerken uw gegevens op basis van:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Gerechtvaardigd belang:</strong> Voor democratische participatie en platformverbetering</li>
            <li><strong>Toestemming:</strong> Voor nieuwsbriefinschrijving en cookies</li>
            <li><strong>Wettelijke verplichting:</strong> Voor het naleven van Nederlandse wetgeving</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Hoe lang bewaren wij gegevens?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Stemgegevens:</strong> 2 jaar na de stemming</li>
            <li><strong>E-mailadressen:</strong> Tot u zich uitschrijft</li>
            <li><strong>Voorstellen:</strong> 1 jaar na indiening</li>
            <li><strong>Technische logs:</strong> Maximum 12 maanden</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Delen wij uw gegevens?</h2>
          <p>
            Wij delen uw persoonlijke gegevens niet met derden, behalve:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Wanneer dit wettelijk verplicht is</li>
            <li>Voor technische dienstverlening (hosting, e-mailservices)</li>
            <li>Met uw expliciete toestemming</li>
          </ul>
          <p className="mt-4">
            <strong>Anonieme stemresultaten</strong> delen wij wekelijks met de Tweede Kamer 
            om democratische input te bieden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Uw rechten</h2>
          <p>U heeft het recht om:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Inzage:</strong> Te vragen welke gegevens wij van u hebben</li>
            <li><strong>Rectificatie:</strong> Onjuiste gegevens te laten corrigeren</li>
            <li><strong>Verwijdering:</strong> Uw gegevens te laten wissen</li>
            <li><strong>Beperking:</strong> Verwerking te laten beperken</li>
            <li><strong>Overdraagbaarheid:</strong> Uw gegevens over te laten dragen</li>
            <li><strong>Bezwaar:</strong> Bezwaar te maken tegen verwerking</li>
            <li><strong>Toestemming intrekken:</strong> Voor nieuwsbrief en cookies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om uw 
            persoonlijke gegevens te beschermen tegen verlies, misbruik en ongeautoriseerde toegang.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
          <p>
            Voor vragen over uw privacy of het uitoefenen van uw rechten kunt u contact 
            met ons opnemen via:
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p><strong>Nederland Stemt</strong></p>
            <p>E-mail: privacy@nederlandstemt.nl</p>
            <p>Website: <a href="/contact" className="text-[#0052CC] hover:underline">/contact</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Klachten</h2>
          <p>
            U kunt een klacht indienen bij de Autoriteit Persoonsgegevens als u vindt 
            dat wij uw gegevens niet juist verwerken:
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p><strong>Autoriteit Persoonsgegevens</strong></p>
            <p>Website: autoriteitpersoonsgegevens.nl</p>
            <p>Telefoon: 088 - 1805 250</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Wijzigingen</h2>
          <p>
            Wij kunnen deze privacyverklaring wijzigen. De meest recente versie 
            vindt u altijd op deze pagina. Bij belangrijke wijzigingen informeren 
            wij u via e-mail (indien aangemeld).
          </p>
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
            <a href="/terms" className="text-gray-500 hover:text-gray-700">Algemene voorwaarden</a>
            <a href="/cookies" className="text-gray-500 hover:text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  );
}