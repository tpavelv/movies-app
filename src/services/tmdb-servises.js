export default class TmdbServices {
  apiBase = 'https://api.themoviedb.org/3/search/movie';

  apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU1NTdiZmI2NTFjNDRlZTE2NjNlZjZlNTUyMzg0YSIsIm5iZiI6MTc0MzUxMDA5OS40MzEsInN1YiI6IjY3ZWJkYTUzNTFmNjI1NGY3NjhiZjQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3DsV6iirTtwSQnX8R3iHoSoBLJ_P1Op7otaWoiZny4k';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    },
  };

  async getMovies(name) {
    const url = `${this.apiBase}?query=${name}&include_adult=false&page=1'$`;
    try {
      const response = await fetch(url, this.options);
      if (!response.ok) {
        throw new Error(`Не удалось получить данные с сервера ${url}, код ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('new Error:', error);
      throw error;
    }
  }
}
