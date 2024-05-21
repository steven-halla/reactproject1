import React, { useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { shuffleArray } from '../utils';

const CardFeaturedProduct = lazy(() =>
    import("../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../components/card/CardServices"));
const Details = lazy(() => import("../components/others/Details"));
const QuestionAnswer = lazy(() => import("../components/others/QuestionAnswer"));
const ShippingReturns = lazy(() => import("../components/others/ShippingReturns"));

const addProduct = (shoppingCart, product, updateCount) => {
  console.log("Adding product:", product);

  shoppingCart.addProduct(product);

  const addedProduct = shoppingCart.products.get(product._id);
  const newCount = addedProduct.count;
  console.log("Updated shopping cart:", shoppingCart.products);
  console.log("New count for product:", newCount);

  getNewCount(shoppingCart, updateCount); // Update total count
}

const removeProduct = (shoppingCart, product, updateCount) => {
  console.log("Removing product:", product);

  shoppingCart.removeProduct(product._id);

  const remainingProduct = shoppingCart.products.get(product._id);
  const newCount = remainingProduct ? remainingProduct.count : 0;
  console.log("Updated shopping cart:", shoppingCart.products);
  console.log("New count for product:", newCount);

  getNewCount(shoppingCart, updateCount); // Update total count
}

const getNewCount = (shoppingCart, updateCount) => {
  let totalCount = 0;
  shoppingCart.products.forEach(product => {
    totalCount += product.count;
  });
  updateCount(totalCount);
};

export default function ProductDetail({ allproducts, shoppingCart, updateCount }) {
  const params = useParams();
  const navigate = useNavigate();
  const filtered = allproducts.filter(item => item._id === params.id)[0];

  const initialCount = shoppingCart.products.get(filtered._id)?.count || 0;
  const [productCount, setProductCount] = useState(initialCount);

  useEffect(() => {
    setProductCount(shoppingCart.products.get(filtered._id)?.count || 0);
  }, [shoppingCart.products, filtered._id]);

  const handleAddProduct = () => {
    addProduct(shoppingCart, filtered, setProductCount);
  };

  const handleRemoveProduct = () => {
    removeProduct(shoppingCart, filtered, setProductCount);
  };

  const handleUpdate = () => {
    handleAddProduct();
    navigate(`/checkout/`);
  };

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
                <h1 className="h5 d-inline mr-2">{filtered.name}</h1>
                <div className="m-4 ml-5">
                  <span className="font-weight-bold h2 mr-2">${filtered.price}</span>
                </div>
                <div className="mb-3">
                  <div className="d-inline float-left mr-2">
                    <div className="input-group input-group-sm mw-140">
                      <button
                          className="btn btn-primary text-white"
                          type="button"
                          onClick={handleRemoveProduct}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                          type="text"
                          className="form-control"
                          value={productCount}
                          readOnly
                      />
                      <button
                          className="btn btn-primary text-white"
                          type="button"
                          onClick={handleAddProduct}
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
                      onClick={handleAddProduct}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                  <button
                      type="button"
                      className="btn btn-sm btn-warning mr-2"
                      title="Buy now"
                      style={{ borderBottom: "2px solid black" }}
                      onClick={handleUpdate}
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
                  <p className="font-weight-bolder mb-2 small">Product Highlights</p>
                  <ul className="small">
                    <li>Handmade</li>
                    <li>Material: paper, glue</li>
                    <li>{filtered.description}</li>
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
                  ></div>
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
