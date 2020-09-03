import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sweet } from "./sweet.entity";

@Index("uq_color_name", ["name"], { unique: true })
@Entity("color")
export class Color {
  @PrimaryGeneratedColumn({ type: "int", name: "color_id", unsigned: true })
  colorId: number;

  @Column("varchar", {
    unique: true,
    length: 50
  })
  name: string;

  @OneToMany(() => Sweet, (sweet) => sweet.color)
  sweets: Sweet[];z
}
