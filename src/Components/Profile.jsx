const profile = () => {
  return (
    <div id="profile-dropdown" className="dropdown">
      <a
        className="dropdown-toggle m-0 p-0 border-0"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          id="ico-user"
          data-name="ico-user"
          className="animation"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          preserveAspectRatio="xMinYMin"
        >
          <path d="M9.72,8.65c-2.45,0-4.43-1.94-4.43-4.32S7.28,0,9.72,0s4.43,1.94,4.43,4.32-1.99,4.32-4.43,4.32ZM9.72,1.87c-1.42,0-2.57,1.1-2.57,2.46s1.15,2.46,2.57,2.46,2.57-1.1,2.57-2.46-1.15-2.46-2.57-2.46Z" />
          <path d="M18.42,20h-1.87c0-4.25-2.94-7.72-6.55-7.72s-6.55,3.46-6.55,7.72h-1.87c0-5.28,3.78-9.58,8.42-9.58s8.42,4.3,8.42,9.58Z" />
        </svg>
      </a>
      <ul className="dropdown-menu dropdown-menu-end m-0 p-0 py-4 px-3">
        <li>
          <a
            href="#"
            className="btn btn-primary text-uppercase border-0 d-block m-0 py-3 small"
            role="button"
          >
            Accedi
          </a>
        </li>
        <li className="border-bottom mb-3 pt-3 pb-3 text-center">
          <a
            href="#"
            role="menuitem"
            className="btn btn-link btn-link-primary btn-link-dark-green no-underline m-0 p-0 small"
          >
            Scopri di più su Officine
          </a>
        </li>
        <li>
          <a
            href="#"
            className="btn btn-link btn-link-primary btn-with-icon btn-link-dark-green no-underline m-0 p-0 d-block text-start"
            role="menuitem"
          >
            Richiesta credenziali Officine
            <i className="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default profile;
