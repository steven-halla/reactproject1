import React from "react";
import { Link } from "react-router-dom";

export default function SearchResult({ searchData }) {
  return (
    <>
      <div className="product center">
        {searchData.map((product, i) => (
          <div key={product._id} className="card">
            <Link className="nav-link" to={"/product/detail/" + product._id}>
              <img className="medium" src={"/" + product.image} alt="product" />
            </Link>

            <div className="card-body">
              <Link className="nav-link" to={"/product/detail/" + product._id}>
                <h2>{product.name}</h2>
              </Link>
              <div className="price">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
