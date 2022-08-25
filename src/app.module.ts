import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';


@Module({
  providers: [],
  controllers : [],
  imports: [TasksModule],
  exports: [],
}) 
export class AppModule {}