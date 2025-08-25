export interface Priority {
  id: string;
  title: string;
  description: string;
  votes: number;
  category: string;
}

export const defaultPriorities: Priority[] = [
  {
    id: "woningmarkt",
    title: "Woningmarkt crisis",
    description: "Betaalbare huizen voor starters en middeninkomens",
    votes: 0,
    category: "Huisvesting"
  },
  {
    id: "zorgkosten",
    title: "Zorgkosten",
    description: "Betaalbare zorg en lagere eigen risico",
    votes: 0,
    category: "Gezondheid"
  },
  {
    id: "klimaat",
    title: "Klimaatverandering",
    description: "Duurzame energie en CO2 reductie",
    votes: 0,
    category: "Milieu"
  },
  {
    id: "onderwijs",
    title: "Onderwijs kwaliteit",
    description: "Beter onderwijs en hogere lerarensalarissen",
    votes: 0,
    category: "Onderwijs"
  },
  {
    id: "immigratie",
    title: "Immigratie beleid",
    description: "Eerlijk en humaan migratiebeleid",
    votes: 0,
    category: "Samenleving"
  },
  {
    id: "pensioen",
    title: "Pensioen zekerheid",
    description: "Behoud koopkracht voor gepensioneerden",
    votes: 0,
    category: "Economie"
  },
  {
    id: "criminaliteit",
    title: "Criminaliteit aanpak",
    description: "Veiligere straten en hardere aanpak",
    votes: 0,
    category: "Veiligheid"
  },
  {
    id: "mentale-gezondheid",
    title: "Mentale gezondheid",
    description: "Betere GGZ en kortere wachtlijsten",
    votes: 0,
    category: "Gezondheid"
  },
  {
    id: "digitalisering",
    title: "Digitalisering overheid",
    description: "Moderne, gebruiksvriendelijke overheidsdiensten",
    votes: 0,
    category: "Overheid"
  },
  {
    id: "eu-verhoudingen",
    title: "EU verhoudingen",
    description: "Nederland sterker in Europa",
    votes: 0,
    category: "Internationaal"
  },
  {
    id: "inflatie",
    title: "Inflatie bestrijding",
    description: "Lagere prijzen voor boodschappen en energie",
    votes: 0,
    category: "Economie"
  },
  {
    id: "arbeidsmarkt",
    title: "Arbeidsmarkt",
    description: "Meer vaste contracten en betere arbeidsvoorwaarden",
    votes: 0,
    category: "Werk"
  },
  {
    id: "infrastructuur",
    title: "Infrastructuur",
    description: "Beter openbaar vervoer en minder files",
    votes: 0,
    category: "Mobiliteit"
  },
  {
    id: "landbouw",
    title: "Landbouw toekomst",
    description: "Steun voor boeren en natuurbehoud",
    votes: 0,
    category: "Natuur"
  },
  {
    id: "cultuur",
    title: "Cultuur en sport",
    description: "Behoud bibliotheken, musea en sportverenigingen",
    votes: 0,
    category: "Cultuur"
  },
  {
    id: "privacy",
    title: "Privacy bescherming",
    description: "Bescherming persoonlijke data tegen big tech",
    votes: 0,
    category: "Digitaal"
  },
  {
    id: "energie",
    title: "Energietransitie",
    description: "Betaalbare groene energie voor iedereen",
    votes: 0,
    category: "Milieu"
  },
  {
    id: "jeugdzorg",
    title: "Jeugdzorg",
    description: "Betere hulp voor kinderen en gezinnen",
    votes: 0,
    category: "Zorg"
  },
  {
    id: "belasting",
    title: "Belastingstelsel",
    description: "Eerlijkere belastingen, minder voor werkenden",
    votes: 0,
    category: "Economie"
  },
  {
    id: "democratie",
    title: "Democratie versterken",
    description: "Meer directe invloed voor burgers",
    votes: 0,
    category: "Overheid"
  }
];