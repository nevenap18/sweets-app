import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { SweetCart } from 'src/entities/sweet-cart.entity';
import { Sweet } from 'src/entities/sweet.entity';
import { AddSweetCartDto } from 'src/dtos/cart/add.sweet.cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cart: Repository<Cart>,

    @InjectRepository(SweetCart)
    private readonly sweetCart: Repository<SweetCart>,

    @InjectRepository(Sweet)
    private readonly sweet: Repository<Sweet>
  ){}

  async createCart(): Promise<Cart> {

    const newCart: Cart = new Cart()

    return await this.cart.save(newCart)
  }

  async addSweetsToCart(cartId: number, data: AddSweetCartDto): Promise<Cart> {

    let price = 0

    for (let sweet of data.sweets) {
      let newSweetCart: SweetCart = new SweetCart()
      newSweetCart.cartId = cartId
      newSweetCart.sweetId = sweet.sweetId
      newSweetCart.quantity = sweet.quantity

      price += sweet.price

      await this.sweetCart.save(newSweetCart)
    }
    
      let cart = await this.getCartById(cartId)

      cart.price += price

      return await this.cart.save(cart)
  }
  
  async getCartById(cartId: number): Promise<Cart> {
    return this.cart.findOne(cartId, {
      relations: [
        "sweetCarts",
        "sweetCarts.sweet"
      ]
    })
  }
}
