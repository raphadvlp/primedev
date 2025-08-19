import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3
// URL DA API: https://api.themoviedb.org/3/movie/now_playing

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;