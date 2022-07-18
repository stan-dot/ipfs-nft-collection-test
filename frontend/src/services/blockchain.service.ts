import { ethers } from 'ethers';
import TokenContract from '../assets/contracts/NFTCollection.json';
import { environment } from '../environments/environment';
import { WatchedProperty } from '../pages/dashboard/WatchedProperty';


export class BlockchainService {
  provider: ethers.providers.BaseProvider;
  userWallet: ethers.Wallet;
  tokenContractInstance: ethers.Contract;

  constructor() {
    this.provider = this.getProvider();
    this.userWallet = ethers.Wallet.createRandom().connect(this.provider);
    this.tokenContractInstance = new ethers.Contract(
      environment.tokenContractAddress,
      TokenContract.abi
    ).connect(this.userWallet);
  }

  public allInOne(name: WatchedProperty) {
    switch (name) {
      case (   WatchedProperty.address):
        return this.address();
      case (WatchedProperty.networkName):
        return this.networkName();
      case (WatchedProperty.tokenAddress):
        return this.tokenAddress();
      case (WatchedProperty.tokenName):
        return this.tokenName();
      case (WatchedProperty.symbol):
        return this.symbol();
      case (WatchedProperty.supply):
        return this.supply();
      case (WatchedProperty.tokenBalance):
        return this.tokenBalance();
      case (WatchedProperty.number):
        return this.number();
      case (WatchedProperty.etherBalance):
        return this.etherBalance();
    }
  }

  getProvider() {
    return ethers.getDefaultProvider(environment.network);
  }

  async address() {
    const address = this.userWallet.address;
    return address;
  }

  async etherBalance() {
    const etherBalanceBN = await this.provider.getBalance(
      this.userWallet.address
    );
    const etherBalance = ethers.utils.formatEther(etherBalanceBN) + ' ETH';
    return etherBalance;
  }

  async networkName() {
    const networkName = environment.network;
    return networkName;
  }

  async number() {
    const number = await this.provider.getBlockNumber();
    return number.toFixed(0);
  }

  async tokenAddress() {
    const tokenAddress = environment.tokenContractAddress;
    return tokenAddress;
  }

  async tokenName() {
    const tokenName = await this.tokenContractInstance['name']();
    return tokenName;
  }

  async symbol() {
    const symbol = await this.tokenContractInstance['symbol']();
    return symbol;
  }

  async supply() {
    const supplyBN = await this.tokenContractInstance['totalSupply']();
    const supply = ethers.utils.formatEther(supplyBN);
    return supply + ' Tokens';
  }

  async tokenBalance() {
    const tokenBalanceBN = await this.tokenContractInstance['balanceOf'](
      this.userWallet.address
    );
    const tokenBalance = ethers.utils.formatEther(tokenBalanceBN);
    return tokenBalance + ' Tokens';
  }

  watchBlockNumber(callbackFn: (...arg0: any) => void) {
    const filter = 'block';
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchUserBalanceEther(callbackFn: (...arg0: any) => void) {
    const filter = [ethers.utils.hexZeroPad(this.userWallet.address, 32)];
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchContractSupply(callbackFn: (...arg0: any) => void) {
    const filter = this.tokenContractInstance.filters['Transfer']();
    this.provider.on(filter, (event) => callbackFn(event));
  }

  watchUserBalanceToken(callbackFn: (...arg0: any) => void) {
    const filterFrom = this.tokenContractInstance.filters['Transfer'](
      this.userWallet.address
    );
    const filterTo = this.tokenContractInstance.filters['Transfer'](
      null,
      this.userWallet.address
    );
    this.tokenContractInstance.on(filterFrom, (event) => callbackFn(event));
    this.tokenContractInstance.on(filterTo, (event) => callbackFn(event));
  }

  async signTokenRequest(amount: number) {
    const signatureObject = {
      address: this.userWallet.address,
      amount: amount,
    };
    const signatureMessage = JSON.stringify(signatureObject);
    return await this.userWallet.signMessage(signatureMessage);
  }
}