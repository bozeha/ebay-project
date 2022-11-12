import { dirButton } from "../assets/consts";
import styles from "./pagesButtons.module.scss";
import { v4 as uuidv4 } from "uuid";
const PagesButtons = ({
  nextPage,
  numberOfPages,
  setCurrentPage,
  currentPage,
  specialClass,
}) => {
  return (
    <div
      className={`${styles["pages-buttons"]} ${
        specialClass ? styles[specialClass] : ""
      }`}
    >
      <button
        onClick={() => {
          nextPage(dirButton.left);
        }}
      >
        &#60;
      </button>
      {numberOfPages > 0 &&
        [...Array(numberOfPages)].map((current, index) => (
          <button
            key={uuidv4()}
            className={currentPage === index + 1 ? styles["selected"] : ""}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      <button
        onClick={() => {
          nextPage(dirButton.right);
        }}
      >
        &#62;
      </button>
    </div>
  );
};

export default PagesButtons;
