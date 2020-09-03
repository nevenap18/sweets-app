import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Photo } from "./photo.entity";
import { SweetCart } from "./sweet-cart.entity";
import { Color } from "./color.entity";
import { SweetIngredient } from "./sweet-ingredient.entity";
import { SweetKind } from "./sweet-kinds.entity";
import { Origin } from "./origin.entity";
import { Kind } from "./kind.entity";
import { Ingredient } from "./ingredient.entity";

@Index("fk_sweet_color_idd", ["colorId"], {})
@Index("fk_sweet_origin_idd", ["originId"], {})
@Index("fk_sweet_photo_idd", ["photoId"], {})
@Entity("sweet")
export class Sweet {
  @PrimaryGeneratedColumn({ type: "int", name: "sweet_id", unsigned: true })
  sweetId: number;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", { length: 250 })
  description: string;

  @Column("int", { name: "color_id", unsigned: true })
  colorId: number;

  @Column("int", { name: "origin_id", unsigned: true })
  originId: number;

  @Column("int", { name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { unsigned: true })
  price: number;

  @Column("enum", { enum: ["gr", "pcs"], default: () => "'gr'" })
  unit: "gr" | "pcs";

  @OneToMany(() => Photo, (photo) => photo.sweet)
  photos: Photo[];

  @JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
  photo: Photo;

  @OneToMany(() => SweetCart, (sweetCart) => sweetCart.sweet)
  sweetCarts: SweetCart[];

  @ManyToOne(() => Color, (color) => color.sweets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "color_id", referencedColumnName: "colorId" }])
  color: Color;

  @OneToMany(() => SweetIngredient, (sweetIngredient) => sweetIngredient.sweet)
  sweetIngredients: SweetIngredient[];

  @ManyToMany(type => Ingredient)
  @JoinTable({
    name: 'sweet_ingredient',
    joinColumn: { name: 'sweet_id', referencedColumnName: 'sweetId' },
    inverseJoinColumn: { name: 'ingredient_id', referencedColumnName: 'ingredientId' },
  })
  ingredients: Ingredient[];

  @OneToMany(() => SweetKind, (sweetKind) => sweetKind.sweet)
  sweetKinds: SweetKind[];

  @ManyToMany(type => Kind)
  @JoinTable({
    name: 'sweet_kind',
    joinColumn: { name: 'sweet_id', referencedColumnName: 'sweetId' },
    inverseJoinColumn: { name: 'kind_id', referencedColumnName: 'kindId' },
  })
  kinds: Kind[];

  @ManyToOne(() => Origin, (origin) => origin.sweets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "origin_id", referencedColumnName: "originId" }])
  origin: Origin;
}
