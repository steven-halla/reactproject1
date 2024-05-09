import React from "react";
import { Link } from "react-router-dom";
import {categories} from '../utils';

const TopMenu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
        <div className="container-fluid container-custom">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                {categories.map((cat, i) => (
                  <li key={i} className="nav-item">
                    <Link className="nav-link" to={"/category/" + cat}>
                      {cat}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopMenu;
