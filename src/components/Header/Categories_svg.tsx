import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Categories_svg = () => {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="white" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path
        stroke="white"
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      />
    </svg>
  );
};

export { Categories_svg };
