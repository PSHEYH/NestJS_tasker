import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){}
    async getAllTasks(device_id: string){
        return await this.taskRepository.find({
            where: {
                device_id: device_id
            },
            order: {
                created_at: 'DESC'
            }
        });
    }

    async createTask(dto: CreateTaskDto, device_id: string){
        const result = await this.taskRepository.insert({...dto, device_id: device_id});
        return {
            id: result.raw.insertId,
            ...dto
        };
    }
 
    async getTaskById(id: number): Promise<Task | null>{
        return this.taskRepository.findOneBy({ id });
    }

    async updateTask(dto: UpdateTaskDto, id: number,device_id: string){
        await this.taskRepository.update({
            id: id,
            device_id: device_id
        },{
            ...dto
        });

        return {
            id: id,
            ...dto
        }
    }

    async deleteTask(id: number, device_id: string){
        await this.taskRepository.delete({
            id: id,
            device_id: device_id
        });
        return;
    }
}
