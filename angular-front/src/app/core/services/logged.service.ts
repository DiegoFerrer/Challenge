import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  BASE_URL: string;
  private httpClient: HttpClient;

  constructor( private httpBackend: HttpBackend,private route: Router ) {
    this.BASE_URL = environment.API_URL;
    this.httpClient = new HttpClient(httpBackend)
  }

  isLogged(){
    let token: string = sessionStorage.getItem('token') || ''
    return this.httpClient.get(`${this.BASE_URL}/login/isLogged`, {
      headers:{
        Authorization: `${token}`
      }
    }).pipe(
      // si la peticion ex exitosa se puede proceder
      map(() => true),
      catchError(()=>{
        // si la peticion es erronea se borra el storage y se redirige al login ademas de retornar un false
        sessionStorage.clear()
        return of(this.route.createUrlTree(['/login']))
      })
    )
  }
}
