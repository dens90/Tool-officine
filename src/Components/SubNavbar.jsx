
const SubNavbar = () => {
  return (
    <header
      id="sub-header"
      className="navbar sticky-top bg-white border-bottom m-0 p-0 d-none d-lg-block"
    >
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <nav
              id="secondary-menu-desktop"
              className="m-0 p-0 position-relative"
            >
              <a
                href="#"
                className="small px-1 mx-3 d-inline-block"
              >
                <i className="bi bi-house-fill"></i>
              </a>
              <a
                href="#"
                className="small px-3 mx-3 d-inline-block"
              >
                Trova officina
              </a>
              <a
                href="#"
                className="small px-3 mx-3 d-inline-block"
              >
                My Officina
              </a>
              <a
                href="#"
                className="small px-3 mx-3 d-inline-block"
              >
                Domande frequenti
              </a>
              <div className="small px-2 mx-3 d-inline-block fw-bold active btn-megamenu show-megamenu">
                Bisogno di aiuto?
                <div className="megamenu-content">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <ul className="py-4 px-3 list-group m-0 p-0">
                          <li className="m-0 p-0 py-2">
                            <a
                              href="#"
                              className="fw-regular"
                            >
                              Informazioni su fatture
                            </a>
                          </li>
                          <li className="m-0 p-0 py-2">
                            <a
                              href="#"
                              className="fw-regular"
                            >
                              Modifica dati anagrafica
                            </a>
                          </li>
                          <li className="m-0 p-0 py-2">
                            <a
                              href="#"
                              className="fw-regular"
                            >
                              Restituzione fine noleggio
                            </a>
                          </li>
                          <li className="m-0 p-0 py-2">
                            <a
                              href="#"
                              className="fw-regular"
                            >
                              Segnala un reclamo
                            </a>
                          </li>
                          <li className="m-0 p-0 py-2">
                            <a
                              href="#"
                              className="fw-regular"
                            >
                              Guida alla resistuzione
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubNavbar;
