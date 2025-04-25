import React, { Component } from 'react';

import TmdbServices from '../../services/tmdb-servises';
import Context from '../tmdb-context';

export default class TmdbProvider extends Component {
  state = {
    genres: null,
    name: 123,
  };

  static convGenre = (arr) => {
    const resultObj = {};
    arr.forEach((el) => {
      resultObj[el.id] = el.name;
    });
    return resultObj;
  };

  componentDidMount() {
    this.tmdbServices = new TmdbServices();
    this.tmdbServices.getGenre().then((genres) => {
      const newGenres = TmdbProvider.convGenre(genres.genres);

      this.setState({ genres: newGenres });
    });
  }

  render() {
    const { genres } = this.state;
    return (
      <Context.Provider value={{ ...genres, tmdbServices: this.tmdbServices }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
