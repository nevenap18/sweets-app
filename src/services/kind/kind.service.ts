import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kind } from 'src/entities/kind.entity';

@Injectable()
export class KindService extends TypeOrmCrudService<Kind> {
  constructor(@InjectRepository(Kind) private readonly kind: Repository<Kind>) {
    super(kind)
  }
}