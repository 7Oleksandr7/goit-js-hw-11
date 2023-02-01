import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputCountry.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  let name = e.target.value.trim();
  if (!name) {
    clearCountry();
    return;
  }
  fetchCountries(name)
    .then(array => {
      clearCountry();
      if (array.length >= 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (array.length >= 2 && array.length <= 10) {
        renderCountriesList(array);
      } else {
        renderCountry(array);
      }
    })
    .catch(err => {
      clearCountry();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountry(country) {
  const markup = country
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => {
        let languagesString = Object.values(languages).join(', ');
        return `<img src="${svg}" alt="flag" width="50"/>
          <h2>${official}</h2>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Languages:</b> ${languagesString}</p>`;
      }
    )
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class=country-item>
          <img src="${svg}" alt="flag" width="30"/>
          <p> ${official} </p>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);
}

function clearCountry() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
