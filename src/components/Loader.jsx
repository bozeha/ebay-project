import styles from "./loader.module.scss";

const Loader = ({ show }) => {
  return <>{show && <div className={styles["imageCont"]}></div>}</>;
};

export default Loader;
