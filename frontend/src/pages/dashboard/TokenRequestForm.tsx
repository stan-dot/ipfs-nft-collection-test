import React, { ReactElement } from "react";

export function TokenRequestForm(props: { requestToken: (amountStr: string) => void; }): ReactElement {
  return <div className="row justify-content-center">
    <div className="card bg-primary mt-4 col-md-8 text-white text-start">
      <div className="card-body">
        <p><strong>Request tokens</strong></p>
        <p>Request some tokens here using the form bellow</p>
      </div>
    </div>
    <form>
      <div className="d-flex justify-content-evenly mt-4 mx-4 px-4">
        <div className="mb-3 col-md-5">
          <label htmlFor="amount" className="form-label">Amount of tokens</label>
          <input id="amount" type="number" className="form-control text-center" aria-describedby="amount">
            <div id="amount" className="form-text">Amount of tokens to claim</div>
          </input>
        </div>
        <div className="mb-3 mt-4 col-md-3">
          <button type='button' className="button btn-lg btn-primary w-100"
            onClick={event => requestToken(event.target.addEventListener)}>Request</button>
        </div>
      </div>
    </form>
  </div>;
}
