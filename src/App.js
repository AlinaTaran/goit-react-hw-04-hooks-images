import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "./components/Container";
import fetchImages from "./services/picture-api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from "./components/Button";
import LoaderSpinner from "./components/Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [pictureSearch, setPictureSearch] = useState("mountain");
  const [page, setPage] = useState(1);
  const [picture, setPicture] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    (async () => {
      try {
        const pictures = await fetchImages({ pictureSearch, page });

        if (pictures.length < 1) {
          toast.info("Not found!");
          setError(true);
          setStatus(Status.REJECTED);
          return;
        }

        setPicture((prevState) => [...prevState, ...pictures]);
        setStatus(Status.RESOLVED);
        if (page !== 1) {
          scrollToBottom();
        }
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    })();
  }, [pictureSearch, page]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (query) => {
    if (pictureSearch === query) {
      return;
    }
    setPicture([]);
    setPage(1);
    setError(false);
    setPictureSearch(query);
  };

  const setImageData = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setLargeImageURL("");
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.REJECTED && error && (
        <p>Whoops, something went wrong </p>
      )}
      {status === Status.PENDING && <LoaderSpinner />}
      <ImageGallery picture={picture} setImageData={setImageData} />
      {picture.length > 0 && status === Status.RESOLVED && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
