import { TestBed, getTestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { bodyHero, createHeroOk, deleteHero, Hero, updateHero } from 'src/app/shared/interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  const BASE_URL = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService, HttpClient],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar un observable<Hero[]>', () => {
    // const service: HeroesService = TestBed.get(HeroesService)
    const mockAllHero: Hero[] = [
      {
        id: '61be85b1a7ad042dcb7c35fa',
        name: 'diego',
        speed: 100,
        power: 100,
        urlImage: '',
      },
      {
        id: '61be272cb63865a5a3a9ff7c',
        name: 'winter soldier',
        speed: 35,
        power: 90,
        urlImage:
          'https://www.superherodb.com/pictures2/portraits/10/100/10027.jpg',
      },
    ];

    // probamos el metodo del servicio
    service.getAllHeroes().subscribe((response: Hero[]) => {
      expect(response).toEqual(mockAllHero);
      expect(response[0]).toBeDefined();
    });

    // nos comprueba que se haya hecho una simulacion con la url dada y nos devuelva una respuesta
    const req = httpMock.expectOne(`${BASE_URL}/heroes/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAllHero);
    // proporcionar valores ficticios como respuesta de nuestras peticiones
  });

  it('Debe retornar un observable<Hero>', () => {
    const mockHero: Hero = {
      id: '61be85b1a7ad042dcb7c35fa',
      name: 'diego',
      speed: 100,
      power: 100,
      urlImage: '',
    };

    const { id } = mockHero;

    // probamos el metodo del servicio
    service.getOneHero(id).subscribe((response: Hero) => {
      expect(response).toEqual(mockHero);
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${BASE_URL}/heroes/one/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('Debe retornar un observable<Hero[]> Pero con valores filtrados por una key', () => {
    const key = 'win';
    const result: Hero[] = [
      {
        id: '61be272cb63865a5a3a9ff7c',
        name: 'winter soldier',
        speed: 35,
        power: 90,
        urlImage:
          'https://www.superherodb.com/pictures2/portraits/10/100/10027.jpg',
      },
    ];

    const mockAllHero: Hero[] = [
      {
        id: '61be85b1a7ad042dcb7c35fa',
        name: 'diego',
        speed: 100,
        power: 100,
        urlImage: '',
      },
      ...result,
    ];

    // probamos el metodo del servicio
    service.getByParam(key).subscribe((response: Hero[]) => {
      expect(response).toEqual(result);
      expect(response[0]).toBeDefined();
    });

    const req = httpMock.expectOne(`${BASE_URL}/heroes/all`);
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });

  it('Debe retornar un observable<createHeroOk>', () => {
    const mockNewHero: bodyHero = {
      name: 'diego',
      speed: 100,
      power: 100,
      urlImage: '',
    };

    const result:createHeroOk = {
      message: 'Hero Created',
      createHeroe: {
          urlImage: '',
          speed: 100,
          power: 100,
          name: 'Diego',
          _id: '61bf7ff9297d7641be88b83d',
          __v: 0
      }
  }

  const resultMessage = 'Hero Created'

    // probamos el metodo del servicio
    service.createHero(mockNewHero).subscribe((response: createHeroOk) => {
      expect(response).toEqual(result);
      expect(response).toBeDefined();
      expect(response.message).toEqual(resultMessage)
    });

    const req = httpMock.expectOne(`${BASE_URL}/heroes`);
    expect(req.request.method).toBe('POST');
    req.flush(result);
  });

  it('Debe retornar un observable<updateHero>', () => {
    const newHero: Hero = {
      id: '61be85b1a7ad042dcb7c35fa',
      name: 'diego',
      speed: 50,
      power: 100,
      urlImage: '',
    };

    const { id } = newHero;

    const result:updateHero = {
      message: 'Hero Updated',
      updateHeroe: {
          urlImage: '',
          speed: 50,
          power: 100,
          name: 'Diego',
          _id: id,
          __v: 0
      }
  }

  const resultMessage = 'Hero Updated'

    // probamos el metodo del servicio
    service.updateHero(id,newHero).subscribe((response: updateHero) => {
      expect(response).toEqual(result);
      expect(response).toBeDefined();
      expect(response.message).toEqual(resultMessage)
    });

    const req = httpMock.expectOne(`${BASE_URL}/heroes/update/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(result);
  });

  it('Debe retornar un observable<deleteHero>', () => {
    const deleteHero: Hero = {
      id: '61be85b1a7ad042dcb7c35fa',
      name: 'diego',
      speed: 50,
      power: 100,
      urlImage: '',
    };

    const { id } = deleteHero;

    const result:deleteHero = {
      message: 'Hero Deleted',
      deleteHero: {
          urlImage: '',
          speed: 50,
          power: 100,
          name: 'Diego',
          _id: id,
          __v: 0
      }
  }

  const resultMessage = 'Hero Deleted'

    // probamos el metodo del servicio
    service.deleteHero(id).subscribe((response: deleteHero) => {
      expect(response).toEqual(result);
      expect(response).toBeDefined();
      expect(response.message).toEqual(resultMessage)
    });

    const req = httpMock.expectOne(`${BASE_URL}/heroes/delete/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(result);
  });
  
});
