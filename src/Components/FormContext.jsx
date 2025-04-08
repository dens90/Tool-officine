import { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    defaultPosition: "Via Cardinal D'Avanzo, 4, 00168 Roma",
    defaultLatitude: "41.92473140000001", //latitudine Roma Via Cardinal D'Avanzo
    defaultLongitude: "12.4143064", //longitudine Roma Via Cardinal D'Avanzo
    position: "",
    targa: "",
    localita: "",
    intervento: "",
    servizio: "",
    latitude: "",
    longitude: "",
    data: [],
    centerPositionMap: false,
    // animation: "drop-initial",
  });

  return (
    // Creo stato globale da passare a tutti i componenti
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext };
export default FormProvider;
