import axios from 'axios';

const API_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const API_KEY = '14071590-18eb9b3c58188a68f5a4a0fa6';

const fetchImages = (query, page) => {
  return axios
    .get(`${API_URL + query}&page=${page}&per_page=12&key=${API_KEY}`)
    .then(response => response.data.hits);
};
export default fetchImages;
