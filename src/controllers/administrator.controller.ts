import { Controller, Get, Param, Body, Post } from "@nestjs/common";
import { Administrator } from "src/entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/administrator')
export class AdministratorController {
  constructor(private administratorService: AdministratorService) { }

  @Get() // GET http://localhost:3000/api/administrator/
  getAllAdmins(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }

  @Get(':id') // GET http://localhost:3000/api/administrator/2/
  getSingleAdministrator(@Param('id') id: number): Promise<Administrator | ApiResponse> {
    return this.administratorService.getById(id);
  }

  @Post() // POST http://localhost:3000/api/administrator/
  add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
    return this.administratorService.add(data);
  }
}