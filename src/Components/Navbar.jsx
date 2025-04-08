import logo from "../assets/img/logo.svg";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <header
      id="top-header"
      className="bg-white border-bottom py-3 position-relative z-index-9999"
    >
      <div className="container">
        <div className="row align-items-center g-0">
          <div className="col-auto d-lg-none">
            <a
              id="btn-offcanvas"
              className="m-0 p-0 btn btn-outline-primary rounded-1"
              data-bs-toggle="modal"
              data-bs-target="#menu-modal"
            >
              <span id="menu-icon" className="bi bi-list"></span>
            </a>
          </div>
          <div className="col col-lg-auto">
            <div
              id="head-logo"
              className="position-relative overflow-hidden mx-auto"
            >
              <a
                href="#"
                className="d-block position-absolute start-0 end-0 top-0 bottom-0 z-index-1 animsition-link text-indent"
              >
                link to homepage
              </a>
              <div className="svg-container">
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
          <div className="col primary-menu-col">
            <nav
              id="primary-menu-desktop"
              className="navbar navbar-expand d-none d-lg-block"
            >
              <div className="navbar-collapse justify-content-center">
                <ul className="navbar-nav w-100 d-flex justify-content-between px-2 px-xxl-4">
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link"
                      href="#"
                    >
                      Noleggio Business
                    </a>
                  </li>
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link"
                      href="#"
                    >
                      Noleggio Privati
                    </a>
                  </li>
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link"
                      href="#"
                    >
                      Soluzioni di mobilità
                    </a>
                  </li>
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link"
                      href="#"
                    >
                      Soluzioni per l’usato
                    </a>
                  </li>
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link active"
                      href="#"
                    >
                      Assistenza Clienti
                    </a>
                  </li>
                  <li className="nav-item m-0 p-0 flex-grow-1 text-center">
                    <a
                      className="nav-link"
                      href="#"
                    >
                      Officina 
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-auto">
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
