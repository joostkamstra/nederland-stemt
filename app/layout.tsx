import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nederland Stemt - De stem van Nederland",
  description: "Stem wekelijks op de prioriteiten van Nederland. Geen partijpolitiek, gewoon jouw stem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-[#0052CC]">
                  Nederland Stemt
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/stem" className="text-gray-700 hover:text-[#0052CC]">
                  Stem
                </Link>
                <Link href="/resultaten" className="text-gray-700 hover:text-[#0052CC]">
                  Resultaten
                </Link>
                <Link href="/nieuw" className="text-gray-700 hover:text-[#0052CC]">
                  Voorstel
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
            <p>Nederland Stemt - Onafhankelijk burgerinitiatief</p>
            <p className="text-sm mt-2">Geen partijpolitiek, geen commerciële belangen</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
