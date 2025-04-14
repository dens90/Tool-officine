
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";

import SubNavbar from "./Components/SubNavbar";


function App() {
  // Importo chiave api google maps
  const apiGoogleMaps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
  
        <div className="bg-light">
          <div id="main-wrapper">
            <Navbar />
            <SubNavbar />
            <Hero />
           </div>
        </div>

  );
}

export default App;
