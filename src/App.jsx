import React, { Suspense, lazy, useState } from "react";
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
    const [discount, setDiscount] = useState(0);

    const getTotalCost = (shoppingCart) => {
        let totalCost = 0;
        shoppingCart.products.forEach(item => {
            const productCost = item.product.price * item.count;
            totalCost += productCost;
        });
        return totalCost;
    };

    const totalCost = getTotalCost(shoppingCart);

    return (
        <BrowserRouter>
            <Header allproducts={products} count={count} setSearchData={setSearchData} />
            <TopMenu />
            <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
                <Routes>
                    <Route path="" element={<ProductList allproducts={products} />} />
                    <Route path="category/:cat" element={<ProductList allproducts={products} />} />
                    <Route path="product/detail/:id" element={<ProductDetail allproducts={products} shoppingCart={shoppingCart} updateCount={setCount} />} />
                    <Route path="cart" element={<CartView shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} updateCount={setCount} discount={discount} setDiscount={setDiscount} />} />
                    <Route path="checkout" element={<CheckoutView shoppingCart={shoppingCart} totalCost={totalCost} discount={discount} />} />\
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
