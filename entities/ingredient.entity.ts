import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SweetIngredient } from "./sweet-ingredient.entity";

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
}
