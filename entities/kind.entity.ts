import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SweetKind } from "./sweet-kinds.entity";

@Index("uq_kind_name", ["name"], { unique: true })
@Entity("kind")
export class Kind {
  @PrimaryGeneratedColumn({ type: "int", name: "kind_id", unsigned: true })
  kindId: number;

  @Column("varchar", {
    unique: true,
    length: 50
  })
  name: string;

  @OneToMany(() => SweetKind, (sweetKind) => sweetKind.kind)
  sweetKinds: SweetKind[];
}
