import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from 'src/services/administrator/administrator.service';

@Controller('api/administrator')
export class ApiAdministratorController {
  constructor(private administratorService: AdministratorService) { }

  @Get() // GET http://localhost:3000/api/administrator/
  getAllAdministrators(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }

  @Get(':id') // GET http://localhost:3000/api/administrator/2/
  getSingleAdministrator(@Param('id') id: number): Promise<Administrator> {
    return this.administratorService.getById(id);
  }
}