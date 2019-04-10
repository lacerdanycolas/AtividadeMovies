import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {

  public URL = "http://api.themoviedb.org/3/";

  public API_KEY = "583aea9c82cd59697a0aa7b1dc106a21";
  
  public _httpClient: HttpClient;

  constructor(httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }
}
