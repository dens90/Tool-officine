import { dataNav } from "../data/ui/navData.ts";


const MobileMenu = () => {
  return (
    <div aria-labelledby="menu-modal" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-body p-0 m-0">
            <div className="m-0 p-0 bg-white">
              <div className="drilldown m-0 p-0">
                <div className="drilldown-container">
                  <ul className="drilldown-root m-0 p-0">
                    <li className="m-0 p-0 border-bottom">   
                      <ul className="drilldown-sub m-0 p-0">
                        {dataNav.map((item, index) => (
                          <>
                            <li key={index}>
                              <h6 className="text-uppercase d-block w-100 m-0 p-0 px-3 py-3 text-montserrat-primary">
                                {item.title}
                              </h6>
                            </li>
                            {item.labels.map((label, indexLabel) => (
                              <li key={index} className="border-bottom">
                                <a
                                  key={indexLabel}
                                  href="#"
                                  className="d-block w-100 m-0 p-0 px-3 py-2 fw-light text-montserrat"
                                  target="_blank"
                                >
                                  {label}
                                </a>
                              </li>
                            ))}
                          </>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
