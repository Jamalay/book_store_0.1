import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Cart_svg = () => {
  return (
    <Link to="/cart">
      <svg
        width="32"
        height="32"
        // viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.cart}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 4a1 1 0 011-1h22a1 1 0 011 1v22a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm2 1v21a1 1 0 001 1h18a1 1 0 001-1V5H6z"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 8a1 1 0 011 1v1a4 4 0 008 0V9a1 1 0 112 0v1a6 6 0 01-12 0V9a1 1 0 011-1z"
        ></path>
      </svg>
    </Link>
  );
};

export { Cart_svg };
