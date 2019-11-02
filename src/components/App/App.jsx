import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import Gallery from '../Gallery/Gallery';
import Searchform from '../SearchForm/SearchForm';
import styles from './App.module.css';
import fetchImages from './api';

export default class App extends Component {
  initialState = {
    query: '',
    galleryItems: [],
    page: 1,
    modalURL: null,
    loader: false,
  };

  state = { ...this.initialState };

  componentDidMount() {
    const { query, page } = this.state;
    this.setState({
      loader: true,
    });
    fetchImages(query, page).then(data => {
      this.setState({
        galleryItems: data,
        loader: false,
      });
    });
  }

  handleFetch = (query, page, items) => {
    this.setState(prev => ({
      galleryItems: [...prev.galleryItems, ...items],
      query,
      page,
      loader: false,
    }));
  };

  openModal = largeImageURL => {
    this.setState({ modalURL: largeImageURL });
  };

  closeModal = () => {
    this.setState({ modalURL: null });
  };

  onSubmit = inputValue => {
    this.setState({
      query: inputValue,
      page: 1,
      galleryItems: [],
      loader: true,
    });
    fetchImages(inputValue, 1).then(data => {
      this.handleFetch(inputValue, 1, data);
    });
  };

  loadMore = () => {
    const { query, page } = this.state;
    this.setState({
      loader: true,
    });
    fetchImages(query, page + 1).then(data => {
      this.handleFetch(query, page + 1, data);
      window.scrollBy({
        top: window.innerHeight - 50,
        behavior: 'smooth',
      });
    });
  };

  render() {
    const { galleryItems, modalURL, loader } = this.state;
    return (
      <div className={styles.app}>
        <Searchform onSubmit={this.onSubmit} handleChange={this.handleChange} />
        {!!galleryItems && (
          <Gallery openModal={this.openModal} galleryItems={galleryItems} />
        )}
        {loader && (
          <div className={styles.loader}>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        <button className={styles.button} type="button" onClick={this.loadMore}>
          Load more
        </button>
        {!!modalURL && (
          <Modal onClose={this.closeModal}>
            <img alt="large" src={modalURL} />
          </Modal>
        )}
      </div>
    );
  }
}
