import React, { Component } from 'react';
import './App.css';
// import { Spin, Alert, Pagination, Tabs } from 'antd';
import { Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';

import TmdbServices from '../../services/tmdb-servises';
import MoviesList from '../movies-list';
import Header from '../header/header';

export default class App extends Component {
  tmdbServices = new TmdbServices();

  state = {
    data: null,
    searchMovie: 'return',
    viewPage: 1,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchMovie !== this.state.searchMovie) {
      this.debouncedGetData();
    }
    if (prevState.viewPage !== this.state.viewPage) {
      this.getData();
    }
  }

  onSearch = (value) => {
    this.setState({ searchMovie: value });
  };

  debouncedGetData = debounce(() => {
    this.getData();
  }, 600);

  getData = () => {
    this.setState({ loading: true, error: false });
    this.tmdbServices
      .getMovies(this.state.searchMovie, this.state.viewPage)
      .then((data) => {
        console.log(data);
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

    // const TabsPage = () => {
    //   const tabItems = [
    //     {
    //       label: 'Search',
    //       key: '1',
    //       children: (
    //         <>
    //           {/* <Header onSearch={this.onSearch} /> */}
    //           <Header searchMovie={this.state.searchMovie} onSearch={this.onSearch} />
    //           {content}
    //           {pagination}
    //           {errorMessage}
    //         </>
    //       ),
    //     },
    //     {
    //       label: 'Rated',
    //       key: '2',
    //       children: (
    //         <>
    //           {content}
    //           {pagination}
    //           {errorMessage}
    //         </>
    //       ),
    //     },
    //   ];

    //   return <Tabs defaultActiveKey="1" items={tabItems} centered />;
    // };

    return (
      <div className="App">
        {spinner}
        <Header onSearch={this.onSearch} />
        {content}
        {pagination}
        {errorMessage}
      </div>
    );
  }
}
