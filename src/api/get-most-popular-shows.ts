import axios from 'axios';

export async function getMostPopularShows(page: number) {
  const { data } = await axios.get(`https://www.episodate.com/api/most-popular?page=${page}`);
  return data
}
