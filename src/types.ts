export interface IProduct {
  __id?: string;
  displayName: string;
  categoryId?: string;
  createdAt?: Date;
  totalRating: number;
  price: number;
}

export interface ICategory {
  __id?: string;
  displayName: string;
  createdAt?: Date;
}
