import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import ProductList from "./views/ProductList";
import ProductDetail from "./views/ProductDetail";
import Privacy from "./views/Privacy";
import data from "./views/data";

import ReturnPolicy from "./views/ReturnPolicy";
import TermUse from "./views/TermUse";
import { ShoppingCart } from "./models/Shoppingcart";

import SearchResult from "./views/SearchResult";
import { Security } from "./views/Security";
import EPRCompliance from "./views/EPRCompliance";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '@stripe/react-stripe-js';

const HomeView = lazy(() => import("./views/Home"));

const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));

const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const SupportView = lazy(() => import("./views/pages/Support"));

const products = data.products;

const App = () => {
  const [count, setCount] = useState(0);
  const [shoppingCart, setShoppingCart] = useState(new ShoppingCart(new Map()));
  const [searchData, setSearchData] = useState([]);

  return (

    <BrowserRouter>
      <Header allproducts={products} count={count} setSearchData={setSearchData} />
      <TopMenu />
      <Suspense
        fallback={
          <div className="text-white text-center mt-3">Loading...</div>
        }
      >
        <Routes>
          <Route path="" element={<ProductList allproducts={products} />} />
          <Route path="category/:cat" element={<ProductList allproducts={products} />} />

          <Route path="product/detail/:id" element={<ProductDetail allproducts={products} shoppingCart={shoppingCart} updateCount={setCount} />} />

          <Route path="cart" element={<CartView shoppingCart={shoppingCart} updateCount={setCount} />} />
          <Route path="checkout" element={<CheckoutView shoppingCart={shoppingCart} count={count} />} />

          <Route path="support" element={<SupportView />} />
          <Route path="return" element={<ReturnPolicy />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="term" element={<TermUse />} />
          <Route path="security" element={<Security />} />
          <Route path="epr" element={<EPRCompliance />} />
          <Route path="500" element={<InternalServerErrorView />} />
          <Route path="searchResult" element={<SearchResult allproducts={products} searchData={searchData} />} />
          <Route element={<NotFoundView />} />
        </Routes>
      </Suspense>
      <Footer allproducts={products} />
    </BrowserRouter>

  );
}

export default App;
