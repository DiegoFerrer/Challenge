import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { createHeroeDTO, DeleteOrUpdateHeroeDTO } from './dto/heroes.dto';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private hereosService: HeroesService) {}

  // Obtener todos
  @Get('/one/:id')
  async getOne(@Res() response, @Param() param: DeleteOrUpdateHeroeDTO) {
    const { id } = param;
    try {
      const data = await this.hereosService.getOne(id);
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  // Obtener uno
  @Get('/all')
  async getAllHeroes(@Res() response) {
    try {
      const data = await this.hereosService.getHeroes();
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  // Crear
  @Post()
  async createHeroe(@Res() response, @Body() heroe: createHeroeDTO) {
    const createHeroe = await this.hereosService.createHeroe(heroe);

    return response.status(HttpStatus.OK).json({
      message: 'Hero Created',
      createHeroe,
    });
  }

  // Crear
  @Put('/update/:id')
  async updateHeroe(
    @Res() response,
    @Body() heroe: createHeroeDTO,
    @Param() param: DeleteOrUpdateHeroeDTO,
  ) {
    const { id } = param;
    const updateHeroe = await this.hereosService.updateHeroe(id, heroe);

    return response.status(HttpStatus.OK).json({
      message: 'Hero Updated',
      updateHeroe,
    });
  }

  // Eliminar
  @Delete('/delete/:id')
  async deleteHeroe(@Res() response, @Param() param: DeleteOrUpdateHeroeDTO) {
    const { id } = param;
    const deleteHero = await this.hereosService.deleteHeroe(id);

    if (!deleteHero) throw new NotFoundException('Heroe Does not exist');

    return response.status(HttpStatus.OK).json({
      message: 'Hero Deleted',
      deleteHero,
    });
  }
}
