import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from 'src/entities/color.entity';

@Injectable()
export class ColorService extends TypeOrmCrudService<Color> {
  constructor(@InjectRepository(Color) private readonly color: Repository<Color>) {
    super(color)
  }
}