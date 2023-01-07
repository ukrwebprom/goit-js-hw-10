import './css/styles.css';
import _ from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
searchBox.addEventListener(
  'input',
  _(evt => {
    fetchCountries(evt.target.value.trim());
  }, DEBOUNCE_DELAY)
);
