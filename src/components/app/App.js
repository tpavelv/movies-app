import React, { Component } from 'react';
import './App.css';
import { Spin, Alert } from 'antd';

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
    loading: true,
    error: false,
  };

  getData() {
    this.tmdbServices
      .getMovies(this.state.searchMovie)
      .then((data) => {
        this.setState(() => ({ data: data.results, page: data.page, loading: false }));
      })
      .catch(() => {
        this.onError();
      });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { data, loading, error } = this.state;
    const spinner = loading ? <Spin size="large" fullscreen /> : null;
    const content = !loading ? <MoviesList data={data} /> : null;
    const errorMessage = error ? <Alert message="Error Text" type="error" /> : null;
    return (
      <div className="App">
        {spinner}
        {content}
        {errorMessage}
      </div>
    );
  }
}
