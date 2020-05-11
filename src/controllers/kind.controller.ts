import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { KindService } from "src/services/kind/kind.service";
import { Kind } from "src/entities/kind.entity";

@Controller('api/kind')
@Crud({
    model: { type: Kind },
    params: {
        id: { field: 'kindId', type: 'number', primary: true }
    },
    query: {
        join: {
          sweetKinds: {
            eager: true
          },
          sweets: {
            eager: true
          }
        },
    },
})
export class KindController {
    constructor(public service: KindService) { }
}
