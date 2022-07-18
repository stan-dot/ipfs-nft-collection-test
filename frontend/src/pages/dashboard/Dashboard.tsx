import { AxiosResponse } from "axios";
import { ethers } from "ethers";
import { ReactElement, useState } from "react";
import { ApiService } from '../../services/api.service';
import { BlockchainService } from '../../services/blockchain.service';
import { INITIAL_CONTENTS } from "./INITIAL_CONTENTS";
import { MINIMUM_CONFIRMATIONS } from "./MINIMUM_CONFIRMATIONS";
import { pendingRequests as PendingRequestsTable } from "./pendingRequests";
import { synchronizedStatus as SynchronizedStatus } from "./synchronizedStatus";
import { TokenRequestForm } from "./TokenRequestForm";
import { Tx } from "./Tx.type";
import { WatchedProperty } from "./WatchedProperty";

export function Dashboard(props: { blockchainService: BlockchainService, apiService: ApiService }): ReactElement {
  const pageContents = INITIAL_CONTENTS;

  const [pendingTx, setPendingTx] = useState([] as Tx[]);
  const [serverBlock, setServerBlock] = useState(0);

  let watchServerBlockInterval: NodeJS.Timeout | null = null;
  let watchPendingTxsInterval: NodeJS.Timeout | null = null;

  updateValues();
  // watchUserBalanceEther();
  // watchContractSupply();
  // watchUserBalanceToken();
  watchServerBlock();
  watchPendingRequests();

  async function updateValues() {
    for (const property in WatchedProperty) {
      const result = await props.blockchainService.allInOne(property as unknown as WatchedProperty);
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === property
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    }
  }

  function watchServerBlock() {
    setInterval(() => {
      props.apiService.getServerBlock().then((res: AxiosResponse<ethers.providers.Block>) => {
        setServerBlock(res.data.number);
      });
    }, 10000);
  }

  function watchPendingRequests() {
    watchPendingTxsInterval = setInterval(() => {
      pendingTx.forEach((tx: Tx) => {
        if (tx.confirmations < MINIMUM_CONFIRMATIONS && !tx.updateOngoing) {
          tx.updateOngoing = true;
          props.apiService
            .getTransactionReceipt(tx.hash)
            .then((res: AxiosResponse<ethers.providers.TransactionReceipt, any>) => {
              const receipt: ethers.providers.TransactionReceipt = res.data;
              tx.confirmations = receipt.confirmations;
              tx.updateOngoing = false;
            });
        }
      });
    }, 10000);
  }

  function requestToken(amountStr: string) {
    const amount = Number(amountStr);
    props.blockchainService.signTokenRequest(amount).then((signature: any) => {
      props.apiService
        .requestToken(
          props.blockchainService.userWallet.address,
          amount,
          signature
        )
        .then((res: AxiosResponse<ethers.providers.TransactionResponse, any>) => {
          const txResponse: ethers.providers.TransactionResponse = res.data;
          const newPendingTxs = pendingTx.concat([{
            amount: amount,
            hash: txResponse.hash,
            confirmations: txResponse.confirmations,
          }]);
          setPendingTx(newPendingTxs);
        });
    });
  }

  return <div id="dashboard-panel">
    <h1>Dashboard</h1>
    <div className="px-4 py-5 my-5 text-center">
      <div className="card">
        <div className="card-header">
          <p>Data</p>
        </div>
        <div className="card-body">
          {
            pageContents.map((item) => {
              return < div className="list-group-item py-3" aria-current="true" >
                <h6 className="mb-0 text-start"><strong>{item.prop}</strong></h6>
                <p className="mb-0 text-start">{item.value}</p>
              </div>
            })
          }
        </div>
        <TokenRequestForm requestToken={requestToken} />
        <SynchronizedStatus serverBlock={0} />
        <PendingRequestsTable txs={pendingTx} />
      </div >
    </div >
  </div >
}


