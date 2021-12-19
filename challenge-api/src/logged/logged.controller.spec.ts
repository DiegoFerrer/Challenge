import { Test, TestingModule } from '@nestjs/testing';
import { LoggedController } from './logged.controller';

describe('LoggedController', () => {
  let controller: LoggedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggedController],
    }).compile();

    controller = module.get<LoggedController>(LoggedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
