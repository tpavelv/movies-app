import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
  state = {
    searchText: '',
  };

  onChangeValue = (e) => {
    this.setState({ searchText: e.target.value });
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) this.props.onSearch(this.state.searchText);
  }

  render() {
    return (
      <header className="App__header header">
        <input
          type="text"
          placeholder="Type to search"
          className="header__input"
          value={this.state.searchText}
          onChange={this.onChangeValue}
        ></input>{' '}
      </header>
    );
  }
}
