import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/domain/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
  @Get()
  index(): string {
    return 'Hello World';
  }
}
