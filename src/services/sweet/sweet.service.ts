import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sweet } from 'src/entities/sweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SweetService extends TypeOrmCrudService<Sweet> {
  constructor(@InjectRepository(Sweet) private readonly sweet: Repository<Sweet>) {
    super(sweet)
  }
}
