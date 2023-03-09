import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');


const markup = galleryItems.map(({original,preview,description}) =>
    `<div class="gallery__item">
    <a class="gallery__link" href = ${original}>
    <img 
        class="gallery__image"
        src=${preview}
        data-source=${original}
        alt= ${description}
        />
        </a>
        </div>`).join("");
        gallery.innerHTML = markup;
new SimpleLightbox('.gallery a', {captionsData: "alt",  captionDelay: 250,});

