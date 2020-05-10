import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Index("uq_order_cart_id", ["cartId"], { unique: true })
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", {
    name: "cart_id",
    unique: true,
    unsigned: true,
    default: () => "'0'",
  })
  cartId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("enum", {
    name: "status",
    enum: ["rejected", "accepted", "shipped", "pending"],
    default: () => "'pending'",
  })
  status: "rejected" | "accepted" | "shipped" | "pending";

  @Column("varchar", { name: "customer_name", length: 50 })
  customerName: string;

  @Column("varchar", { name: "customer_address", length: 200 })
  customerAddress: string;

  @Column("int", { name: "price", unsigned: true })
  price: number;

  @Column("varchar", {
    name: "customer_phone",
    length: 50
  })
  customerPhone: string;

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}
