import React, { ReactElement } from "react";

export const pendingRequests = (props: { tx: any }): ReactElement => <div>
  <h2 className="mt-2 mb-4">Pending requests</h2>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Amount</th>
        <th scope="col">Hash</th>
        <th scope="col">Confirmations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>update</td>
        <td>hash</td>
        <td>ongoing?"...": tx.confirmations < /> 5?tx.confirmations: "5+" </td>
      </tr>
    </tbody>
  </table>
</div>;
