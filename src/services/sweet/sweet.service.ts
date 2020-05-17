import { Injectable, Body } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sweet } from 'src/entities/sweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddSweetDto } from 'src/dtos/sweet/add.sweet.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { SweetKind } from 'src/entities/sweet-kinds.entity';
import { SweetIngredient } from 'src/entities/sweet-ingredient.entity';
import { EditSweetDto } from 'src/dtos/sweet/edit.sweet.dto';

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
    newSweet.price = Math.round(data.price)
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

  async editSweet(sweetId: number, data: EditSweetDto): Promise<Sweet | ApiResponse> {
    let existingSweet: Sweet = await this.sweet.findOne(sweetId, {
        relations: ['sweetKinds', 'sweetIngredients']
      })

    if(!existingSweet) {
      return new ApiResponse('error', -5001, 'Article not found')
    }

    existingSweet.name = data.name
    existingSweet.description = data.description
    existingSweet.colorId = data.colorId
    existingSweet.originId = data.originId
    existingSweet.price = Math.round(data.price)
    existingSweet.unit = data.unit

    const savedSweet: Sweet = await this.sweet.save(existingSweet);
    if (!existingSweet) {
        return new ApiResponse('error', -5002, 'Could not save new sweet.');
    }
    
    if (data.kinds !== null) {
      await this.sweetKind.remove(existingSweet.sweetKinds)

      for (let kind of data.kinds) {
        let newSweetKind: SweetKind = new SweetKind()
        newSweetKind.sweetId = sweetId
        newSweetKind.kindId = kind.kindId

        await this.sweetKind.save(newSweetKind)
      }
    }

    if (data.ingredients !== null) {
      await this.sweetIngredient.remove(existingSweet.sweetIngredients)

      for (let ingredient of data.ingredients) {
        let newSweetIngredient: SweetIngredient = new SweetIngredient()
        newSweetIngredient.sweetId = sweetId
        newSweetIngredient.ingredientId = ingredient.ingredientId

        await this.sweetIngredient.save(newSweetIngredient)
      }
    }

    return await this.sweet.findOne(sweetId, {
      relations: [
        "sweetKinds",
        "kinds",
        "sweetIngredients",
        "ingredients"
      ]
    })
  }
}
