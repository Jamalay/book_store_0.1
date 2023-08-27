// import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import React from "react";
import styles from "./Footer.module.css";

const YouTube_svg = () => {
  return (
    <Link to="https://www.youtube.com/channel/UCt02Bst7ekNipVqMgsfkjNw">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <path d="M19.043 6.386a2.255 2.255 0 011.586 1.586c.386 1.409.37 4.344.37 4.344s0 2.921-.37 4.33a2.255 2.255 0 01-1.586 1.586c-1.409.37-7.043.37-7.043.37s-5.62 0-7.043-.385a2.255 2.255 0 01-1.586-1.586C3 15.237 3 12.3 3 12.3s0-2.92.37-4.329a2.302 2.302 0 011.587-1.601C6.366 6 12 6 12 6s5.634 0 7.043.386zm-8.837 3.218V15l4.685-2.699-4.685-2.698z"></path>
      </svg>
    </Link>
  );
};

export { YouTube_svg };
