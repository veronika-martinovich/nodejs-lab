import { IProductQueryParams, IProductSearchParams, IProductSortParams, IProductDbParams } from '../types';

export const formProductQueryParams = (queryParams: IProductQueryParams) => {
  const searchParams: IProductSearchParams = {};
  if (queryParams.displayName) searchParams.displayName = queryParams.displayName;
  if (queryParams.createdAt) searchParams.createdAt = queryParams.createdAt;
  if (queryParams?.minRating && searchParams.totalRating) searchParams.totalRating.$gte = Number(queryParams.minRating);
  if (queryParams.price) {
    searchParams.price = {};
    const minPrice = Number(queryParams.price.slice(0, queryParams.price.indexOf(':')));
    const maxPrice = Number(queryParams.price.slice(queryParams.price.indexOf(':') + 1));
    if (minPrice) searchParams.price.$gte = minPrice;
    if (maxPrice) searchParams.price.$lte = maxPrice;
  }

  const sortParams: IProductSortParams = {};
  if (queryParams.sortBy) {
    const sortField = queryParams.sortBy.slice(0, queryParams.sortBy.indexOf(':'));
    const sortDirection = queryParams.sortBy.slice(queryParams.sortBy.indexOf(':') + 1);
    sortParams[sortField] = sortDirection;
  }

  const newParams: IProductDbParams = {
    searchParams,
    sortParams,
  };

  return newParams;
};
