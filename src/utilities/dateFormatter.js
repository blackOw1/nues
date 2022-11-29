const dateFormatter = (date) => {
  const months = new Map([
    ['Jan', 'January'],
    ['Feb', 'February'],
    ['Mar', 'March'],
    ['Apr', 'April'],
    ['May', 'May'],
    ['Jun', 'June'],
    ['Jul', 'July'],
    ['Aug', 'August'],
    ['Sep', 'September'],
    ['Oct', 'October'],
    ['Nov', 'November'],
    ['Dec', 'December'],
  ]);
  const [month, day, year] = new Date(date).toDateString().split(' ').slice(1, 4);

  return `${months.get(month)} ${day}, ${year}`;
};

export default dateFormatter;
