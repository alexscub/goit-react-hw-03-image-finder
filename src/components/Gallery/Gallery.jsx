import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard/PhotoCard';
import styles from './Gallery.module.css';

const Gallery = ({ galleryItems, openModal }) => (
  <ul className={styles.gallery}>
    {galleryItems.map(item => (
      <li key={item.id}>
        <PhotoCard {...item} openModal={openModal} />
      </li>
    ))}
  </ul>
);

export default Gallery;

Gallery.propTypes = {
  galleryItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal:PropTypes.func.isRequired,
};
