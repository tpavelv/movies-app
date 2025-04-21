import React, { Component } from 'react';
import './App.css';
import { Spin, Alert, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';

import TmdbServices from '../../services/tmdb-servises';
import MoviesList from '../movies-list';
import Header from '../header/header';
import TmdbProvider from '../../tmdb-provider';

export default class App extends Component {
  tmdbServices = new TmdbServices();

  state = {
    data: null,
    searchMovie: 'return',
    viewPage: 1,
    loading: true,
    error: false,
    activeTabKey: '1',
    pageRated: false,
  };

  componentDidMount() {
    this.getData();
    if (!localStorage.length) {
      this.getGuestSession();
    }
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

  onSearch = (value) => {
    setTimeout(() => {
      this.setState({ searchMovie: value, viewPage: 1 });
    }, 1500);
  };

  debouncedGetData = debounce(() => {
    this.getData();
  }, 600);

  getData = () => {
    this.setState({ loading: true, error: false });
    if (!this.state.pageRated) {
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
    } else {
      this.tmdbServices
        .getRatedMovies(localStorage.key(0))
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
    }
  };

  getGuestSession = async () => {
    const guestSession = await this.tmdbServices.createGuestSession().catch(() => {
      this.onError();
    });
    localStorage.setItem(guestSession.guest_session_id, guestSession.expires_at);
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

  onChangeTabs = () => {
    this.setState(({ activeTabKey }) => {
      if (activeTabKey === '1') {
        return { activeTabKey: '2', pageRated: true };
      }
      return { activeTabKey: '1', pageRated: false };
    });
  };

  render() {
    const { data, loading, error, activeTabKey } = this.state;
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

    const TabsPage = () => {
      const tabItems = [
        {
          label: 'Search',
          key: '1',
          children: (
            <>
              <Header searchMovie={this.state.searchMovie} onSearch={this.onSearch} />
              {content}
              {pagination}
              {errorMessage}
            </>
          ),
        },
        {
          label: 'Rated',
          key: '2',
          children: (
            <>
              {content}
              {pagination}
              {errorMessage}
            </>
          ),
        },
      ];

      return (
        <Tabs activeKey={activeTabKey} items={tabItems} centered onChange={this.onChangeTabs} />
      );
    };

    return (
      <TmdbProvider>
        <div className="App">
          {spinner}
          <TabsPage></TabsPage>
        </div>
      </TmdbProvider>
    );
  }
}
