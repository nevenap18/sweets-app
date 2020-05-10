import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sweet } from "./sweet.entity";

@Index("uq_photo_image_path", ["imagePath"], { unique: true })
@Index("fk_photo_sweet_id", ["sweetId"], {})
@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { name: "sweet_id", unsigned: true, default: () => "'0'" })
  sweetId: number;

  @Column("varchar", {
    name: "image_path",
    unique: true,
    length: 250
  })
  imagePath: string;

  @ManyToOne(() => Sweet, (sweet) => sweet.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sweet_id", referencedColumnName: "sweetId" }])
  sweet: Sweet;
}
