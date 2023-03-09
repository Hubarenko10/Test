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

gallery.addEventListener('click',openImg);

function openImg(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const selectedImg = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${selectedImg}" width="800" height="600">
`, {
        onShow: (instance) => gallery.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        instance.close();
    }}),
        onClose: (instance) => gallery.removeEventListener('keydown',(e) => {
    if (e.key === 'Escape') {
        instance.close();
    }}),
})
    instance.show();
}



