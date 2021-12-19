import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private BASE_URL: string;
  private httpClient: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    this.BASE_URL = environment.API_URL;
    this.httpClient = new HttpClient(httpBackend)
  }

  login(user:User) {
    let token: string = sessionStorage.getItem('token') || ''
    return this.httpClient.post(`${this.BASE_URL}/login`,user,{
      headers:{
        Authorization: `${token}`
      },
      observe:'response'
    })
  }


}
