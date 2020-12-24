import Loader from "react-loader-spinner";

import s from "./Loader.module.css";
export default function LoaderSpinner() {
  return (
    <Loader
      className={s.Loader}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}
