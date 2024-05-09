import React, { lazy } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
  faHandsWash,
} from "@fortawesome/free-solid-svg-icons";

import {shuffleArray} from '../utils';


const CardFeaturedProduct = lazy(() =>
  import("../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../components/card/CardServices"));
const Details = lazy(() => import("../components/others/Details"));

const QuestionAnswer = lazy(() =>
  import("../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../components/others/ShippingReturns")
);

const addProduct = (shoppingCart, product, updateCount) => {
  //Start here

  //End here

}

const removeProduct = (shoppingCart, product, updateCount) => {
  //Start here

  //End here
}
//for shopping cart getting new coutn of number of products
const getNewCount = (shoppingCart, updateCount) => {
  //Start here

  //End here
}

export default function ProductDetail({allproducts, shoppingCart, updateCount}) {
  const params = useParams();
  const navigation = useNavigate();
  const update = (shoppingCart, product, updateCount) => {
    addProduct(shoppingCart, product, updateCount);
    navigation(`/checkout/`);
  }

  const filtered = allproducts.filter(item => item._id === params.id)[0];
  return (
    <div className="container-fluid mt-3 dic">

      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={'/' + filtered.image}
                className="img-fluid mb-3"
                alt=""
              />

            </div>
            <div className="col-md-6 mt-4 mr-6">
              <h1 className="h5 d-inline mr-2" className="s">{filtered.name}</h1>


              <div className="m-4 ml-5 ">
                <span className="font-weight-bold h2 mr-2" className="s" >${filtered.price}</span>
              </div>


              <div className="mb-3">
                <div className="d-inline float-left mr-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={(e) => removeProduct(shoppingCart, filtered, updateCount)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="1"
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={(e) => addProduct(shoppingCart, filtered, updateCount)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary mr-2"
                  title="Add to cart"
                  style={{ borderBottom: "2px solid black" }}
                  onClick={(e) => addProduct(shoppingCart, filtered, updateCount)}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning mr-2"
                  title="Buy now"
                  style={{ borderBottom: "2px solid black" }}
                  onClick={(event) => update(shoppingCart, filtered, updateCount)}


                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div>
                <p className="font-weight-bolder mb-2 small" className="s">
                  Product Highlights
                </p>
                <ul className="small" className='s'>
                  <li >  Handmade</li>
                  <li>Material: paper,glue</li>
                  <li>
                    {filtered.description}
                  </li>


                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>

                  <a
                    className="nav-link"
                    id="nav-faq-tab"
                    data-toggle="tab"
                    href="#nav-faq"
                    role="tab"
                    aria-controls="nav-faq"
                    aria-selected="false"
                  >
                    Questions and Answers
                  </a>
                  <a
                    className="nav-link"
                    id="nav-ship-returns-tab"
                    data-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Shipping & Returns
                  </a>

                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details />
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-faq"
                  role="tabpanel"
                  aria-labelledby="nav-faq-tab"
                >
                  <dl>
                    {Array.from({ length: 5 }, (_, key) => (
                      <QuestionAnswer key={key} />
                    ))}
                  </dl>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={shuffleArray(allproducts.filter((item, index) => index < 6))} />
          <CardServices />
        </div>
      </div>
    </div>

  );
}
