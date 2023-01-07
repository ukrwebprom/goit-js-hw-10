import Notiflix from 'notiflix';
const listContainer = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');

const renderList = data => {
  const list = data
    .map(item => {
      return `<li class='country-list__item'><img src="${item.flags.svg}" width="30" height="100%"
        alt="${item.name}"><p class='country-list__name'>${item.name}</p></li>`;
    })
    .join('');
  listContainer.innerHTML = list;
};

const renderCounrty = data => {
  const countryCard = `<div class='country-card__title'><img src="${data.flags.svg}" width="40" height="100%"
    alt="${data.name}"><p class='title'>${data.name}</p></div>
    <p class='country-card__data'>Capital: <span class='country-card__info'>${
      data.capital
    }</span></p>
    <p class='country-card__data'>Population: <span class='country-card__info'>${
      data.population
    }</span></p>
    <p class='country-card__data'>Languages: <span class='country-card__info'>${data.languages
      .map(lang => lang.name)
      .join(', ')}</span></p>
    `;
  countryContainer.innerHTML = countryCard;
};

const clearScreen = () => {
  listContainer.innerHTML = '';
  countryContainer.innerHTML = '';
};

export const fetchCountries = name => {
  if (!name) {
    return;
  }
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      clearScreen();
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1) {
        renderList(data);
      } else {
        renderCounrty(data[0]);
      }
    })
    .catch(error => {
      clearScreen();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};
