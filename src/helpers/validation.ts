import { SORTING_ORDER, BOOLEAN_MAP } from './constants';

export const isString = (value: any) => typeof value === 'string';
export const isNumber = (value: any) => {
  const newVal = Number(value);
  return typeof newVal === 'number' && !Number.isNaN(newVal);
};
export const isArray = (value: any) => Array.isArray(value);
export const isDate = (value: any) => typeof new Date(value).getDate() === 'number';
export const isSortOrder = (value: any) => value === SORTING_ORDER.ASC || value === SORTING_ORDER.DESC;
export const isBoolean = (value: any) => typeof value === 'boolean' || typeof BOOLEAN_MAP[value] === 'boolean';
export const isEmptyObject = (value: any) => Object.keys(value).length === 0;
