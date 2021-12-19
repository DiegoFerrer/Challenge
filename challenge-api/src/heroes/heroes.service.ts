import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Heroe, Heroes } from 'src/interfaces/heroes.interface';
import { heroesMock } from 'src/mock/hereos';
import { UtilsService } from 'src/utils/utils/utils.service';

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel('Heroes') private readonly heroesModel: Model<Heroes>,
    private utilsService: UtilsService,
  ) {}

  // SI LA DB esta vacia, la llenamos
  async getNewData() {
    // Insertar nueva data en la DB
    return await this.heroesModel.insertMany(heroesMock, { ordered: false });
  }

  // Exponer todos los articulos
  async getHeroes() {
    const heroes = await this.heroesModel.find();

    // Si la DB esta vacía (como la primera vez) se pide data
    if (!heroes.length) {
      const data = await this.getNewData();
      const heroes = await this.heroesModel.find();

      return this.utilsService.formatHeroesResponse(heroes);
    }

    return this.utilsService.formatHeroesResponse(heroes.reverse());
  }

  async getOne(id: string) {
    const heroeFinded = await this.heroesModel.findById(id);

    // Si la DB esta vacía (como la primera vez) se pide data
    if (!heroeFinded) throw new NotFoundException('Heroe Does not exist');

    const heroeFormat = {
      id: heroeFinded._id,
      name: heroeFinded.name,
      speed: heroeFinded.speed,
      power: heroeFinded.power,
      urlImage: heroeFinded.urlImage,
    };

    return heroeFormat;
  }

  // Crear heroe
  async createHeroe(heroe: Heroe) {
    const heroeCreated = await this.heroesModel.create(heroe);
    return heroeCreated;
  }

  // Actualizar
  async updateHeroe(id: string, heroe: Heroe) {
    const heroeCreated = await this.heroesModel.findByIdAndUpdate(id, heroe);
    return heroeCreated;
  }

  // Eliminar
  async deleteHeroe(heroeId: string): Promise<any> {
    const heroe = await this.heroesModel.findOneAndDelete({ _id: heroeId });

    return heroe;
  }
}
