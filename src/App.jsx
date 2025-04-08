import "./App.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import DataForm from "./Components/DataForm";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import MapComponent from "./Components/MapComponent";
import SubNavbar from "./Components/SubNavbar";
import FormProvider from "./Components/FormContext";

function App() {
  // Importo chiave api google maps
  const apiGoogleMaps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    // Contesto globale dove passo formData ai componenti che hanno bisogno di aggiornare lo stato
    <FormProvider>
      {/* Componente che contiene libreria react-google-maps con la chiave */}
      <APIProvider apiKey={apiGoogleMaps}>
        <div className="bg-light">
          <div id="main-wrapper">
            <Navbar />
            <SubNavbar />
            <Hero />
            <section
              id="main-container"
              className="d-block w-100 m-0 p-0 overflow-hidden position-relative z-index-9"
            >
              <div className="container container-map">
                <div className="row g-0 rounded-3 overflow-hidden bg-white">
                  <div className="col-md-4 bg-white">
                    <div className="p-4">
                      <span className="text-uppercase text-black fs-2 fw-regular-condensed">
                        cerca
                      </span>
                    </div>
                    <hr className="bg-body-secondary m-0 p-0 opacity-100" />
                    <div className="filter-wrapper p-4">
                      {/* Form ricerca centri */}
                      <DataForm />
                    </div>
                  </div>
                  <div className="col-md-8 bg-secondary rounded-3 overflow-hidden">
                    {/* Mappa google maps filtrata*/}
                    <MapComponent />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </APIProvider>
    </FormProvider>
  );
}

export default App;
