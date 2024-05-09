import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

const HaveProduct = ({count}) => {
  return <div className="position-absolute top-0 left-100 translate-middle badge md-danger rounded-circle">{count}</div>;
}

const NpProduct = () => <div ></div>;

const ShoppingCartIcon = ({count}) => {
  if (count > 0) return <HaveProduct count={count} />;
  return <NpProduct />;
}

const Header = ({allproducts, count, setSearchData}) => {
  return (
    <>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link to="/">
                <img
                  alt="logo"
                  src="/favicon-32x32.png"
                /> Quilling Art
              </Link>
            </div>
            <div className="col-md-6">
              <Search allproducts={allproducts} setSearchData={setSearchData} />
            </div>
            <div className="col-md-3">
              <div className="position-relative d-inline mr-3 header-custom">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />
                  <ShoppingCartIcon count={count}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
