import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
  state = {
    searchText: '',
  };

  inputRef = React.createRef();

  onChangeValue = (e) => {
    this.setState({ searchText: e.target.value });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) this.props.onSearch(this.state.searchText);
  }

  render() {
    return (
      <header className="App__header header">
        <input
          ref={this.inputRef}
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
