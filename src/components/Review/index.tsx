import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import {
  DisLike,
  Like,
  fetchReviews,
  writeReview,
} from "../../features/reviewsSlice";
import styles from "./Review.module.css";
import { Like_svg } from "./Like_svg";
import { Dis_Like_svg } from "./DisLike_svg";
import { write } from "fs";
import { useParams } from "react-router-dom";
import { Remove_cart_svg } from "./Remove_cart_svg";

interface ReviewProp {
  bookId: String;
}

const Reviews: React.FC<ReviewProp> = ({ bookId }) => {
  const reviews = useSelector((state: RootState) => state.reviewsSlice.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchReviews());
  }, []);

  //Получаем отзывы данной книги, фильтруя все не нужные
  const bookReviews = reviews.filter((review) => {
    if (review.reviwedBookId === bookId) {
      console.log(review.reviwedBookId);

      return review;
    }
  });

  const [title, setTitle] = useState<String>("");
  const [wantToAddReview, setWantToAddReview] = useState<boolean>(false);

  const setReviewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch<any>(writeReview({ title, bookId }));
    e.preventDefault();
    setTitle("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.review_adding_block}>
        <div>
          <span className={styles.Review}>ОТЗЫВЫ</span>{" "}
          <span className={styles.Reviews_amount}>{bookReviews.length}</span>
        </div>
        {wantToAddReview ? (
          <>
            <input
              onChange={setReviewTitle}
              placeholder="Оставить отзыв"
              value={String(title)}
            />
            <button onClick={handleSubmit}>Выложить</button>
          </>
        ) : null}
        <button
          className={styles.reviewButton}
          onClick={() => setWantToAddReview(!wantToAddReview)}
        >
          Оставить отзыв
        </button>
      </div>
      {bookReviews.map((review) => {
        {
          console.log(review.likes.length);
        }
        return (
          <div key={String(review._id)} className={styles.review}>
            <div className={styles.review_data}>
              <div className={styles.date_and_username}>
                <div>{review.user.login}</div>
                <div>{review.date}</div>
              </div>
              <div className={styles.title}>
                <div>{review.title}</div>
              </div>
            </div>
            <div className={styles.icons}>
              <div>
                <Remove_cart_svg reviewId={review._id} />
              </div>
              <div className={styles.likes_dislikes}>
                <div className={styles.like_dislike}>
                  <Like_svg reviewId={review._id} />
                  {review.loading ? (
                    <span> {review.loading ? "_" : null}</span>
                  ) : (
                    <span> {review.likes.length}</span>
                  )}
                </div>
                <div className={styles.like_dislike}>
                  <Dis_Like_svg reviewId={review._id} />{" "}
                  {review.loading ? (
                    <span> {review.loading ? "_" : null}</span>
                  ) : (
                    <span> {review.dislikes.length}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Reviews };
