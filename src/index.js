import './css/styles.css';
import _ from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import listTpl from './templates/list.hbs';
import cardTpl from './templates/card.hbs';
const listContainer = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

const searchError = () => {Notiflix.Notify.failure('Oops, there is no country with that name');}
const tooManyResults = () => {Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');}
const clearScreen = () => {
  listContainer.innerHTML = '';
  countryContainer.innerHTML = '';
};

const renderList = data => {
  const list = data.map(item => {return listTpl({flag:item.flags.svg, name:item.name})}).join('');
  listContainer.innerHTML = list;
};

const renderCounrty = data => {
  const countryCard = cardTpl({
    flag: data.flags.svg,
    name: data.name,
    capital: data.capital,
    population: data.population,
    languages: data.languages.map(lang => lang.name).join(', ')
  });
  countryContainer.innerHTML = countryCard;
};

const getCountries = async (evt) => {
  const request = evt.target.value.trim();
  if (!request) {
    return
  }
  clearScreen();
  try {
    const data = await fetchCountries(request);
    
    if (data.length > 10) {tooManyResults();} 
    else if (data.length > 1) {renderList(data);} 
    else {renderCounrty(data[0]);}
  } catch {
    searchError();
  }
}

const DEBOUNCE_DELAY = 300;


searchBox.addEventListener('input', _(getCountries , DEBOUNCE_DELAY));

