import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';

import MoviesList from '../movies-list';
import Header from '../header/header';
import TmdbServices from '../../services/tmdb-servises';

export default class SearchTab extends Component {
  tmdbServices = new TmdbServices();

  state = {
    data: null,
    searchMovie: 'return',
    viewPage: 1,
    loading: true,
    error: false,
    pageRated: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchMovie !== this.state.searchMovie) {
      this.debouncedGetData();
    }
    if (
      prevState.viewPage !== this.state.viewPage ||
      prevState.pageRated !== this.state.pageRated
    ) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({ loading: true, error: false });

    this.tmdbServices
      .getMovies(this.state.searchMovie, this.state.viewPage)
      .then((data) => {
        this.setState(() => ({
          data: data.results,
          page: data.page,
          loading: false,
          totalResults: data.total_results,
        }));
      })
      .catch(() => {
        this.onError();
      });
  };

  onChangePage = (pageNumber) => {
    this.setState({ viewPage: pageNumber });
  };

  onSearch = (value) => {
    setTimeout(() => {
      this.setState({ searchMovie: value, viewPage: 1 });
    }, 1500);
  };

  debouncedGetData = debounce(() => {
    this.getData();
  }, 600);

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
    const pagination = !loading ? (
      <Pagination
        defaultCurrent={this.state.viewPage}
        total={this.state.totalResults}
        pageSize={20}
        showSizeChanger={false}
        hideOnSinglePage={true}
        onChange={(pageNumber) => this.onChangePage(pageNumber)}
        align="center"
      />
    ) : null;

    const errorMessage = error ? <Alert message="Error Text" type="error" /> : null;

    return (
      <>
        <Header searchMovie={this.state.searchMovie} onSearch={this.onSearch} />
        {spinner}
        {content}
        {pagination}
        {errorMessage}
      </>
    );
  }
}
