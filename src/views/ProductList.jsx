import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function ProductList({ allproducts }) {
    const { cat = "Animal" } = useParams();  // Default category is 'Animal' if none is provided

    // Filter products based on the category obtained from useParams
    const products = allproducts.filter(product => product.category === cat);



    return (
        <>
            <div className="product center">
                {products.map((product) => (
                    <div key={product._id} className="card">
                        <Link className="nav-link" to={"/product/detail/" + product._id}>
                            <img className="medium" src={"/" + product.image} alt={product.name} />
                        </Link>




                        <div className="card-body">
                            <Link className="nav-link" to={"/product/detail/" + product._id}>
                                <h2>{product.name}</h2>
                                {/* Additional product details can be uncommented as needed */}
                                {/* <h2>{product.category}</h2> */}
                                {/* <h2>{product.description}</h2> */}
                                {/* <h2 className="gold">{product.numReviews}</h2> */}
                            </Link>
                            <div className="price">${product.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
