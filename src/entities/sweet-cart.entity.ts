import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Sweet } from "./sweet.entity";

@Index("uq_sweet_cart_sweet_id_cart_id", ["sweetId", "cartId"], {
  unique: true,
})
@Index("fk_sweet_cart_cart_id", ["cartId"], {})
@Entity("sweet_cart")
export class SweetCart {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "sweet_cart_id",
    unsigned: true,
  })
  sweetCartId: number;

  @Column("int", { name: "sweet_id", unsigned: true })
  sweetId: number;

  @Column("int", { name: "cart_id", unsigned: true })
  cartId: number;

  @Column("int", { unsigned: true })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.sweetCarts, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;

  @ManyToOne(() => Sweet, (sweet) => sweet.sweetCarts, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sweet_id", referencedColumnName: "sweetId" }])
  sweet: Sweet;
}
