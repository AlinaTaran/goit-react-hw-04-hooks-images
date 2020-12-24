import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ picture, setImageData }) => {
  return (
    <ul className={s.ImageGallery}>
      {picture.map(({ webformatURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          onSetImageData={setImageData}
          key={index}
          src={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
