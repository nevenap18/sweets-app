export class AddSweetDto {
  name: string;
  description: string;
  colorId: number;
  originId: number;
  price: number;
  unit: "gr" | "pcs";
  ingredients: {
    ingredientId: number;
  }[];
  kinds: {
    kindId: number;
  }[];
}
