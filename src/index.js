import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

loader.style.display = 'block';
catInfo.style.display = 'none';
errorText.style.display = 'none';

fetchBreeds().then(renderOptions).catch(handleError);

breedSelect.addEventListener('change', e => {
  const breedId = e.target.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorText.style.display = 'none';

  fetchCatByBreed(breedId).then(displayCatInfo).catch(handleError);
});

function renderOptions(breeds) {
  const options = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  breedSelect.innerHTML = options;
}

function displayCatInfo(catData) {
  const cat = catData[0];

  const catImage = document.createElement('img');
  catImage.src = cat.url;
  catImage.alt = 'Cat Image';
  catImage.width = 500;

  const name = document.createElement('h3');
  name.textContent = cat.breeds[0].name;

  const description = document.createElement('p');
  description.innerHTML = `<b>Description:</b> ${cat.breeds[0].description}`;

  const temperament = document.createElement('p');
  temperament.innerHTML = `<b>Temperament:</b> ${cat.breeds[0].temperament}`;
  catInfo.innerHTML = '';
  catInfo.appendChild(catImage);
  catInfo.appendChild(name);
  catInfo.appendChild(description);
  catInfo.appendChild(temperament);

  catInfo.style.display = 'block';
  loader.style.display = 'none';
}

function handleError(error) {
  errorText.style.display = 'block';
  loader.style.display = 'none';
  console.error(error);
}
