import { BaseService } from './base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  getDiscover() {
    return this._httpClient.get(`${this.URL}discover/movie?api_key=${this.API_KEY}&language=pt-BR`)
  }

  getById(id: string) {
    return this._httpClient.get(`${this.URL}movie/${id}?api_key=${this.API_KEY}&language=pt-BR`)
  }
}
