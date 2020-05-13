import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrator } from 'src/entities/administrator.entity';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administrator: Repository<Administrator>
  ) {}

  getAll(): Promise<Administrator[]>  {
    return this.administrator.find()
  }

  async getByUsername(usernameArg: string): Promise<Administrator | null> {
    const admin = await this.administrator.findOne({
      username: usernameArg
    })

    return admin || null
  }

  getById(id: number): Promise<Administrator> {
      return this.administrator.findOne(id)
  }

  add(data: AddAdministratorDto): Promise<Administrator | ApiResponse>  {

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