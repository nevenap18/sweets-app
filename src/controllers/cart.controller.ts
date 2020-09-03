import { Controller, Post, Body } from "@nestjs/common";
import { CartService } from "src/services/cart/cart.service";
import { AddSweetCartDto } from "src/dtos/cart/add.sweet.cart.dto";
import { Cart } from "src/entities/cart.entity";

@Controller('api/cart')
export class CartController {
    constructor(public service: CartService) { }

    @Post('createCart')
    async createCart(@Body() data: AddSweetCartDto): Promise<Cart | null> {

      if (data.sweets.length === 0) return null

      const cart = await this.service.createCart()
      
      console.log(cart)

      return await this.service.addSweetsToCart(cart.cartId, data)
    }
}