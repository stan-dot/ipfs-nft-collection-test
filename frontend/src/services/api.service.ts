import axios from 'axios';
import { ethers } from 'ethers';
import { MintRequestDto } from '../dtos/mint-request.dto';
import { environment } from '../environments/environment';

// todo convert to axios

export class ApiService {
  private apiUrl = environment.apiAddress;

  async getServerBlock() {
    return await axios.get<ethers.providers.Block>(`${this.apiUrl}block/block`);
  }

  async getTransactionReceipt(hash: string) {
    return await axios.get<ethers.providers.TransactionReceipt>(`${this.apiUrl}block/transaction/${hash}`);
  }

  async requestToken(address: string, amount: number, signature: string) {
    const requestDto = new MintRequestDto(address, amount, signature);
    return await axios.post<ethers.providers.TransactionResponse>(
      `${this.apiUrl}contract/mint-token`,
      requestDto
    );
  }
}