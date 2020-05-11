import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/entities/ingredient.entity';

@Injectable()
export class IngredientService extends TypeOrmCrudService<Ingredient> {
  constructor(@InjectRepository(Ingredient) private readonly ingredient: Repository<Ingredient>) {
    super(ingredient)
  }
}