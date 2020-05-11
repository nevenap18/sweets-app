import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { SweetIngredient } from "./sweet-ingredient.entity";
import { Sweet } from "./sweet.entity";

@Index("uq_ingredient_name", ["name"], { unique: true })
@Entity("ingredient")
export class Ingredient {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_id",
    unsigned: true,
  })
  ingredientId: number;

  @Column("varchar", {
    unique: true,
    length: 50
  })
  name: string;

  @OneToMany(
    () => SweetIngredient,
    (sweetIngredient) => sweetIngredient.ingredient
  )
  sweetIngredients: SweetIngredient[];

  @ManyToMany(type => Sweet)
  @JoinTable({
    name: 'sweet_ingredient',
    joinColumn: { name: 'ingredient_id', referencedColumnName: 'ingredientId' },
    inverseJoinColumn: { name: 'sweet_id', referencedColumnName: 'sweetId' },
  })
  sweets: Sweet[];
}
