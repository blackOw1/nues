import { replaceQueryValue } from './urlFormatter';

export const upperCase = (str) => str.toUpperCase();

export const upperCaseFirstCharacter = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const lowerCase = (str) => str.toLowerCase();

export const replaceSpecialCharacters = (str) => str.replace(/[^a-zA-Z0-9 ]/g, ' ');

export const modifyQueryString = (query = '') => {
  query = replaceSpecialCharacters(query);
  query = replaceQueryValue(query, ' ');
  return query;
};
