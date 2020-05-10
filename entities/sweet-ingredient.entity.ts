import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./ingredient.entity";
import { Sweet } from "./sweet.entity";

@Index(
  "uq_sweet_ingredient_sweet_id_ingredient_id",
  ["sweetId", "ingredientId"],
  { unique: true }
)
@Index("fk_sweet_ingredient_ingredient_id", ["ingredientId"], {})
@Entity("sweet_ingredient")
export class SweetIngredient {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "sweet_ingredient",
    unsigned: true,
  })
  sweetIngredient: number;

  @Column("int", { name: "sweet_id", unsigned: true })
  sweetId: number;

  @Column("int", {
    name: "ingredient_id",
    unsigned: true
  })
  ingredientId: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.sweetIngredients, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }])
  ingredient: Ingredient;

  @ManyToOne(() => Sweet, (sweet) => sweet.sweetIngredients, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sweet_id", referencedColumnName: "sweetId" }])
  sweet: Sweet;
}
