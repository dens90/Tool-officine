import React from "react";
import logo from "../assets/img/logo.svg";
const Footer = () => {
  return (
    <footer className="bg-white py-4 border-top">
      <div className="container">
        <div className="row justify-content-evenly align-items-center">
          <div className="col-lg-auto">
            <div className="row g-0 justify-content-between align-items-center">
              <div className="col-auto">
                <div
                  id="foot-logo"
                  className="position-relative overflow-hidden"
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
            </div>
          </div>
          <div className="col-lg-auto mt-3 mt-lg-0">
            <div className="row g-0 align-items-center justify-content-center">
              <div className="col-md-auto text-center">
                <p className="m-0 p-0">
                  <a
                    href="#"
                    className="btn btn-link btn-link-primary no-underline small m-0 p-0 border-0 lh-inherit pe-1"
                    target="_blank"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="btn btn-link btn-link-primary no-underline small m-0 p-0 border-0 lh-inherit pe-1"
                    target="_blank"
                  >
                    Privacy Form
                  </a>
                  <a
                    href="#"
                    className="btn btn-link btn-link-primary no-underline small m-0 p-0 border-0 lh-inherit pe-1"
                    target="_blank"
                  >
                    Cookie Policy
                  </a>
                  <a
                    href="#"
                    className="btn btn-link btn-link-primary no-underline small m-0 p-0 border-0 lh-inherit pe-1"
                    target="_blank"
                  >
                    Note Legali
                  </a>
                  <a
                    href="#"
                    className="btn btn-link btn-link-primary no-underline small m-0 p-0 border-0 lh-inherit pe-4"
                    target="_blank"
                  >
                    Dati societari
                  </a>
                </p>
              </div>
              <div className="col-md-auto text-center">
                <p className="m-0 p-0 small text-body-secondary">
                  Partita I.V.A. IT0000000000000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
