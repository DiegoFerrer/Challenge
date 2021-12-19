import { Module } from '@nestjs/common';
import { LoggedController } from './logged.controller';

@Module({
  controllers: [LoggedController]
})
export class LoggedModule {}
