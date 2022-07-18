import axios, { AxiosResponse } from 'axios';
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

  async getImage(id:number): Promise<any>{
    axios.get(`${this.apiUrl}/file/${id}`).then((res: AxiosResponse) => {
      console.log('successful image retrieval');
      return res.data
    }).catch((error) => {
      console.error(error);
    })
  }
}