import styles from "./carousel.module.scss";
import {
  directions,
  nasaImagesUrl,
  nasaKey,
  carouselDir,
} from "../assets/consts";
import { useEffect, useState } from "react";
import { getToday, getYesterday } from "../assets/utils";
import Loader from "./Loader";

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselImagesShowing, setCarouselImagesShowing] = useState([]);
  const [carouselPage, setCarouselPage] = useState(1);
  const [carouselNumberOfPages, setCarouselNumberOfPages] = useState(1);
  const [arrowCarouselDir, setArrowCarouselDir] = useState(carouselDir.right);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  //#####
  // In the current date There is no results, so i hard coded date with results
  //#####
  const nasaFullUrl = `${nasaImagesUrl}?earth_date=2022-10-10&api_key=${nasaKey}&page=1`;
  ///const nasaFullUrl = `${nasaImagesUrl}?earth_date=${getToday()}&api_key=${nasaKey}&page=1`;

  useEffect(() => {
    getCarouselImages();
  }, []);
  useEffect(() => {
    if (carouselImages && carouselImages.length > 0 && carouselPage === 1) {
      updateCarouselByPage();
    } else if (carouselPage !== 1) {
      updateCarouselByPage();
    }
  }, [carouselPage, carouselImages]);

  const getCarouselImages = async () => {
    setMessage("");
    setLoader(true);
    try {
      const results = await fetch(nasaFullUrl);
      const imagesObj = await results.json();
      if (imagesObj && imagesObj?.photos?.length > 0) {
        setCarouselImages(imagesObj.photos);
        calculateNumberOfPages(imagesObj.photos.length);
        setCarouselPage(1);
      } else if (imagesObj && imagesObj?.photos?.length === 0) {
        setMessage("Sorry, No images for this date !");
      }
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(`Error:${e}`);
    }
  };
  const calculateNumberOfPages = (numberOfImages) => {
    const numberOfPages = Math.ceil(numberOfImages / 5);
    setCarouselNumberOfPages(numberOfPages);
  };

  const updateCarouselByPage = () => {
    const imagesToShow = carouselImages.slice(
      carouselPage * 5 - 5,
      carouselPage * 5
    );
    setCarouselImagesShowing(imagesToShow);
  };
  const nextPage = (dir) => {
    if (dir === carouselDir.right) {
      if (carouselPage < carouselNumberOfPages) {
        setCarouselPage(carouselPage + 1);
        if (carouselPage + 1 == carouselNumberOfPages) {
          setArrowCarouselDir(carouselDir.left);
        }
      }
    } else if (dir === carouselDir.left) {
      if (carouselPage === 2) {
        setArrowCarouselDir(carouselDir.right);
      }
      setCarouselPage(carouselPage - 1);
    }
  };
  return (
    <div className={styles["carousel"]}>
      <Loader show={loader} />
      {message && <span className={styles["message"]}>{message}</span>}
      {carouselImages &&
        carouselImagesShowing.map((current) => (
          <img key={current.id} src={current.img_src} />
        ))}
      <span
        className={styles["page-counter"]}
      >{`Page ${carouselPage}/${carouselNumberOfPages} `}</span>
      <div
        className={`${styles["next-page"]} ${
          arrowCarouselDir === carouselDir.left
            ? styles["left"]
            : styles["right"]
        }`}
        onClick={() => {
          nextPage(arrowCarouselDir);
        }}
      ></div>
    </div>
  );
};

export default Carousel;
