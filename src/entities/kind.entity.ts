import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { SweetKind } from "./sweet-kinds.entity";
import { Sweet } from "./sweet.entity";

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

  @ManyToMany(type => Sweet)
  @JoinTable({
    name: 'sweet_kind',
    joinColumn: { name: 'kind_id', referencedColumnName: 'kindId' },
    inverseJoinColumn: { name: 'sweet_id', referencedColumnName: 'sweetId' },
  })
  sweets: Sweet[];

}
