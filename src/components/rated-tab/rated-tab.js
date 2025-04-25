import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import MoviesList from '../movies-list';
import TmdbServices from '../../services/tmdb-servises';

export default class RatedTab extends Component {
  state = {
    data: null,
    viewPage: 1,
    loading: true,
    error: false,
  };

  tmdbServices = new TmdbServices();

  componentDidMount() {
    this.getRatedData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.viewPage !== this.state.viewPage) {
      this.getRatedData();
    }
  }

  getRatedData = () => {
    this.setState({ loading: true, error: false });
    this.tmdbServices
      .getRatedMovies(localStorage.key(0), this.state.viewPage)
      .then((data) => {
        this.setState(() => ({
          data: data.results,
          // page: data.page,
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
        {spinner}
        {content}
        {pagination}
        {errorMessage}
      </>
    );
  }
}
