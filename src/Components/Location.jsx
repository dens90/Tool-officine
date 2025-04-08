import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
// UseMapsLibrary: Hook specifico per le librerie google map come geocoder o places
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormContext } from "./FormContext";

const Location = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  const geocoding = useMapsLibrary("geocoding");
  const { formData, setFormData } = useContext(FormContext);
  //UseMemo crea un'istanza Geocoder quando la libreria geocoding è pronta.
  const geocoder = useMemo(
    () => geocoding && new geocoding.Geocoder(),
    [geocoding]
  );

  //Imposto posizione di default se non sono localizzato
  const defaultAddress = formData.defaultPosition;

  //Se non ho la posizione dell'utente
  useEffect(() => {
    if (!geocoder || !navigator.geolocation) {
      setAddress(defaultAddress); // Usa l'indirizzo di default se il geocoder o la geolocalizzazione non sono disponibili
      return;
    }
    //Traccio la posizione dell'utente andando a prendere le coordinate e lo trasformo in indirizzo
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        geocoder.geocode(
          {
            location: { lat: latitude, lng: longitude },
          },

          (results, status) => {
            if (status === "OK" && results.length > 0) {
              setAddress(results[0].formatted_address);
              // Aggiorno l'indirizzo con quello corretto
            } else {
              console.error("Geocoding fallito: ", status);
              setAddress(defaultAddress);
            }
          },
          setFormData((prevdata) => ({
            ...prevdata,
            latitude: latitude,
            longitude: longitude,
            centerPositionMap: true, //Aggiorno posizione della mappa in base alla località scelta
          }))
        );
      },
      (error) => console.error("Errore nella geolocalizzazione:", error)
    );
  }, [geocoder]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      componentRestrictions: { country: "it" }, //Limito la ricerca solo all'italia
      fields: ["geometry", "name", "formatted_address"], // Recupera questi campi
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options)); // Collega l'input all'autocompletamento
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace()); // Chiama la callback con il luogo selezionato
    });
  }, [onPlaceSelect, placeAutocomplete]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      localita: address,
    }));
  }, [address]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="form-control m-0 p-0 p-2"
        name="localita"
        id="localita"
        ref={inputRef} // Collega l'input a inputRef
        defaultValue={address} // Visualizza l'indirizzo nell'input
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
};

export default Location;
