import styles from "./weather.module.scss";
import { useState, useEffect } from "react";
import { dirButton } from "../assets/consts";
import PagesButtons from "../components/PagesButtons";
import resutlsFromMock from "../assets/mock.json";

const Weather = () => {
  const [weatherResults, setWeatherResults] = useState({});
  const [weatherResultsToShow, setWeatherResultsToShow] = useState({});
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {}, [weatherResults]);

  useEffect(() => {
    if (
      weatherResults &&
      Object.keys(weatherResults).length > 0 &&
      currentPage === 1
    ) {
      updateResultsByPage();
    }
  }, [currentPage]);
  const getResults = async () => {
    setWeatherResults(resutlsFromMock);
    calculateNumberOfPages(Object.keys(resutlsFromMock).length);
    setCurrentPage(1);
  };

  const calculateNumberOfPages = (numberOfResults) => {
    const numberOfPages = numberOfResults / 9;
    setNumberOfPages(Math.ceil(numberOfPages));
  };
  const updateResultsByPage = () => {
    const resultsToShow = Object.fromEntries(
      Object.entries(weatherResults).slice(currentPage * 9 - 9, currentPage * 9)
    );
    setWeatherResultsToShow(resultsToShow);
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
      <header>
        <h1>Mars Weather</h1>
        <div className={styles["sort-block"]}>
          <p>Sort By:</p>
          <select>
            <option value="1">Temperature</option>
            <option value="2">Wind</option>
            <option value="3">Preesur</option>
          </select>
        </div>
      </header>
      <div className={styles["weather-block"]}>
        {weatherResultsToShow &&
          Object.entries(weatherResultsToShow).map(([key, value]) => (
            <div className={styles["weather-box"]} key={key}>
              <p>
                <span>Data point:</span>{" "}
                <span>{value["HWS"]?.av || "unknown"}</span>
              </p>
              <p>
                <span>Temperature[AVG]: </span>
                <span>{value["AT"]?.av || "unknown"}</span>
              </p>
              <p>
                <span>Wind[AVG]: </span>
                <span>{value["WD"]?.av || "unknown"}</span>
              </p>
              <p>
                <span>Preesur[AVG]: </span>
                <span>{value["PRE"]?.av || "unknown"}</span>
              </p>
              <p>
                <span>First UTC: </span>
                <span>{value["First_UTC"] || "unknown"}</span>
              </p>
              <p>
                <span>Last UTC: </span>
                <span>{value["Last_UTC"] || "unknown"}</span>
              </p>
            </div>
          ))}
      </div>
      <PagesButtons
        nextPage={nextPage}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        specialClass={"weather-buttons"}
      />
      <div className={styles["info"]}>
        <p>AT - Atmospheric temperature sensor</p>
        <p>HWS - Horizontal wind speed sensor</p>
        <p>PRE - Atmospheric pressure sensor</p>
      </div>
    </div>
  );
};

export default Weather;
