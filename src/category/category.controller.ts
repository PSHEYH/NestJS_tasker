import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Get()
    async getCategories() {
        return await this.categoryService.getCategories();
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCategory(@Body() category: CreateCategoryDto) {
        return await this.categoryService.createCategory(category);
    }

}
