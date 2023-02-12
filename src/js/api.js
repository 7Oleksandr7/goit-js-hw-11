import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '33398437-4a7cf00c243fc948d6b5828b7';

export async function getImages(query, page = 1) {
  const response = await axios.get(
    `${ENDPOINT}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  const images = await response.data;
  return images;
}
