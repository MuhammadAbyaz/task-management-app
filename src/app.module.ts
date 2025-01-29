import { Module } from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { TasksModule } from './modules/task.module';
@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
