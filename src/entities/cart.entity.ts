import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { SweetCart } from "./sweet-cart.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column("int", { unsigned: true, 
  default: () => "'0'" })
  price: number;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;

  @OneToMany(() => SweetCart, (sweetCart) => sweetCart.cart)
  sweetCarts: SweetCart[];
}
