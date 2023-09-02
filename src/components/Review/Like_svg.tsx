import { useDispatch } from "react-redux";
import { Like } from "../../features/reviewsSlice";
import styles from "./Review.module.css";

interface like_svg_prop {
  reviewId: String;
}

const Like_svg: React.FC<like_svg_prop> = ({ reviewId }) => {
  const dispatch = useDispatch();

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.like_dislike_svg}
      onClick={() => dispatch<any>(Like(reviewId))}
    >
      <path
        className={styles.like_dislike_svg}
        d="M5.563 10.625h3.375v7.313H5.562A.563.563 0 015 17.375v-6.188a.562.562 0 01.563-.562z"
      ></path>
      <path
        className={styles.like_dislike_svg}
        d="M8.938 10.625L11.75 5A2.25 2.25 0 0114 7.25v1.688h4.35a1.125 1.125 0 011.117 1.264l-.844 6.75a1.125 1.125 0 01-1.116.985h-8.57"
      ></path>
    </svg>
  );
};

export { Like_svg };
