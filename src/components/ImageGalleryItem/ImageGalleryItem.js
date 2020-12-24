import PropTypes from "prop-types";

import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ src, tags, largeImageURL, onSetImageData }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={src}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={() => {
          onSetImageData({ largeImageURL, tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onSetImageData: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
