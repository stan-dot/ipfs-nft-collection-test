
import { ethers } from "ethers";
import "dotenv/config";
import * as nftOwnershipToken from "../artifacts/contracts/NftOwnershipToken.sol/NftOwnershipToken.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// creates a new contract https://docs.ethers.io/v5/api/contract/example/

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN:ethers.BigNumber = await signer.getBalance();
  const balance:number = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  const tokenFactory = new ethers.ContractFactory(
    nftOwnershipToken.abi,
    nftOwnershipToken.bytecode,
    signer
  );
  const contract = tokenFactory.connect(signer);
  console.log("Awaiting confirmations");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});