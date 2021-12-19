import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesSchema } from './schemas/heroe.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: 'Heroes', schema: HeroesSchema }]),
  ],
  providers: [HeroesService],
  controllers: [HeroesController],
})
export class HeroesModule {}
