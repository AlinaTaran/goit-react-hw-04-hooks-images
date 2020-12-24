import axios from "axios";
import PropTypes from "prop-types";

const apiKey = "18692705-ed4727d48f1212ef902c664a7";
axios.defaults.baseURL = "https://pixabay.com/api";

const fetchImages = async ({ pictureSearch, page }) => {
  return await axios
    .get(
      `/?key=${apiKey}&q=${pictureSearch}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    )
    .then(({ data }) => data.hits);
};

fetchImages.propTypes = {
  pictureSearch: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImages;
