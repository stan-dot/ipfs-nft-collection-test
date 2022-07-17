import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Home(): ReactElement {

  return <div id="home-panel">
    <h1>Home</h1>
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Centered hero</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Example text here</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Know more</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Contact us</button>
        </div>
      </div>
      <div className="col-lg-6 mx-auto mt-5">
        <Link to={'/dashboard'}>
          <button type="button" className="btn btn-primary btn-lg" >Create wallet</button>
        </Link>
      </div>
    </div>
  </div>
}