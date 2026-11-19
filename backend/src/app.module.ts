import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PlanModule } from './plan/plan.module.js';

@Module({
  imports: [PlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
