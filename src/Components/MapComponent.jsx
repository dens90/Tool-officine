import { useContext, useEffect, useState } from "react";
import {
  AdvancedMarker,
  Map,
  MapControl,
  Pin,
} from "@vis.gl/react-google-maps";
import { FormContext } from "./FormContext";


import { useMemo } from "react";

const MapComponent = () => {
  const { formData, setFormData } = useContext(FormContext);
  // const [initialLoad, setInitialLoad] = useState(true);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: Number(formData.latitude) || Number(formData.defaultLatitude),
    lng: Number(formData.longitude) || Number(formData.defaultLongitude),
  });

  //Posizione esatta della localizzazione
  const userLocalizationMarker = {
    lat: Number(formData.latitude),
    lng: Number(formData.longitude),
  };

  //Gestisco click su marker
  const handleMarkerClick = (center) => {
    setClickedMarker(center.id);
    setFormData((prevData) => ({
      ...prevData,
      centerId: center.id,
      highlight: true,
      animation: "",
    }));
  };

  //Controllo stato movimento mappa
  const [mapMove, setMapMove] = useState(false);

  //Prendo valori api formData.data
  const poiList = useMemo(() => formData?.centers || [], [formData]);

  const stylePin = {
    scale: 1.5,
    animationName: "bounce",
    animationDuration: "1000ms",
    animationIterationCount: 1,
  };

  //setMapCenter aggiorna i valori di formData che vengono poi presi da centerPosition
  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setMapCenter({
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      });
      setMapMove(false);
    }
  }, [formData.latitude, formData.longitude]);

  useEffect(() => {
    if (formData.mapCenter) {
      setMapCenter(formData.mapCenter); // Centra la mappa sul nuovo centro
      setMapMove(false);
    }
  }, [formData.mapCenter]);

  //Imposto possibilità di muovere la mappa
  const handleDragMap = () => setMapMove(true);

  return (
    <Map
      //inserisci il nome della tua chiave
      key=""
      //inserisci il numero del tuo mapId
      mapId=""
      defaultCenter={mapCenter} // Posizione centrale della mappa basata su formData.position
      defaultZoom={8}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      center={!mapMove ? mapCenter : undefined} // Uso la posizione basata su formData.position
      onDrag={handleDragMap}
      cameraControl={true}
    >
      <MapControl position={10} />

      <AdvancedMarker position={userLocalizationMarker} />

      {poiList.map((center, index) => (
        <AdvancedMarker
          key={index}
          title={center.name}
          position={{ lat: Number(center.lat), lng: Number(center.lon) }}
          onClick={() => handleMarkerClick(center)}
          // className="drop"
          className={`${center ? formData?.animation : ""} ${
            formData.centerId === center.id ? "bounce" : ""
          }`}
          style={
            formData.centerId === center.id && formData.highlight
              ? stylePin
              : {}
          }
        >
          <Pin
            background={"#007bff"}
            borderColor={"#fff"}
            glyphColor={"#fff"}
            scale={
              formData.centerId === center.id && formData.highlight
                ? stylePin.scale
                : 1
            }

          >
            {/* Decommentare codice sotto per ottenere info nella mappa */}
            {clickedMarker === center.id && (
              <div
              // style={{
              //   position: "absolute",
              //   top: "50px",
              //   left: "-50px",
              //   width: "200px",
              //   padding: "10px",
              //   backgroundColor: "#fff",
              //   color: "#000",
              //   borderRadius: "5px",
              //   textAlign: "center",
              // }}
              >
                {/* <h4>{center.name}</h4>
                <p>{center.addr}</p>
                <p>{center.email}</p>
                <p>{center.tel}</p>
                <p>{center.distanzaId}</p> */}
              </div>
            )}
          </Pin>
        </AdvancedMarker>
      ))}
    </Map>
  );
};

export default MapComponent;
