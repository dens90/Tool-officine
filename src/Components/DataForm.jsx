import React, { useContext, useState } from "react";
import ResultForm from "./ResultForm";
import Location from "./Location";
import { FormContext } from "./FormContext";

const DataForm = () => {
  const { formData, setFormData } = useContext(FormContext);

  /*  Stato visibilità del form, una volta che la visibilità è false compare <ResultForm /> con i dati passati*/
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [currentSelect, setCurrentSelect] = useState("");

  const selectIntervento = {
    Pneumatici: [["Pneumatici", "PPR"]],
    Manutenzione: [
      ["Tagliando", "M"],
      ["Rabbocchi", "M"],
      ["Lampadine", "M"],
      ["Pastiglie Freni", "M"],
      ["Tergicristallo", "M"],
    ],
    Revisione: [["Revisione", "RE"]],
    Guasto: [["Guasto", "G"]],
    Carrozzeria: [
      ["Riparazione Carrozzeria", "S"],
      ["Grandine", "GRA"],
    ],
    Cristalli: [["Cristalli", "CR"]],
  };

  // Gestisce il cambiamento della categoria di intervento selezionata
  const handleSelectChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCurrentSelect(value);

    setFormData({
      ...formData,
      // Reset dell'intervento quando cambia la categoria
      intervento: [e.target.value],
    });
  };
  //Gestisce i campi name e value per la targa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Gestisce la località selezionata del componente Location aggiornando il campo località
  const handlePlaceSelect = (place) => {
    const address = place.formatted_address || place.name; // Usa l'indirizzo formattato o il nome del luogo
    const lat = place.geometry?.location.lat();
    const lng = place.geometry.location.lng();
    setFormData({
      ...formData,
      localita: address,
      latitude: lat || "",
      longitude: lng || "",
    });
  };

  //Cambia lo stato del form al submit disattivando form iniziale, attivando layout form con i dati presi dalla prima form
  const sendDataForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsFormVisible(!isFormVisible);
  };
  
  return (
    /* Form che filtra targa, categoria, intervento da effettuare e veicolo presente nell'api di delle officine e fa visualizzare i centri sulla mappa */
    isFormVisible ? (
      <>
        <form onSubmit={sendDataForm} className="d-block w-100 m-0 p-0">
          <div className="mb-4">
            <label
              htmlFor="form-targa"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Targa
            </label>
            <input
              type="text"
              className="form-control m-0 p-0 p-2"
              id="targa"
              name="targa"
              value={formData.targa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="form-localita"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Località
            </label>
            <Location onPlaceSelect={handlePlaceSelect} />
          </div>
          <div className="mb-4">
            <label
              htmlFor="form-intervento"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Intervento
            </label>
            <select
              id="form-intervento"
              className="form-select m-0 p-0 p-2"
              aria-label="Default select example"
              onChange={handleSelectChange}
              required
            >
              <option value="">Seleziona una categoria</option>

              {Object.keys(selectIntervento).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div id="section-intervento-default" className="mb-4">
            <label
              htmlFor="form-intervento-default"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Servizio
            </label>
            <select
              id="form-intervento-default"
              className="form-select m-0 p-0 p-2"
              aria-label="Default select example"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  servizio: [e.target.value], // Imposta l'intervento selezionato
                })
              }
              required
            >
              <option defaultValue={"Seleziona un servizio"}>
                Seleziona un servizio
              </option>

              {currentSelect &&
                selectIntervento[currentSelect]?.map((servizio, i) => (
                  <option key={i} value={servizio[1]}>
                    {servizio[0]}
                  </option>
                ))}
            </select>
          </div>
          <div id="section-intervento-pneumatici" className="mb-4 d-none">
            <label
              htmlFor="form-intervento-pneumatici"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Servizio
            </label>
            <select
              id="form-intervento-pneumatici"
              className="form-select m-0 p-0 p-2"
              aria-label="Default select example"
            >
              <option defaultValue="pneumatici-tagliando">
                Sostituzione Pneumatici
              </option>
            </select>
          </div>
          <div id="section-intervento-manutenzione" className="mb-4 d-none">
            <label
              htmlFor="form-intervento-manutenzione"
              className="form-label m-0 p-0 mb-2 text-uppercase"
            >
              Servizi di Manutenzione
            </label>
            <select
              id="form-intervento-manutenzione"
              className="form-select m-0 p-0 p-2"
              aria-label="Default select example"
            >
              <option defaultValue={"Seleziona una categoria"}></option>
              <option value="manutenzione-tagliando">Tagliando</option>
              <option value="manutenzione-rabbocchi">Rabbocchi</option>
              <option value="manutenzione-lampadine">Lampadine</option>
              <option value="manutenzione-freni">Pastiglie freni</option>
              <option value="manutenzione-tergicristallo">
                Tergicristallo
              </option>
            </select>
          </div>
          <div className="row pt-3 gx-3">
            <div className="col-md-auto">
              <a className="btn btn-light fs-6 border-0" href="#" role="button">
                <i className="bi bi-arrow-clockwise"></i>
              </a>
            </div>
            <div className="col">
              <button
                type="submit"
                className="btn btn-primary d-block w-100 fs-6 border-0 text-uppercase fw-bold"
              >
                Trova il centro
              </button>
            </div>
          </div>
        </form>
      </>
    ) : (
      <ResultForm
        targa={formData.targa}
        localita={
          formData.localita === null
            ? formData.defaultPosition
            : formData.localita
        }
        // Mando a schermo l'intervento (2° elemento dell'array salvato all'onchange nella select "Servizio")
        intervento={formData.intervento}
        servizio={formData.servizio}
        latitude={formData.latitude}
        longitude={formData.longitude}
        visible={setIsFormVisible}
      />
    )
  );
};

export default DataForm;
