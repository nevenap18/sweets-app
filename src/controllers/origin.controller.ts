import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Origin } from "src/entities/origin.entity";
import { OriginService } from "src/services/origin/origin.service";

@Controller('api/origin')
@Crud({
    model: { type: Origin },
    params: {
        id: { field: 'originId', type: 'number', primary: true }
    },
    query: {
        join: {
          sweets: {
            eager: true
          }
        },
    },
})
export class OriginController {
    constructor(public service: OriginService) { }
}
