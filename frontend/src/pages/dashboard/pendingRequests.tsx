import React, { ReactElement } from "react";
import { MINIMUM_CONFIRMATIONS } from "./MINIMUM_CONFIRMATIONS";
import { Tx } from "./Tx.type";

export const pendingRequests = (props: { txs: Tx[] }): ReactElement => <div>
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
      {
        props.txs.map((t: Tx) => {
          const displayedConfirmationsCount = t.updateOngoing ? "..." : t.confirmations > MINIMUM_CONFIRMATIONS ? t.confirmations : `${MINIMUM_CONFIRMATIONS}+`;
          return <tr>
            <td>{t.amount}</td>
            <td>{t.hash}</td>
            <td>{displayedConfirmationsCount} </td>
          </tr>
        })
      }
    </tbody>
  </table>
</div>;
