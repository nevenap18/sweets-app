export class AddSweetCartDto {
  sweets: {
    sweetId: number;
    quantity: number;
    price: number;
  }[]
}