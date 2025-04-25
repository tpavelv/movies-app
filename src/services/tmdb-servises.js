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

  async getMovies(name, page) {
    const url = `${this.apiBase}?query=${name}&include_adult=false&page=${page}'$`;
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

  async getGenre() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    try {
      const response = await fetch(url, this.options);
      if (!response.ok) {
        throw new Error(
          `Не удалось получить данные о жанрах с сервера ${url}, код ${response.status}`
        );
      }
      return response.json();
    } catch (error) {
      console.error('new Error:', error);
      throw error;
    }
  }

  async createGuestSession() {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    try {
      const response = await fetch(url, this.options);
      if (!response.ok) {
        throw new Error(`Не удалось создать гостевую сессию ${url}, код ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('new Error:', error);
      throw error;
    }
  }

  async setRate(movieId, sessionId, value) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: `{"value":${value}}`,
    };
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Не удалось поставить рейтинг ${url}, код ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('new Error:', error);
      throw error;
    }
  }

  async getRatedMovies(sessionId, page) {
    const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&page=${page}`;
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
