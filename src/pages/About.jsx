//import "./about.scss";
import styles from "./about.module.scss";
import marsCar from "../images/perseverance.jpg";
import { useNavigate } from "react-router-dom";
import { directions } from "../assets/consts";
import Carousel from "../components/Carousel";

const About = () => {
  const navigate = useNavigate();
  const navFunc = (where) => {
    switch (where) {
      case directions.ABOUT:
        navigate("/");
        break;
      case directions.IMAGES:
        navigate("/images");
        break;
      case directions.WEATHER:
        navigate("/weather");
        break;
    }
  };
  return (
    <div className={styles["main-cont"]}>
      <header>
        <h1>About The Program</h1>
      </header>
      <div className={styles["main-article"]}>
        <div className={styles["left-block"]}>
          <img src={marsCar} />
          <p>Curiosity rover image</p>
        </div>
        <div className={styles["right-block"]}>
          <p>
            After journeying this summer through a narrow, sand-lined pass,
            NASA’s Curiosity Mars rover recently arrived in the “sulfate-bearing
            unit,” a long-sought region of Mount Sharp enriched with salty
            minerals. Scientists hypothesize that billions of years ago,
            streams, and ponds left behind the minerals as the water dried up.
            Assuming the hypothesis is correct, these minerals offer tantalizing
            clues as to how – and why – the Red Planet’s climate changed from
            being more Earth-like to the frozen desert it is today. The minerals
            were spotted by NASA’s Mars Reconnaissance Orbiter years before
            Curiosity landed in 2012, so scientists have been waiting a long
            time to see this terrain up close. Soon after arriving, the rover
            discovered a diverse array of rock types and signs of past water,
            among them popcorn-textured nodules and salty minerals such as
            magnesium sulfate (Epsom salt is one kind), calcium sulfate
            (including gypsum), and sodium chloride (ordinary table salt).
          </p>
          <div className={styles["buttons-block"]}>
            <button
              onClick={() => {
                navFunc(directions.IMAGES);
              }}
            >
              View Image By Date
            </button>
            <button
              onClick={() => {
                navFunc(directions.WEATHER);
              }}
            >
              View Weather
            </button>
          </div>
        </div>
      </div>
      <div className={styles["carousel-block"]}>
        <h2>
          Curiosity rover images <span>from today</span>
        </h2>
        <Carousel />
      </div>
    </div>
  );
};

export default About;
