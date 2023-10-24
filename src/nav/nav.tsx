import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <Link to={ROUTES[0].path} className={styles.navLink}>
          Web Share API
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link to={ROUTES[1].path} className={styles.navLink}>
          Contact Picker API
        </Link>
      </li>
    </ul>
  );
};
