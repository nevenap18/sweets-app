import { Injectable, Body } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sweet } from 'src/entities/sweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddSweetDto } from 'src/dtos/sweet/add.sweet.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { SweetKind } from 'src/entities/sweet-kinds.entity';
import { SweetIngredient } from 'src/entities/sweet-ingredient.entity';

@Injectable()
export class SweetService extends TypeOrmCrudService<Sweet> {
  constructor(
    
    @InjectRepository(Sweet) private readonly sweet: Repository<Sweet>,

    @InjectRepository(SweetKind) private readonly sweetKind: Repository<SweetKind>,

    @InjectRepository(SweetIngredient) private readonly sweetIngredient: Repository<SweetIngredient>,
    
    ) {
    super(sweet)
  }

  async createSweet(data: AddSweetDto): Promise<Sweet | ApiResponse> {
    let newSweet: Sweet = new Sweet()
    newSweet.name = data.name
    newSweet.description = data.description
    newSweet.colorId = data.colorId
    newSweet.originId = data.originId
    newSweet.price = data.price
    newSweet.unit = data.unit

    let savedSweet = await this.sweet.save(newSweet)

    for (let kind of data.kinds) {
      let newSweetKind: SweetKind = new SweetKind()
      newSweetKind.sweetId = savedSweet.sweetId
      newSweetKind.kindId = kind.kindId

      await this.sweetKind.save(newSweetKind)
    }

    for (let ingredient of data.ingredients) {
      let newSweetIngredient: SweetIngredient = new SweetIngredient()
      newSweetIngredient.sweetId = savedSweet.sweetId
      newSweetIngredient.ingredientId = ingredient.ingredientId

      await this.sweetIngredient.save(newSweetIngredient)
    }

    return await this.sweet.findOne(savedSweet.sweetId, {
      relations: [
        "sweetKinds",
        "kinds",
        "sweetIngredients",
        "ingredients"
      ]
    })
  }
}
