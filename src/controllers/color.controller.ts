import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Color } from "src/entities/color.entity";
import { ColorService } from "src/services/color/color.service";

@Controller('api/color')
@Crud({
    model: { type: Color },
    params: {
        id: { field: 'colorId', type: 'number', primary: true }
    },
    query: {
        join: {
          sweets: {
            eager: true
          }
        },
    },
})
export class ColorController {
    constructor(public service: ColorService) { }
}
