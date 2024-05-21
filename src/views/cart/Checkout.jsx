import React from "react";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

export default function CheckoutView({ shoppingCart, totalCost, discount }) {
  const products = Array.from(shoppingCart.products.values());
  const count = products.reduce((acc, item) => acc + item.count, 0);
  const discountedTotalCost = totalCost - discount;

  const validateName = (event) => {
    const name = event.target.value;
    const regex = /^[a-zA-Z\s]{3,40}$/;
    if (!regex.test(name)) {
      event.target.setCustomValidity(
          "Name should only contain letters and spaces, with a minimum of 3 characters and a maximum of 40 characters."
      );
    } else {
      event.target.setCustomValidity("");
    }
  };


  const validateCardNumber = (event) => {
    const cardNumber = event.target.value;
    const regex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    if (!regex.test(cardNumber)) {
      event.target.setCustomValidity(
          "Card number should be in the format xxxx xxxx xxxx xxxx with numbers only."
      );
    } else {
      event.target.setCustomValidity("");
    }
  };

  const validateExpirationMonth = (event) => {
    const month = event.target.value;
    const regex = /^(0[1-9]|1[0-2])$/;
    if (!regex.test(month)) {
      event.target.setCustomValidity("Expiration month should be a valid two-digit month (01-12).");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const validateExpirationYear = (event) => {
    const year = event.target.value;
    const regex = /^\d{2}$/;
    if (!regex.test(year)) {
      event.target.setCustomValidity("Expiration year should be a valid two-digit year.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const validateCVV = (event) => {
    const cvv = event.target.value;
    const regex = /^\d{3}$/;
    if (!regex.test(cvv)) {
      event.target.setCustomValidity("CVV should be exactly 3 digits.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
      <>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6">Checkout</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-3 border-info">
                <div className="card-header bg-info">
                  <IconCreditCard2Front className="i-va" /> Payment Method
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-3 border-bottom">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            required
                        />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                          <img
                              src="../../images/payment/cards.webp"
                              alt="..."
                              className="ml-3"
                              height={26}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          PayPal
                          <img
                              src="../../images/payment/paypal_64.webp"
                              alt="..."
                              className="ml-3"
                              height={26}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Name on card"
                          required
                          maxLength={40}
                          minLength={3}
                          pattern="[a-zA-Z\s]{3,40}"
                          onInput={validateName}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Card number"
                          required
                          maxLength={19}
                          pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
                          onInput={validateCardNumber}
                      />
                    </div>
                    <div className="col-md-4">
                      <input type="text"
                             className="form-control"
                             placeholder="MM" required
                             maxLength="2"
                             onInput={validateExpirationMonth}
                      />

                    </div>
                    <div className="col-md-4">
                      <input type="text"
                             className="form-control"
                             placeholder="YY"
                             required maxLength="2"
                             onInput={validateExpirationYear}
                      />

                    </div>
                    <div className="col-md-4">
                      <input type="text"
                             className="form-control"
                             placeholder="CVV"
                             required maxLength="3"
                             onInput={validateCVV}/>

                    </div>
                  </div>
                </div>
                <div className="card-footer border-info">
                  <button type="button" className="btn btn-block btn-info">
                    Pay Now <strong>${discountedTotalCost.toFixed(2)}</strong>
                  </button>
                </div>
              </div>
            </div>



            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <IconCart3 className="i-va" /> Cart{" "}
                  <span className="badge bg-secondary float-right">{count}</span>
                </div>
                <ul className="list-group list-group-flush">
                  {products.map((wrapper, index) => (
                      <li
                          key={wrapper.product._id}
                          className="list-group-item d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 className="my-0">{wrapper.product.name}</h6>
                          <small className="text-muted">
                            {wrapper.product.name}
                          </small>
                        </div>
                        <span className="text-muted">
                      ${wrapper.product.price.toFixed(2)}
                    </span>
                      </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                      <h6 className="my-0">Promo code</h6>
                      <small></small>
                    </div>
                    <span className="text-success">−${discount.toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${discountedTotalCost.toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
