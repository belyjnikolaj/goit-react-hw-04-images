import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35894225-625d5e541d6373a773e6a79af';

const fetchImages = async (searchText, page) => {
    const params = new URLSearchParams({
    key: API_KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page: page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    const { data } = response;
 
    return data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again later.'
    );

    return null;
  }
};

export default fetchImages;
