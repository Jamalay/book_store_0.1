import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../../features/shopSlice";
import styles from "./AboutBook.module.css";
import { Reviews } from "../Review";

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
            <div className={styles.container} key={String(book._id)}>
              <div>
                <img
                  className={styles.img}
                  src={book.img}
                  key={String(book._id)}
                />
              </div>
              <div>
                <div>
                  <h2>{book.name}</h2>
                  <a>{book.author}</a>
                </div>
                <div>
                  <div>
                    <span>ID товара</span>
                    <span className={styles.span}>{book._id}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
      <Reviews bookId={String(bookId)} />
    </main>
  );
};

export { AboutBook };
