import { useDispatch } from "react-redux";
import { DisLike } from "../../features/reviewsSlice";
import styles from "./Review.module.css";

interface dislike_svg_prop {
  reviewId: String;
}

const Dis_Like_svg: React.FC<dislike_svg_prop> = ({ reviewId }) => {
  const dispatch = useDispatch();

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // alt="Не нравится"
      className={styles.like_dislike_svg}
      onClick={() => dispatch<any>(DisLike(reviewId))}
    >
      <path
        className={styles.like_dislike_svg}
        d="M5.563 7h3.375v7.313H5.562A.563.563 0 015 13.75V7.562A.563.563 0 015.563 7z"
      ></path>
      <path
        className={styles.like_dislike_svg}
        d="M8.938 14.313l2.812 5.624a2.249 2.249 0 002.25-2.25V16h4.35a1.125 1.125 0 001.117-1.264l-.844-6.75A1.125 1.125 0 0017.507 7h-8.57"
      ></path>
    </svg>
  );
};

export { Dis_Like_svg };
