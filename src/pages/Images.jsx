import styles from "./images.module.scss";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { nasaImagesUrl, nasaKey, dirButton } from "../assets/consts";
import PagesButtons from "../components/PagesButtons";

const Images = () => {
  const [searchVal, setSearchVal] = useState("");
  const [imagesResults, setImagesResults] = useState([]);
  const [imagesResultsToShow, setImagesResultsToShow] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [validationError, setValidationError] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (imagesResults && imagesResults.length > 0 && currentPage === 1) {
      updateResultsByPage();
    } else if (currentPage !== 1) {
      updateResultsByPage();
    }
  }, [currentPage]);
  const getResults = async () => {
    const nasaFullUrl = `${nasaImagesUrl}?earth_date=${searchVal}&api_key=${nasaKey}&page=1`;
    if (testDateValidation()) {
      clearResults();
      setLoader(true);
      try {
        const results = await fetch(nasaFullUrl);
        const imagesObj = await results.json();
        if (imagesObj && imagesObj?.photos?.length > 0) {
          setImagesResults(imagesObj.photos);
          calculateNumberOfPages(imagesObj?.photos?.length);
          setCurrentPage(1);
        }
        setLoader(false);
      } catch (e) {
        console.log(`Error:${e}`);
        setLoader(false);
      }
    } else {
      setValidationError("Error");
    }
  };
  const clearResults = () => {
    setImagesResults([]);
    setImagesResultsToShow([]);
    setCurrentPage(0);
  };
  const calculateNumberOfPages = (numberOfResults) => {
    const numberOfPages = numberOfResults / 15;
    setNumberOfPages(Math.ceil(numberOfPages));
  };
  const updateResultsByPage = () => {
    const resultsToShow = imagesResults.slice(
      currentPage * 15 - 15,
      currentPage * 15
    );
    setImagesResultsToShow(resultsToShow);
  };
  const testDateValidation = () => {
    const reg =
      /^(199[0-9]|20[0-3][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    return reg.test(searchVal);
  };
  const nextPage = (dir) => {
    if (dir === dirButton.right) {
      if (currentPage < numberOfPages) {
        setCurrentPage(currentPage + 1);
      }
    } else if (dir === dirButton.left) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };
  return (
    <div className={styles["main-cont"]}>
      <Loader show={loader} />
      <header>
        <h1>Mars Images By Date</h1>
      </header>
      <div className={styles["search-bar"]}>
        <span>Earth date:</span>
        <input
          value={searchVal}
          type="text"
          onChange={(e) => {
            setSearchVal(e.target.value);
            setValidationError("");
          }}
          placeholder="exp: 2022-01-20"
        />
        <button onClick={getResults}>Search </button>
        {validationError && (
          <span className={styles["not-valid"]}>Input not valid</span>
        )}
      </div>
      <div className={styles["images-block"]}>
        {imagesResultsToShow &&
          imagesResultsToShow.length > 0 &&
          imagesResultsToShow.map((current) => (
            <div className={styles["image-box"]} key={current.id}>
              <img src={current.img_src} />
              <div className={styles["image-info"]}>
                <p>Id: {current?.id}</p>
                <p>Date: {current?.earth_date}</p>
                <p>Landing date: {current?.rover?.landing_date}</p>
                <p>Launch date: {current?.rover?.launch_date}</p>
                <p>Status: {current?.rover?.status}</p>
                <p>Rover name: {current?.rover?.name}</p>
              </div>
            </div>
          ))}
      </div>
      <PagesButtons
        nextPage={nextPage}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Images;
