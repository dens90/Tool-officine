# Tool di Ricerca Officine

Questo tool permette agli utenti di cercare officine in base alla targa del proprio veicolo, alla loro posizione e al tipo di servizio desiderato. Se la targa inserita corrisponde a una presente nel sistema, il tool localizza le officine nella zona specificata che offrono il servizio richiesto, visualizzandole a video. In caso di mancata corrispondenza della targa, il form non verrà elaborato. Se non vengono trovate officine nella zona o per il tipo di servizio richiesto, il risultato sarà di 0 officine trovate. I risultati possono essere ordinati per "rank" o per "distanza". Per ogni officina trovata, vengono visualizzati un pin sulla mappa, l'itinerario di Google Maps, l'indirizzo email, l'indirizzo fisico e il numero di telefono. Si precisa che tutti i dati visualizzati sono fittizi a scopo dimostrativo.

## Requisiti di Sistema

- **Ambiente di Sviluppo:**
  - npm (Node Package Manager)
  - Node.js
  - React.js
- **Backend:**
  - Server web con supporto PHP
- **Servizi Mappa:**
  - Account Google Cloud Platform con sottoscrizione (anche gratuita) per l'utilizzo delle API di Google Maps.

## Installazione

1.  Clona o scarica la repository dal tuo account Github.
2.  Apri il terminale e naviga all'interno della cartella principale del progetto scaricato.
3.  Esegui il comando `npm install` per installare tutte le dipendenze necessarie elencate nel file `package.json`.
4.  Nella root del progetto, crea un file chiamato `.env`.
5.  Copia il contenuto dal file `.env.example` nel file `.env`.

## Configurazione

1.  **File Backend (Server):**

    - Crea una cartella chiamata `api` nella root del tuo server hosting.
    - Carica i file `api.php` e `dati.json` (presenti nella cartella `data` del progetto scaricato da github) all'interno della cartella `api` sul tuo server.

2.  **Endpoint API (.env file):**

    - Modifica la proprietà `VITE_URL_CLIENT_API` nel file `.env` con l'URL completo del file `api.php` sul tuo server:
      ```
      VITE_URL_CLIENT_API=https://tuo-dominio.com/api/api.php
      ```
      Sostituisci `https://tuo-dominio.com` con l'indirizzo web del tuo server.

3.  **Chiave API di Google Maps (.env file):**
    - Ottieni una chiave API di Google Maps dalla Google Cloud Platform e abilita le API necessarie.
    - Inserisci la tua chiave API come valore della proprietà `VITE_GOOGLE_MAPS_API_KEY` nel file `.env`:
      ```
      VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
      ```
      Sostituisci `YOUR_GOOGLE_MAPS_API_KEY` con la tua chiave API.

4.   **Chiave API e Map ID di Google Maps (Componente `<Map />`):**
    * Nel codice del componente `<MapComponent />`  troverai un componente `<Map>` di Google Maps. Questo componente richiede una `key` e un `mapId`.
    * **Map ID:** L'attributo `mapId` è un identificatore per uno stile di mappa personalizzato che devi creare nella Google Cloud Platform.
     **Come configurare il Map ID:**
            1.  Accedi alla [Google Cloud Platform Console](https://console.cloud.google.com/).
            2.  Assicurati di aver selezionato il progetto dove hai abilitato le API di Google Maps.
            3.  Nel menu di navigazione, vai a "Google Maps Platform" -> "Stili mappa".
            4.  Crea un nuovo stile di mappa o seleziona uno esistente.
            5.  Una volta selezionato o creato uno stile, troverai il **Map ID** nella pagina dei dettagli dello stile.
            6.  Copia questo **Map ID** e incollalo come valore dell'attributo `mapId` nel componente `<Map />` all'interno del file `src/Components/MapComponent.jsx`.

## Funzionamento

1.  L'utente inserisce la targa, la posizione e seleziona il servizio nel form.
2.  Il frontend verifica la targa e invia una richiesta all'API (`VITE_URL_CLIENT_API`).
3.  Il backend (`api.php`) filtra i dati da `dati.json` in base ai criteri.
4.  L'API restituisce un array di officine corrispondenti.
5.  Il frontend visualizza i risultati, inclusa la mappa con i pin delle officine e le informazioni di contatto.
6.  I risultati possono essere filtrati per "rank" o "distanza".

## Informazioni Importanti

- Il tool è attualmente ottimizzato per la posizione utente su **Roma** e la targa fittizia **AA000AA**.
- Per testare con altre posizioni, modificare le proprietà `city`, `addr`, `lat` e `lon` nel file `dati.json`.
- Per testare con altre targhe, modificare la proprietà `"targa"` nel file `dati.json`.
- La selezione del tipo di servizio nel componente `DataForm.jsx` deve corrispondere alla prima parte della proprietà `tipoEvento` nel `dati.json` (seguita da `:`), utilizzando il secondo valore dell'array in `selectIntervento`.
- es:(DataForm.jsx) Pneumatici: [["Pneumatici", "PPR"]] => (dati.json) tipoEvento: "PPR:" .

## Componenti Principali

- `App.js`
- `DataForm.jsx`
- `FormContext.jsx`
- `Location.jsx`
- `MapComponent.jsx`
- `ResultForm.jsx`
- `useFetch.js`

## Note Aggiuntive e Troubleshooting

- L'applicazione è in fase di sviluppo e potrebbe presentare limitazioni.
- Verificare che gli URL e le chiavi API nel `.env` siano corretti.
- Controllare i log del server per eventuali errori del backend.
- Assicurarsi che i file `api.php` e `dati.json` siano caricati correttamente nella cartella `api` sul server.






        



