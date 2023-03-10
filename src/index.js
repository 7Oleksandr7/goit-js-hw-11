import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/api';
import { renderListElements } from './js/render';

const formSearch = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';
let totalPages = 0;

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
formSearch.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';

  loadMoreBtn.classList.add('is-hidden');

  try {
    const images = await getImages(query);
    if (images.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${images.totalHits} images.`);
    renderListElements(images.hits, gallery);
    new SimpleLightbox('.gallery a').refresh();

    totalPages = Math.ceil(images.totalHits / 40);
    if (totalPages > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtnClick() {
  page += 1;
  if (page > totalPages) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtnEl.classList.add('is-hidden');
    return;
  }

  try {
    const images = await getImages(query, page);
    renderListElements(images.hits, gallery);
    new SimpleLightbox('.gallery a').refresh();
    scrollPage();
  } catch (error) {
    console.log(error);
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
