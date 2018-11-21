export class Restaurant {
  id: number;
  name: string;
  category: string;
  deliveryEstimate: string;
  rating: number;
  imagePath: string;
  about: string;
  hours: string;

  constructor(
    id: number,
    name: string,
    category: string,
    deliveryEstimate: string,
    rating: number,
    imagePath: string,
    about: string,
    hours: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.deliveryEstimate = deliveryEstimate;
    this.rating = rating;
    this.imagePath = imagePath;
    this.about = about;
    this.hours = hours;
  }
}
