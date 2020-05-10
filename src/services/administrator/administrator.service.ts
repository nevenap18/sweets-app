import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrator } from 'src/entities/administrator.entity';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administrator: Repository<Administrator>
  ) {}

  getAll(): Promise<Administrator[]>  {
    return this.administrator.find()
  }

  getById(id: number): Promise<Administrator | ApiResponse> {
    return new Promise(async (resolve) => {
      let admin = await this.administrator.findOne(id)
      
      if(!admin) {
        resolve(new ApiResponse('error', -1002, 'admin_does_not_exist'))
      }

      resolve(admin)

    })


    return this.administrator.findOne(id)
  }
  add(data: AddAdministratorDto): Promise<Administrator | ApiResponse>  {
    const crypto = require('crypto')

    const passwordHash = crypto.createHash('sha512')
    passwordHash.update(data.password)

    const passwordHashString = passwordHash.digest('hex').toUpperCase()

    let newAdmin: Administrator = new Administrator()
    newAdmin.username = data.username
    newAdmin.passwordHash = passwordHashString

    return new Promise(resolve => {
      this.administrator.save(newAdmin)
          .then(data => resolve(data))
          .catch(() => resolve(new ApiResponse("error", -1001, "invalid_input")));
  });
  }
}