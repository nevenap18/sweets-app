import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Kind } from "./kind.entity";
import { Sweet } from "./sweet.entity";

@Index("uq_sweet_kind_sweet_id_kind_id", ["sweetId", "kindId"], {
  unique: true,
})
@Index("fk_sweet_kind_kind_id", ["kindId"], {})
@Entity("sweet_kind")
export class SweetKind {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "sweet_kind_id",
    unsigned: true,
  })
  sweetKindId: number;

  @Column("int", { name: "sweet_id", unsigned: true })
  sweetId: number;

  @Column("int", { name: "kind_id", unsigned: true })
  kindId: number;

  @ManyToOne(() => Kind, (kind) => kind.sweetKinds, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "kind_id", referencedColumnName: "kindId" }])
  kind: Kind;

  @ManyToOne(() => Sweet, (sweet) => sweet.sweetKinds, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sweet_id", referencedColumnName: "sweetId" }])
  sweet: Sweet;
}
