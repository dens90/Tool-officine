export interface NavItem {
  title: string;
  labels: string[];
}

export const dataNav: NavItem[] = [
  {
    title: "Ricerca",
    labels: [
      "Ricerca Officina",
      "Ricerca per Targa",
      "Ricerca per Servizio",
      "Officine Vicine",
      "Mappa Officine",
    ],
  },
  {
    title: "Servizi",
    labels: [
      "Servizi Offerti",
      "Meccanico",
      "Carrozzeria",
      "Gommista",
      "Elettrauto",
      "Soccorso Stradale",
    ],
  },

  {
    title: "Informazioni",
    labels: [
      "Informazioni Utili",
      "Come funziona la ricerca",
      "Filtri di Ricerca",
      "Visualizzazione Mappa",
      "Contatti Officine",
    ],
  },
  {
    title: "Area",
    labels: [
      "Area Utente",
      "Officine Convenzionate",
      "Le mie Ricerche",
      "Assistenza",
      "Segnala un'Officina",
    ],
  },
];
