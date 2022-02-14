export const sortByContinent = (a: any, b: any) => {
  var textA = a.continent.name.toUpperCase();
  var textB = b.continent.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export const sortByName = (a: any, b: any) => {
  console.log('a:', a, 'b', b);
  var textA = a.name.toUpperCase();
  var textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}