import './css/styles.css';
import _ from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const listContainer = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

const searchError = () => {Notiflix.Notify.failure('Oops, there is no country with that name');}
const tooManyResults = () => {Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');}
const clearScreen = () => {
  listContainer.innerHTML = '';
  countryContainer.innerHTML = '';
};

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

const DEBOUNCE_DELAY = 300;


searchBox.addEventListener(
  'input',
  _(evt => {
    const request = evt.target.value.trim();
    if (!request) {
      return
    }
    fetchCountries(request).then(data => {
      clearScreen();
      if (data.length > 10) {tooManyResults();} 
      else if (data.length > 1) {renderList(data);} 
      else {renderCounrty(data[0]);}
    })
    .catch(error => searchError());
  }, DEBOUNCE_DELAY)
);
