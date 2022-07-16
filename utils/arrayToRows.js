const getDate = (date) => new Date(date).toDateString();

export const arrayToRows = (arr) => {
  return arr.reduce((currentObj, item) => {
    const date = getDate(item.createdAt);

    if (currentObj[date]) currentObj[date].push(item);
    else currentObj[date] = [item];

    return currentObj;
  }, {});
};
