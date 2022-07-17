import { ethers } from 'ethers';
import { MintRequestDto } from '../dtos/mint-request.dto';
import { environment } from '../environments/environment';

// todo convert to axios

export class ApiService {
  apiUrl = environment.apiAddress;

  constructor(private http: HttpClient) {}

  getServerBlock() {
    return this.http.get<ethers.providers.Block>(`${this.apiUrl}block/block`);
  }

  getTransactionReceipt(hash: string) {
    return this.http.get<ethers.providers.TransactionReceipt>(`${this.apiUrl}block/transaction/${hash}`);
  }

  requestToken(address: string, amount: number, signature: string) {
    const requestDto = new MintRequestDto(address, amount, signature);
    return this.http.post<ethers.providers.TransactionResponse>(
      `${this.apiUrl}contract/mint-token`,
      requestDto
    );
  }
}