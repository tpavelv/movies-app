import React, { Component } from 'react';
import './App.css';
import { Tabs } from 'antd';

import SearchTab from '../search-tab';
import RatedTab from '../rated-tab';
import TmdbServices from '../../services/tmdb-servises';
import TmdbProvider from '../tmdb-provider';

export default class App extends Component {
  state = {
    activeTabKey: '1',
  };

  tmdbServices = new TmdbServices();

  componentDidMount() {
    if (!localStorage.length) {
      this.getGuestSession();
    }
  }

  getGuestSession = async () => {
    const guestSession = await this.tmdbServices.createGuestSession().catch(() => {
      this.onError();
    });
    localStorage.setItem(guestSession.guest_session_id, guestSession.expires_at);
  };

  onChangeTabs = () => {
    this.setState(({ activeTabKey }) => {
      if (activeTabKey === '1') {
        return { activeTabKey: '2' };
      }
      return { activeTabKey: '1' };
    });
  };

  onRenderContent = () => {
    if (this.state.activeTabKey === '1') {
      return <SearchTab />;
    }
    return <RatedTab />;
  };

  render() {
    const { activeTabKey } = this.state;
    const content = this.onRenderContent();

    const items = [
      { key: '1', label: 'Search' },
      { key: '2', label: 'Rated' },
    ];

    return (
      <TmdbProvider>
        <div className="App">
          <Tabs activeKey={activeTabKey} onChange={this.onChangeTabs} items={items} centered />
          {content}
        </div>
      </TmdbProvider>
    );
  }
}
