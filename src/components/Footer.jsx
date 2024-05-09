import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";



import {shuffleArray, categories} from '../utils';

let cat = undefined;
let products = [];
const Footer = ({allproducts, match}) => {
  cat = (match !=undefined && match.params != undefined) ? match.params.cat : "Animal";
  products = allproducts.filter(item => item.category === cat);

  return (
    <>
      <footer>

        <div className="container-fluid bg-dark text-white" >
          <div className="row ">
            <div className="col-md-3 py-3">
              <div className="h6">Quilling Artist</div>
              <hr />
              <p>
              Quilling is the art of rolled, shaped, and glued paper that results in creating a unified, decorative design. The name quilling is thought to come from the origin of the art; birds' feathers, or quills, were used to coil the strips of paper around.
              </p>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Products</div>
              <hr />
              <ul className="list-group list-group-flush">
              {shuffleArray(categories.filter((cat, i) => i < 6)).sort().map((cat, i) => (
                <li key={i} className="list-group-item bg-dark text-white border-light">
                  <Link to={"/category/" + cat}
                    className="text-decoration-none text-white stretched-link"
                  >
                  {cat}
                  </Link>
                </li>
              ))}
                
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Policy</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/return"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Return Policy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/term"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/security"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Security
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/privacy"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/epr"
                    className="text-decoration-none text-white stretched-link"
                  >
                    EPR Compliance
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              
              <div className="h6">Customer Care</div>
              <hr />
              <IconTelephone /> +1800 100 1000
              <br />
              <IconEnvelope /> support@quillingartist.com
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
