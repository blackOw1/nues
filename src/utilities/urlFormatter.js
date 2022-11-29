export const createQueryString = (data = []) => {
  return data.map((entry) => `&${entry[0]}=${entry[1]}`).join('');
};

export const replaceQueryValue = (value, replaceWith = '') =>
  value
    .trim()
    .split(' ')
    .filter((str) => str)
    .join(replaceWith);

export const replacePageNumber = (urlQuery, pageNumber) => {
  const originalQuery = urlQuery.split('&');
  const pageQuery = originalQuery.find((q) => q.includes('page') && !q.includes('_'));
  if (!pageQuery) return `${urlQuery}&page=${pageNumber}`;
  const indexOfEqualSign = pageQuery.indexOf('=');
  const numberToDelete = pageQuery.slice(indexOfEqualSign + 1 - pageQuery.length);
  const result = pageQuery.replace(numberToDelete, pageNumber);

  return urlQuery.replace(pageQuery, result);
};
