import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService){}

    @Post()
    async createRole(@Body() roleDto: CreateRoleDto){
        return this.roleService.createRole(roleDto);
    }

    @Get('/:value')
    async getRoleByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value);
    }

    
}
