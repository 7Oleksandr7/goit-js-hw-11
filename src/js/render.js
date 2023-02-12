export function renderListElements(elements, list) {
  const markup = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
        <div class="photo-card__img-cont">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>
      </a>`;
      }
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
}
