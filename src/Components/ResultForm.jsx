import  { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import centerPin from "../assets/img/pin-numeri/pin-base.png";
import useFetch from "./useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { FormContext } from "./FormContext";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const ResultForm = ({
  handleSubmitForm,
  targa,
  servizio,
  longitude,
  latitude,
  visible,
}) => {
  const { formData, setFormData } = useContext(FormContext);

  const { clientApi } = useFetch(
    `${import.meta.env.VITE_URL_CLIENT_API}?plate=${targa}&evento=${
      servizio[0]
    }&lat=${latitude || formData.defaultLatitude}&lon=${
      longitude || formData.defaultLongitude
    }`
  );

  //Stato per le distanze di ogni centro
  const [filteredCenterValues, setFilteredCenterValues] = useState([]);

  const userPosition = {
    lat: Number(formData.latitude),
    lng: Number(formData.longitude),
  };
  // @to do Calcolare distanza da posizione utente a officina
  const distance = useMapsLibrary("geometry");

  //Funzione per calcolare la distanza in metri dal punto a(userPosition) al punto b(centerPosition)
  const calculateCenterDistance = (userPosition, centerPosition) => {
    if (distance && distance.spherical)
      return distance.spherical
        .computeDistanceBetween(userPosition, centerPosition)
        .toFixed(2);
  };

  /*Filtro i dati ricevuti dal fetch e li salvo su poiList */
  const poiList = useMemo(() => formData?.data.poiList || [], [formData.data]);

  /*  Salvo dati api dentro stato globale formData.data */
  const setDataApi = () => {
    if (clientApi && clientApi.poiList) {
      setFormData((prevData) => ({
        ...prevData,
        data: clientApi,
      }));
    }
  };
  const styleCard = {
    backgroundColor: "#e6f0e9",
  };
  //FUNZIONE DA RIVEDERE
  // const changeStyle = () => setActiveStyleCard(!activeStyleCard);
  const [selected, setSelected] = useState({ color: "" });

  /*Richiamo i dati a componente montato */
  useEffect(() => {
    if (clientApi && clientApi.poiList) {
      setDataApi();
    }
    setSelected(() => ({ color: "#007bff" }));
  }, [clientApi]);


  /* Filtro centri per tipologia convenzione */
  const centroConvenzionato = (stringa) => {
    const convention = stringa.replaceAll(";", ",").split(",");
    const result = convention
      .filter((item) => item === " CENTER" || item === " PREMIUM CENTER")
      .map((item) => item.trim())
      .toString();
    return result;
  };

  // function centroDedicato(field) {
  //   let value = "";
  //   if (field.trim() === "blu") {
  //     value = " DEDICATO";
  //   }
  //   return value;
  // }

  const handleCenterClick = (center) => {
    setFormData((prevData) => ({
      ...prevData,
      highlight: true,
      centerId: center.id,
      mapCenter: { lat: Number(center.lat), lng: Number(center.lon) }, // Aggiorna il centro della mappa
    }));
  };

  const resetForm = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      targa: "",
      localita: "",
    }));
    visible((prevVisible) => !prevVisible);
  };

  const editForm = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      targa: formData.targa,
      localita: formData.localita,
      intervento: formData.intervento[0],
      servizio: formData.servizio[0],
    }));
    visible((prevVisible) => !prevVisible);
  };
  /* Aggiorno stato inserendo la distanza del centro dalla posizione dell'utente */
  useEffect(() => {
    //Salvo in un array tutte le distanze dalla posizione utente filtrandole in ordine di grandezza
    const distanzaIndex = filteredCenterValues
      ?.map((center) => center.distanza)
      .sort((a, b) => a - b);
    setFilteredCenterValues(
      () =>
        clientApi &&
        clientApi.poiList &&
        clientApi.poiList
          .filter(
            ({
              name = "",
              addr = "",
              city = "test",
              email = "",
              tel = "",
              rank = 0,
              lat = 0,
              lon = 0,
              color = "",
              convenzione = "",
            }) => {
              return (
                name, addr, city, email, tel, rank, lat, lon, color, convenzione
              );
            }
          )
          .map(
            (
              {
                name = "",
                addr = "",
                city = "test",
                email = "",
                tel = "",
                rank = 0,
                lat = 0,
                lon = 0,
                color = "",
                convenzione = "",
              },
              index
            ) => ({
              id: index,
              name,
              addr,
              city,
              email,
              tel,
              rank,
              lat,
              lon,
              color,
              convenzione:
                centroConvenzionato(convenzione) || "AGREED CENTER",
              //Salvo distanza di ogni centro dalla posizione dell'utente
              distanza: calculateCenterDistance(userPosition, {
                lat: Number(lat),
                lng: Number(lon),
              }),
              //Salvo index in base alla distanza
              distanzaId:
                distanzaIndex &&
                distanzaIndex.indexOf(
                  calculateCenterDistance(userPosition, {
                    lat: Number(lat),
                    lng: Number(lon),
                  })
                ) + 1,
            })
          )
    );
  }, [clientApi]);
  /*___________________________________________________________ */

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      centers: filteredCenterValues && filteredCenterValues,
    }));
  }, [filteredCenterValues]);

  //Filtro centri in base al Rank sul tag <a> Distanza
  const filterCenterForDistance = (e) => {
    e.preventDefault();
    // filtro array clonando l'array(...) e confrontando gli oggetti all'interno
    const sortedCenters = [...filteredCenterValues].sort((a, b) => {
      return Number(a.distanza) - Number(b.distanza);
    });

    setFilteredCenterValues(sortedCenters);
  };

  //Filtro centri in base al Rank sul tag a Suggeriti
  const filterCenterForRank = (e) => {
    e.preventDefault();
    // filtro array clonando l'array(...) e confrontando gli oggetti all'interno
    const sortedCenters = [...filteredCenterValues].sort((a, b) => {
      return Number(b.rank) - Number(a.rank);
    });

    setFilteredCenterValues(sortedCenters);
  };

  if (!filteredCenterValues) {
    return <Loading />;
  }

  if (!filteredCenterValues) {
    return <Error />;
  }

  return (
    <div className="d-block w-100 m-0 p-0">
      <div className="col-12 d-md-none">
        <div className="p-4 border-bottom">
          <span className="text-uppercase text-black fs-2 fw-regular-condensed d-block mb-2">
            <span className="fw-bold-condensed">
              {filteredCenterValues.length + " "}
              {/* CELLULARE */}
            </span>
            RISULTATI
          </span>
          <div className="row">
            <div className="col d-flex gap-2">
              <a
                href="/"
                onClick={resetForm}
                className="btn btn-primary d-block w-100 fs-6 border-0 text-uppercase fw-bold"
              >
                Nuova Ricerca
              </a>
              <a
                href="/"
                onClick={editForm}
                className="btn btn-primary d-block w-100 fs-6 border-0 text-uppercase fw-bold"
              >
                Modifica Ricerca
              </a>
            </div>
          </div>

          <p className="search-info m-0 p-0 mt-3 small text-body-tertiary small">
            {servizio} - {formData.localita}
          </p>
          <p className="search-info m-0 p-0 mt-1">
            Ordina per:{" "}
            <a
              style={selected}
              href="#"
              className="select-filter ms-2"
              onClick={filterCenterForRank}
            >
              Suggeriti
            </a>{" "}
            <a
              href="#"
              className="select-filter ms-2"
              onClick={(e) => {
                filterCenterForDistance(e);
                setSelected({ color: "" });
              }}
            >
              Distanza
            </a>
          </p>
        </div>
      </div>
      {/*FINE CELLULARE */}

      {/* INZIO DESKTOP */}
      <div id="result-header" className="d-none d-md-block">
        <div className="p-4 border-bottom">
          <span className="text-uppercase text-black fs-2 fw-regular-condensed d-block mb-2">
            <span className="fw-bold-condensed">
              {filteredCenterValues.length}
            </span>{" "}
            RISULTATI
          </span>
          <div className="row">
            <div className="col d-flex gap-2">
              <a
                href="#"
                onClick={resetForm}
                className="btn btn-primary d-block d-flex align-items-center justify-content-center w-100 fs-6 border-0 text-uppercase fw-bold"
              >
                Nuova Ricerca
              </a>
              <a
                href="#"
                onClick={editForm}
                className="btn btn-primary d-block w-100 fs-6 border-0 text-uppercase fw-bold"
              >
                Modifica Ricerca
              </a>
            </div>
          </div>

          <p className="search-info m-0 p-0 mt-3 small text-body-tertiary small fw-bold">
            {servizio} - {formData.localita}
          </p>
          <p className="search-info m-0 p-0 mt-1 fw-bold">
            Ordina per:{" "}
            <a
              href="#"
              style={selected}
              className="select-filter ms-2"
              onClick={filterCenterForRank}
            >
              Suggeriti
            </a>{" "}
            <a
              href="#"
              className="select-filter ms-2"
              onClick={(e) => {
                filterCenterForDistance(e);
                setSelected({ color: "" });
              }}
            >
              Distanza
            </a>
          </p>
        </div>
      </div>
      <div id="result-wrapper">
        <div className="result-wrapper-scroller">
          <div className="card card-risultati rounded-0 m-0 p-0 border border-end-0 border-start-0 border-top-0">
            {/* Stampo centri */}
            {filteredCenterValues?.map((center) => (
              <div role="button" key={center.id} className="card-body p-4">
                <div
                  style={
                    //Se il centro è selezionato e ha lo stile attivo
                    center.id === formData?.centerId && formData?.highlight
                      ? styleCard
                      : {}
                  }
                  className="row"
                  onClick={() => handleCenterClick(center)}
                >
                  <div className="col">
                    {center.distanzaId &&
                      (Number(center.distanzaId) / 1000).toFixed(2) && (
                        <>
                          {/* <p className="center-type text-uppercase text-montserrat-primary m-0 p-0 small-80"> */}
                          <p className="d-inline-block border border-success center-type text-uppercase text-montserrat-primary m-0 pe-2 bg-primary rounded-4 small-80">
                            <span className="text-montserrat-primary p-2 small-80 bg-white rounded-circle">
                              {center.distanzaId}
                            </span>

                            {/* @to do centro dedicato */}
                            <span className="center-type text-uppercase text-montserrat-primary text-white m-0 p-0 small-80">
                              {" "}
                              {center.convenzione}{" "}
                              {center.color &&
                                center.color.trim() == "blu" &&
                                "DEDICATO"}
                            </span>
                          </p>
                          <span className="text-secondary text-uppercase text-montserrat-primary m-0 p-0 small-80">
                            {" "}
                            <i className="bi bi-geo-alt-fill"></i>{" "}
                            {(center.distanza / 1000).toFixed(2)} KM
                          </span>
                        </>
                      )}
                    <h5 className="center-name m-0 p-0 fw-bold mt-1 text-uppercase text-montserrat">
                      {center.name}
                    </h5>
                  </div>
                  <div className="col-auto d-flex justify-content-center align-items-center">
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center m-0 p-0"
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src={centerPin}
                        className="ico-centro-type animation w-100 d-flex justify-content-center align-items-center"
                      />
                      <span
                        className="position-absolute text-center text-white"
                        style={{
                          top: "7px",
                          fontSize: ".8rem",
                        }}
                      >
                        {/* Inserire icona stella? */}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="center-address fw-regular text-secondary m-0 p-0 mt-2">
                        {center.addr} - {center.city}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <a
                        href={`tel:${center.tel}`}
                        target="_blank"
                        className="btn small text-montserrat-primary px-0"
                      >
                        <i className="bi bi-telephone float-start"></i>
                        &nbsp; {center.tel}
                      </a>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <a
                        href={`mailto:${center.email}`}
                        target="_blank"
                        className="btn small text-montserrat-primary px-0"
                      >
                        <i className="bi bi-envelope float-start"></i>
                        &nbsp; {center.email}
                      </a>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <a
                        // Esteticamente di Elisa Spezzigu & Gaia Gattini Snc, 1, Via I Maggio, Ancona, AN 60131
                        href={`https://maps.google.com/maps?saddr=${formData.latitude},${formData.longitude}&daddr=${center.lat},${center.lon}`}
                        target="_blank"
                        className="btn small text-montserrat-primary px-0"
                      >
                        <i className="bi bi-sign-merge-left float-start"></i>
                        &nbsp; itinerario
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
ResultForm.propTypes = {
  handleSubmitForm: PropTypes.func,
  targa: PropTypes.string.isRequired,
  localita: PropTypes.string.isRequired,
  servizio: PropTypes.array.isRequired,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  visible: PropTypes.func.isRequired,
};

export default ResultForm;
