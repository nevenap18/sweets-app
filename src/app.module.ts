import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Administrator } from './entities/administrator.entity';
import { Cart } from './entities/cart.entity';
import { Color } from './entities/color.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Kind } from './entities/kind.entity';
import { Order } from './entities/order.entity';
import { Origin } from './entities/origin.entity';
import { Photo } from './entities/photo.entity';
import { SweetCart } from './entities/sweet-cart.entity';
import { SweetIngredient } from './entities/sweet-ingredient.entity';
import { SweetKind } from './entities/sweet-kinds.entity';
import { Sweet } from './entities/sweet.entity';
import { AdministratorController } from './controllers/administrator.controller';
import { SweetService } from './services/sweet/sweet.service';
import { AdministratorService } from './services/administrator/administrator.service';
import { DatabaseConfig } from 'config/database.config';
import { SweetController } from './controllers/sweet.contoller';
import { KindService } from './services/kind/kind.service';
import { KindController } from './controllers/kind.controller';
import { ColorService } from './services/color/color.service';
import { ColorController } from './controllers/color.controller';
import { OriginService } from './services/origin/origin.service';
import { OriginController } from './controllers/origin.controller';
import { IngredientService } from './services/ingredient/ingredient.service';
import { IngredientController } from './controllers/ingredient.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [
        Administrator,
        Cart,
        Color,
        Ingredient,
        Kind,
        Order,
        Origin,
        Photo,
        SweetCart,
        SweetIngredient,
        SweetKind,
        Sweet
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Cart,
      Color,
      Ingredient,
      Kind,
      Order,
      Origin,
      Photo,
      SweetCart,
      SweetIngredient,
      SweetKind,
      Sweet
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    SweetController,
    KindController,
    ColorController,
    OriginController,
    IngredientController
  ],
  providers: [
    AdministratorService,
    SweetService,
    KindService,
    ColorService,
    OriginService,
    IngredientService
  ],
})
export class AppModule {}
