import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { bodyHero, createHeroOk, deleteHero, Hero, updateHero } from 'src/app/shared/interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private BASE_URL: string;
  constructor(private http:HttpClient) { 
    this.BASE_URL = environment.API_URL;
  }

  getAllHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.BASE_URL}/heroes/all`)
  }

  getOneHero(id:string):Observable<Hero>{
    return this.http.get<Hero>(`${this.BASE_URL}/heroes/one/${id}`)
  }

  /* 
  No entendi bien la consigna de este punto, ya que "obtener todos los heroes a través de una palabra como por ejemplo "man", esto se deberia implementar con query param desde la API y como es un ejercicio de front no me cierra mucho, pero lo que entiendo es lo siguiente:

  De todos los que trae, quedarse con los que cumplen esa key
  */
  getByParam(key:string):Observable<Hero[]>{
    return this.getAllHeroes().pipe(
      map((response:Hero[]) =>{
          return response.filter(hero => hero.name.includes(key))
      }),
      catchError((error) => of([])),
    )
  }
  
  createHero(hero:bodyHero):Observable<createHeroOk>{
    return this.http.post<createHeroOk>(`${this.BASE_URL}/heroes`,hero)
  }

  updateHero(id:string,hero:bodyHero):Observable<updateHero>{
    return this.http.put<updateHero>(`${this.BASE_URL}/heroes/update/${id}`,hero)
  }
  
  deleteHero(id:string):Observable<deleteHero>{
    return this.http.delete<deleteHero>(`${this.BASE_URL}/heroes/delete/${id}`)
  }
}
