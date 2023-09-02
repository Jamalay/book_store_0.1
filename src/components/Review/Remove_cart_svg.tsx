import { useDispatch } from "react-redux";
import styles from "./Review.module.css";
import { removeReview } from "../../features/reviewsSlice";

interface remove_cart_prop {
  reviewId: String;
}

const Remove_cart_svg: React.FC<remove_cart_prop> = ({ reviewId }) => {
  const dispatch = useDispatch();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={styles.remove_cart}
      onClick={() => dispatch<any>(removeReview(reviewId))}
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
};

export { Remove_cart_svg };
