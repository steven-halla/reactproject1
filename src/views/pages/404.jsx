import React, { Component, lazy } from "react";
import { ReactComponent as IconAlertTriangleFill } from "bootstrap-icons/icons/exclamation-triangle-fill.svg";
const Search = lazy(() => import("../../components/Search"));

export default function NotFoundView() {
    return (
      <div className="container text-center p-5">
        <div className="display-1">
          <IconAlertTriangleFill className="i-va text-warning" />
          404
        </div>
        <h1 className="mb-3">Oops... Page Not Found!</h1>
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <Search />
          </div>
        </div>
      </div>
    );
  }
