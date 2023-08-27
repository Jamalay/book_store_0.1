import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../../features/shopSlice";
import styles from "./AboutBook.module.css";

const AboutBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();

  const books = useSelector((state: RootState) => state.shopReducer.books);

  useEffect(() => {
    dispatch<any>(fetchBooks());
  }, []);
  return (
    <main>
      {books.map((book) => {
        if (book._id === bookId) {
          return (
            <img className={styles.img} src={book.img} key={String(book._id)} />
          );
        }
      })}
    </main>
  );
};

export { AboutBook };
