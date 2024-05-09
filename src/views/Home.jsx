import React from "react";
import ProductList from "./ProductList";

export default function HomeView({products}) {
  return (
    <>

      <ProductList allproducts={products} ></ProductList>



    </>
  );
}
