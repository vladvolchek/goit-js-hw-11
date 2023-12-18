import { getPhoto } from "./js/api";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let page = 1;


const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const input = document.querySelector('#input_name');
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.style.display = 'none'


function createMarkup(images) {
  const result = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
      `<div class="photo-card item">
      <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" height="390" width="600"/>
</a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`
  ).join('');
  return result;
};

// Lightbox
const lightbox = new SimpleLightbox('.gallery a', {
captionsData: 'alt',
captionDelay: 250 });


async function onSearch(event) {
  event.preventDefault();
  page = 1;
  const result = await getPhoto(`${input.value}`, page)
  console.log(result);
  loadMoreBtn.style.display = 'block';
  if(result.totalHits === 0){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreBtn.style.display = 'none';
  } else {
        Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
  };
  
  
  
  const markup = createMarkup(result.hits);
  console.log(markup);
  gallery.innerHTML = createMarkup(result.hits);
  lightbox.refresh()

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  
}

  
  
  
  function onLoadMore() {
    page +=1;
    getPhoto(input.value, page)
    .then(response =>{
      console.log(response);
      gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
      lightbox.refresh();
      
      const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
      
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
      if(page * 40 >= response.totalHits) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results");
        loadMoreBtn.style.display = 'none';
      };
    })
    
  };