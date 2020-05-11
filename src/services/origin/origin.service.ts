import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Origin } from 'src/entities/origin.entity';

@Injectable()
export class OriginService extends TypeOrmCrudService<Origin> {
  constructor(@InjectRepository(Origin) private readonly origin: Repository<Origin>) {
    super(origin)
  }
}