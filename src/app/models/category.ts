import { Beer } from './beer';
export class Category {
    id: number;
    name: string;
    archived: boolean;
    beers: Beer[]
}

export class CategoryPost {
    category: Category;
}
