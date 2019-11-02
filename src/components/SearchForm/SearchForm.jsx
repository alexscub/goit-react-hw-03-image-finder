import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

export default class SearchForm extends Component {
  initialState = {
    value: '',
  };

  state = { ...this.initialState };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const { onSubmit } = this.props;
    const handleSubmit = e => {
      e.preventDefault();
      onSubmit(value);
      this.setState({
        ...this.initialState,
      });
    };
    return (
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          onChange={this.handleChange}
          value={value}
        />
      </form>
    );
  }
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
