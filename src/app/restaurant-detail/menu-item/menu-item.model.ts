export class MenuItem {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  restaurantId: number;

  constructor(
    id: number,
    name: string,
    imagePath: string,
    description: string,
    price: number,
    restaurantId: number
  ) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.description = description;
    this.price = price;
    this.restaurantId = restaurantId;
  }
}
