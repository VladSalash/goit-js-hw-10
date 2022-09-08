import debounce from 'lodash.debounce';
import './css/styles.css';
import {Notify} from 'notiflix'
import NewsApiService from './fetchCountries.js';
import {getRefs} from './getRefs.js'
// import {fetchCountries} from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const newsApiService = new NewsApiService();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))


// SEARS INPUT
function onSearch(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();
  clearCountryList()
      clearCountryCard();
  if (inputValue) {
    newsApiService.fetchCountries(inputValue)
    .then(onFetchSuccess)
    .catch(onFetchError);
    return;
  }
newsApiService.resetPage();

}
////////////////////////////////////////////////////////////////////////////////////
// SUCCESS
function onFetchSuccess(data) {
  if ( data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.')
    // newsApiService.resetPage();
    return;
}
  if (data.length === 1) {
    displayCreatingCard(data);


}
  displayCreatingList(data);
}
// ERROR
function onFetchError(e) {
  Notify.failure('Oops, there is no country with that name')
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATING MARKUP LIST COUNTRIES
function displayCreatingList(data) {
  const createList = data.map(({ flags: { svg }, name: { official } }) => {
    return `<li style="font-size:30px;"><img  src="${svg}" alt="${official}" width="20" height="20"/><strong >${official}</strong> </li>`;
  }).join('');

  refs.ul.innerHTML = createList;
}
// CREATING MARKUP CARD(ONE CARD) COUNTRIES
function displayCreatingCard(cardItem) {
  const langs = Object.values(cardItem[0].languages).join(', ');

  const createCard =
      `<ul ">
      <li><strong >Capital:</strong> ${cardItem[0].capital} </li>
      <li><strong >Population:</strong> ${cardItem[0].population }</li>
      <li><strong >Languages:</strong> ${langs}</li>
      </ul>`;

  refs.div.innerHTML = createCard;
}
/////////////////////////////////////////////////////////////////////////////////////


// CLEAR MARKUP/INPUT LIST
function clearCountryList(){
refs.ul.innerHTML = '';
}
// CLEAR MARKUP/INPUT CARD
function clearCountryCard(){
 refs.div.innerHTML = '';
}

////////////////////////////////////////////////////////////////////////////////////











// function onSearch(e) {
//   e.preventDefault();

//   const inputValue = e.target.value.trim();

//   if (newsApiService.query === '') {
//     return alert('Please select a query')
//   }

//    newsApiService.query = e.currentTarget.
//     elements.query.value

//   newsApiService.resetPage();
//   newsApiService.fetchCountries().then(articles => {
//     clearArticlesContainer();
//     appendArticlesMarkup(articles);
//   })
// }

// function appendArticlesMarkup(articles) {
//   refs.div.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

// function clearContainer() {
//   refs.div.insertAdjacentHTML = '';
// }

//   if (data.length >= 2 && data.length <= 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.')
// }