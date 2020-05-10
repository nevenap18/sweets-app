import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sweet } from "./sweet.entity";

@Index("uq_origin_name", ["name"], { unique: true })
@Entity("origin")
export class Origin {
  @PrimaryGeneratedColumn({ type: "int", name: "origin_id", unsigned: true })
  originId: number;

  @Column("varchar", {
    unique: true,
    length: 50
  })
  name: string;

  @OneToMany(() => Sweet, (sweet) => sweet.origin)
  sweets: Sweet[];
}
