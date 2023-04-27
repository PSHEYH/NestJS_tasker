import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

    async getCategories(){
        const categories = await this.categoryRepository.find();
        return categories;
    }

    async createCategory(category: CreateCategoryDto){
        const newCategory = await this.categoryRepository.create(category);
        return await this.categoryRepository.save(newCategory);
    }
}
