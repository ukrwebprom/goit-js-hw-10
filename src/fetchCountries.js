export const fetchCountries = async (name) => {
  const result = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`);
  if (!result.ok) {
    throw new Error(result.status);
  }
  return await result.json();
};


/* export const fetchCountries = async name => {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error);
    });
}; */