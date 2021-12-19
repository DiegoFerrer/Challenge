import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from './shared/shared.module';
import { LoggedModule } from './logged/logged.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo/heroes-challenge', {
      // MongooseModule.forRoot('mongodb://localhost:27018/heroes-challenge', {
      useNewUrlParser: true,
    }),
    SharedModule,
    LoggedModule,
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
