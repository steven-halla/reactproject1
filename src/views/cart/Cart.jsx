import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCart } from "../../models/Shoppingcart";

const CouponApplyForm = lazy(() =>
    import("../../components/others/CouponApplyForm")
);

const discountAmount = 1;

const onSubmitApplyCouponCode = (values, dispatch, setDiscount) => {
  const { coupon } = values;

  if (coupon && coupon.trim() !== "") {
    alert("Coupon applied! You get a $1 discount.");
    setDiscount(discountAmount);
  } else {
    alert("Invalid coupon code. Please try again.");
  }
};

const removeProduct = (shoppingCart, shoppingCartProduct, setShoppingCart, updateCount) => {
  console.log("Remove product pushed");

  const updatedCart = new ShoppingCart(new Map(shoppingCart.products));
  console.log("Cloned shopping cart:", updatedCart);

  const cartProduct = updatedCart.products.get(shoppingCartProduct.product._id);

  if (cartProduct) {
    cartProduct.count -= 1;
    console.log("Decremented count for product:", cartProduct);

    if (cartProduct.count <= 0) {
      updatedCart.products.delete(shoppingCartProduct.product._id);
      console.log("Removed product from cart:", shoppingCartProduct.product);
    }
  }

  setShoppingCart(updatedCart);
  console.log("Updated shopping cart state:", updatedCart);

  let totalCount = 0;
  updatedCart.products.forEach(item => {
    totalCount += item.count;
  });
  console.log("New total count: ", totalCount);
  updateCount(totalCount);
};

const addProduct = (shoppingCart, shoppingCartProduct, setShoppingCart, updateCount) => {
  console.log("Add product pushed");

  const updatedCart = new ShoppingCart(new Map(shoppingCart.products));
  console.log("Cloned shopping cart:", updatedCart);

  const cartProduct = updatedCart.products.get(shoppingCartProduct.product._id);

  if (cartProduct) {
    cartProduct.count += 1;
    console.log("Incremented count for product:", cartProduct);
  } else {
    updatedCart.products.set(shoppingCartProduct.product._id, {
      product: shoppingCartProduct.product,
      count: 1,
    });
    console.log("Added new product to cart:", shoppingCartProduct.product);
  }

  setShoppingCart(updatedCart);
  console.log("Updated shopping cart state:", updatedCart);

  let totalCount = 0;
  updatedCart.products.forEach(item => {
    totalCount += item.count;
  });
  console.log("New total count: ", totalCount);
  updateCount(totalCount);
};

const removeAllProduct = (shoppingCart, shoppingCartProduct, setShoppingCart, updateCount) => {
  console.log("Remove all product pushed");

  const updatedCart = new ShoppingCart(new Map(shoppingCart.products));
  console.log("Cloned shopping cart:", updatedCart);

  updatedCart.products.delete(shoppingCartProduct.product._id);
  console.log("Removed product from cart:", shoppingCartProduct.product);

  setShoppingCart(updatedCart);
  console.log("Updated shopping cart state:", updatedCart);

  let totalCount = 0;
  updatedCart.products.forEach(item => {
    totalCount += item.count;
  });
  console.log("New total count: ", totalCount);
  updateCount(totalCount);
};

const getTotalCost = (shoppingCart) => {
  console.log("get total cost pushed");

  let totalCost = 0;

  shoppingCart.products.forEach(item => {
    const productCost = item.product.price * item.count;
    totalCost += productCost;
  });

  console.log("Total cost calculated:", totalCost);
  return totalCost;
};

const ProductList = ({ shoppingCart, setShoppingCart, updateCount }) => {
  const products = Array.from(shoppingCart.products.values());

  const handleRemoveAllProduct = (product) => {
    removeAllProduct(shoppingCart, { product }, setShoppingCart, updateCount);
  };

  return (
      <>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead className="text-muted">
              <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" width={120}>Quantity</th>
                <th scope="col" width={150}>Price</th>
                <th scope="col" className="text-right" width={130}></th>
              </tr>
              </thead>
              <tbody>
              {products.map((wrapper, index) => (
                  <tr key={wrapper.product._id}>
                    <td>
                      <div className="row">
                        <div className="col-3 d-none d-md-block">
                          <img src={"../../" + wrapper.product.image} width="80" alt="..." />
                        </div>
                        <div className="col">
                          <Link to="/product/detail" className="text-decoration-none">
                            {wrapper.product.name}
                          </Link>
                          <p className="small text-muted">{wrapper.product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="input-group input-group-sm mw-140">
                        <button
                            className="btn btn-primary text-white"
                            type="button"
                            onClick={() => removeProduct(shoppingCart, wrapper, setShoppingCart, updateCount)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input
                            type="text"
                            className="form-control"
                            value={wrapper.count}
                            readOnly
                        />
                        <button
                            className="btn btn-primary text-white"
                            type="button"
                            onClick={() => addProduct(shoppingCart, wrapper, setShoppingCart, updateCount)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <var className="price">${(wrapper.product.price * wrapper.count).toFixed(2)}</var>
                      <small className="d-block text-muted">${wrapper.product.price} each</small>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-sm btn-outline-secondary mr-2">
                        <IconHeartFill className="i-va" />
                      </button>
                      <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveAllProduct(wrapper.product)}
                      >
                        <IconTrash className="i-va" />
                      </button>
                    </td>
                  </tr>
              ))}
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
};

export default function CartView({ shoppingCart, setShoppingCart, updateCount, discount, setDiscount }) {
  const totalCost = getTotalCost(shoppingCart);
  const discountedTotal = totalCost - discount;

  const handleCouponSubmit = (values, dispatch) => {
    const { coupon } = values;

    if (coupon && coupon.trim() !== "") {
      alert("Coupon applied! You get a $1 discount.");
      setDiscount(1);
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  };

  return (
      <>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6">Shopping Cart</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-9">
              <ProductList shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} updateCount={updateCount} />
              <div className="alert alert-success mt-3">
                <p className="m-0">
                  <IconTruck className="i-va mr-2" /> Free Delivery within 1-2 weeks
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <CouponApplyForm onSubmit={handleCouponSubmit} />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="row border-bottom">
                    <dt className="col-6">Total price:</dt>
                    <dd className="col-6 text-right">${totalCost.toFixed(2)}</dd>

                    <dt className="col-6 text-success">Discount:</dt>
                    <dd className="col-6 text-success text-right">-${discount.toFixed(2)}</dd>
                    <dt className="col-6 text-success">Coupon:</dt>
                    <dd className="col-6 text-success text-right">-$1.00</dd>
                  </dl>
                  <dl className="row">
                    <dt className="col-6">Total:</dt>
                    <dd className="col-6 text-right h5">
                      <strong>${discountedTotal.toFixed(2)}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center">
                    <img src="../../images/payment/payments.webp" alt="..." height={26} />
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
