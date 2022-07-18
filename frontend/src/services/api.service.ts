import axios from 'axios';
import { ethers } from 'ethers';
import { MintRequestDto } from '../dtos/mint-request.dto';
import { environment } from '../environments/environment';


export class ApiService {
  private apiUrl = environment.apiAddress;


  async requestToken(address: string, amount: number, signature: string) {
    const requestDto = new MintRequestDto(address, amount, signature);
    return await axios.post<ethers.providers.TransactionResponse>(
      `${this.apiUrl}contract/mint-token`,
      requestDto
    );
  }
}