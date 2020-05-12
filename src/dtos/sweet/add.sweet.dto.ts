export class AddArticleDto {
  name: string;
  description: string;
  colorId: number;
  originId: number;
  price: number;
  unit: string;
  ingredients: {
      ingredientId: number;
      value: string;
  }[];
  kinds: {
    kindId: number;
    value: string;
}[];
}
