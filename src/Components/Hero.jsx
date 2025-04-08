import React from "react";

const Hero = () => {
  return (
    <section
      className="intro-banner bg-black m-0 p-0 overflow-hidden position-relative bg-cover z-index-1"
      style={{ backgroundImage: 'url("https://placehold.co/1920x1280")' }}
    >
      <div className="container-fluid position-relative h-100">
        <div className="row align-items-center g-0 position-relative h-100 z-index-2">
          <div className="col-12 text-center">
            <h2 className="m-0 p-0 fw-bold text-white">Ricerca officina</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
