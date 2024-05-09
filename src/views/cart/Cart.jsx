import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const onSubmitApplyCouponCode = async values => {
  alert(JSON.stringify(values));
};

const addProduct = (shoppingCart, shoppingCartproduct, updateCount) => {
  //Start here

  //End here
}

const removeProduct = (shoppingCart, shoppingCartproduct, updateCount) => {
  //Start here

  //End here
}

const removeAllProduct = (shoppingCart, shoppingCartproduct, updateCount) => {
  //Start here

  //End here
}

const getNewCount = (shoppingCart, updateCount) => {
  //Start here

  //End here
}

const getTotalCost = (shoppingCart) => {
  //Start here

  //End here
}

const ProductList = ({shoppingCart, updateCount}) => {
  const products = Array.from(shoppingCart.products.values());
  return (
    <>
      <div className="card" >
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead className="text-muted">
              <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" width={120}>
                  Quantity
                </th>
                <th scope="col" width={150}>
                  Price
                </th>
                <th scope="col" className="text-right" width={130}></th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((wrapper, index) => (
                  
                  <tr key={wrapper.product._id}>
                    <td>
                      <div className="row">
                        <div className="col-3 d-none d-md-block">
                          <img
                            src={"../../" + wrapper.product.image}
                            width="80"
                            alt="..."
                          />
                        </div>
                        <div className="col">
                          <Link
                            to="/product/detail"
                            className="text-decoration-none"
                          >
                            {wrapper.product.name}
                          </Link>
                          <p className="small text-muted">
                            {wrapper.product.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group input-group-sm mw-140">
                        <button
                          className="btn btn-primary text-white"
                          type="button"
                          onClick={(e) => removeProduct(shoppingCart, wrapper, updateCount)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={wrapper.count}
                        />
                        <button
                          className="btn btn-primary text-white"
                          type="button"
                          onClick={(e) => addProduct(shoppingCart, wrapper, updateCount)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <var className="price">${(wrapper.product.price * wrapper.count).toFixed(2)}</var>
                      <small className="d-block text-muted">
                        ${wrapper.product.price} each
                      </small>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-sm btn-outline-secondary mr-2">
                        <IconHeartFill className="i-va" />
                      </button>
                      <button className="btn btn-sm btn-outline-danger"
                        onClick={(e) => removeAllProduct(shoppingCart, wrapper, updateCount)}
                      >

                        <IconTrash className="i-va" />
                      </button>
                    </td>
                  </tr>

                ))
              }
              
              
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link to="/checkout" className="btn btn-primary float-right">
            Make Purchase <IconChevronRight className="i-va" />
          </Link>
          <Link to="/" className="btn btn-secondary">
            <IconChevronLeft className="i-va" /> Continue shopping
          </Link>
        </div>
      </div>
    </>
  );
}

export default function CartView({ shoppingCart, updateCount }) {
  return (
    <>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <ProductList shoppingCart={shoppingCart} updateCount={updateCount}  />
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va mr-2" /> Free Delivery within 1-2
                weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-right">${ getTotalCost(shoppingCart) }</dd>

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-right">-$0.00</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted"></span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-right">-$0.00</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-right  h5">
                    <strong>${ getTotalCost(shoppingCart) }</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
}
