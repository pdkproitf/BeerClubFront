export class Beer{
  id: number;
  manufacurter: string;
  name: string;
  country: string;
  price: number;
  description: string;
  archived: boolean;
  count: number;
  category_id: number;
}

export class BeerPost{
  beer: Beer;
}
