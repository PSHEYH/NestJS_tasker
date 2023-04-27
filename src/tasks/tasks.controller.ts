import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }
  @Roles('user')
  @UseGuards(RolesGuard)
  @Get()
  async findAll(@Request() request) {
    return await this.taskService.getAllTasks(request.user.sub);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getTaskById(id);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post()
  async createTask(@Request() request) {
    const task: CreateTaskDto = request.body;
    return await this.taskService.createTask(task, request.user.sub);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Patch(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const dto: UpdateTaskDto = req.body;
    const device_id = req.user.sub;
    return await this.taskService.updateTask(dto, id, device_id);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @HttpCode(204)
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const device_id = req.user.sub;
    return await this.taskService.deleteTask(id, device_id);
  }
}