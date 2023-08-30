import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Profile_svg = (): JSX.Element => {
  const token = useSelector((state: RootState) => state.applicationSlice.token);

  return (
    <Link to={token ? "/profile" : "/auth_sign_up"}>
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
        <path
          className={styles.profile}
          stroke="white"
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        />
        <circle className={styles.profile} cx="12" cy="7" r="4" />
      </svg>
    </Link>
  );
};

export { Profile_svg };
