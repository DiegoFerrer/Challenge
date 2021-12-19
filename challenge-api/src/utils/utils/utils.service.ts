import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {


  formatHeroesResponse(heroesDB): any {
    return heroesDB.map((heroe) => {
      return {
        id: heroe._id,
        name: heroe.name.toLowerCase(),
        speed: heroe.speed,
        power: heroe.power,
        urlImage: heroe.urlImage,
      };
    });
  }
}
