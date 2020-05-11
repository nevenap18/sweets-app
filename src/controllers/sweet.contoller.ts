import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { SweetService } from "src/services/sweet/sweet.service";
import { Sweet } from "src/entities/sweet.entity";

@Controller('api/sweet')
@Crud({
    model: { type: Sweet },
    params: {
        id: { field: 'sweetId', type: 'number', primary: true }
    },
    query: {
        join: {
          color: {
              eager: true
          },
          origin: {
              eager: true
          },
          photos: {
              eager: true
          },
          sweetKinds: {
              eager: true
          },
          sweetIngredients: {
              eager: true
          },
          kinds: {
              eager: true
          },
          ingredients: {
              eager: true
          }
        },
    },
})
export class SweetController {
    constructor(public service: SweetService) { }
}
