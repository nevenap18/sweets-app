import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Ingredient } from "src/entities/ingredient.entity";
import { IngredientService } from "src/services/ingredient/ingredient.service";

@Controller('api/ingredient')
@Crud({
    model: { type: Ingredient },
    params: {
        id: { field: 'ingredientId', type: 'number', primary: true }
    },
    query: {
        join: {
          sweetIngredients: {
            eager: true
          },
          sweets: {
            eager: true
          }
        },
    },
})
export class IngredientController {
    constructor(public service: IngredientService) { }
}
