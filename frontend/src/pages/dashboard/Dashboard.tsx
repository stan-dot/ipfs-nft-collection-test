import React, { ReactElement } from "react";
import { ApiService } from 'src/app/services/api.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { INITIAL_CONTENTS } from "./INITIAL_CONTENTS";
import { pendingRequests as PendingRequestsTable } from "./pendingRequests";
import { synchronizedStatus as SynchronizedStatus } from "./synchronizedStatus";

export function Dashboard(

  blockchainService: BlockchainService,
  apiService: ApiService

): ReactElement {
  const pageContents = INITIAL_CONTENTS;


  // watchServerBlockInterval: NodeJS.Timeout | null = null;
  // watchPendingTxsInterval: NodeJS.Timeout | null = null;
  // serverBlock = 0;
  // pendingTx: {
  //   amount: number;
  //   hash: string;
  //   confirmations: number;
  //   updateOngoing ?: boolean;
  // } [] = [];


  // ngOnInit(): void {
  //   updateValues();
  //   updateVariables();
  //   watchBlockNumber();
  //   watchUserBalanceEther();
  //   watchContractSupply();
  //   watchUserBalanceToken();
  //   watchServerBlock();
  //   watchPendingRequests();
  // }

  function updateValues() {
    blockchainService.address().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'address'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
    blockchainService.networkName().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'networkName'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
    blockchainService.tokenAddress().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'tokenAddress'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
    blockchainService.tokenName().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'tokenName'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
    blockchainService.symbol().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'symbol'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
  }

  function updateVariables() {
    updateEtherBalance();
    updateSupply();
    updateTokenBalance();
  }

  function watchUserBalanceEther() {
    blockchainService.watchUserBalanceEther(() => {
      updateEtherBalance();
    });
  }

  function watchContractSupply() {
    blockchainService.watchContractSupply(() => {
      updateSupply();
    });
  }

  function watchUserBalanceToken() {
    blockchainService.watchUserBalanceToken(() => {
      updateTokenBalance();
    });
  }

  function updateEtherBalance() {
    blockchainService.etherBalance().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'etherBalance'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
  }

  function watchBlockNumber() {
    blockchainService.watchBlockNumber((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'number'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
  }

  function watchServerBlock() {
    watchServerBlock = setInterval(() => {
      apiService.getServerBlock().subscribe((res: { number: any; }) => {
        serverBlock = res.number;
      });
    }, 10000);
  }

  function watchPendingRequests() {
    watchPendingTxsInterval = setInterval(() => {
      pending.forEach((tx: { confirmations: number; updateOngoing: boolean; hash: any; }) => {
        if (tx.confirmations < 5 && !tx.updateOngoing) {
          tx.updateOngoing = true;
          apiService
            .getTransactionReceipt(tx.hash)
            .subscribe((receipt: { confirmations: any; }) => {
              tx.confirmations = receipt.confirmations;
              tx.updateOngoing = false;
            });
        }
      });
    }, 10000);
  }

  function updateSupply() {
    blockchainService.supply().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'supply'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
  }

  function updateTokenBalance() {
    blockchainService.tokenBalance().then((result: any) => {
      const itemIndex = pageContents.findIndex(
        (obj: { key: string; }) => obj.key === 'tokenBalance'
      );
      if (itemIndex >= 0) pageContents[itemIndex].value = result;
    });
  }

  function requestToken(amountStr: string) {
    const amount = Number(amountStr);
    blockchainService.signTokenRequest(amount).then((signature: any) => {
      apiService
        .requestToken(
          blockchainService.userWallet.address,
          amount,
          signature
        )
        .subscribe((res: { hash: any; confirmations: any; }) => {
          pending.push({
            amount: amount,
            hash: res.hash,
            confirmations: res.confirmations,
          });
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
        <PendingRequestsTable tx={undefined} />
      </div >
    </div >
  </div >
}

function TokenRequestForm(props: { requestToken: (amountStr: string) => void }): ReactElement {
  return <div className="row justify-content-center">
    <div className="card bg-primary mt-4 col-md-8 text-white text-start">
      <div className="card-body">
        <p><strong>Request tokens</strong ></p >
        <p>Request some tokens here using the form bellow</p>
      </div >
    </div >
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
  </div >;
}
