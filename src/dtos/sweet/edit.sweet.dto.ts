export class EditSweetDto {
  name: string;
  description: string;
  colorId: number;
  originId: number;
  price: number;
  unit: "gr" | "pcs";
  ingredients: {
    ingredientId: number;
  }[] | null;
  kinds: {
    kindId: number;
  }[] | null;
}