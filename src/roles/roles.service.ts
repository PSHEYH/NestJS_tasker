import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>){}

    async createRole(dto: CreateRoleDto){
        const role = await this.roleRepository.create(dto);
        return await this.roleRepository.save(role);
    }

    async getRoleByValue(value: string){
        const role = await this.roleRepository.findOne({
            where: {
                value: value
            }
        });

        return role;
    }
}
