import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ethers } from 'ethers';
import { blob } from 'stream/consumers';
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

  async getImage(id: number): Promise<any> {
    const config: AxiosRequestConfig = {
      responseType: 'blob'
    }
    let response;
    try {

      response = await axios.get(`${this.apiUrl}file/${id}`, config)
    } catch (error) {
      console.error('encountered an error:', error);
      return;
    }
    console.log('successful image retrieval', response);
    return response.data
  }
}