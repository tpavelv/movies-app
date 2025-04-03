import React, { Component } from 'react';

import './App.css';
import TmdbServices from '../../services/tmdb-servises';
import MoviesList from '../movies-list';

export default class App extends Component {
  constructor() {
    super();
    this.getData();
  }

  tmdbServices = new TmdbServices();

  state = {
    data: null,
    searchMovie: 'return',
  };

  getData() {
    this.tmdbServices
      .getMovies(this.state.searchMovie)
      .then((data) => {
        this.setState(() => ({ data: data.results, page: data.page }));
      })
      .catch((err) => console.error('Could not fetch', err));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <MoviesList data={data} />
      </div>
    );
  }
}
