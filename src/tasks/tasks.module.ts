import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController }  from './tasks.controller';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [ TasksController ],
  exports: [TypeOrmModule]
})
export class TasksModule {}
