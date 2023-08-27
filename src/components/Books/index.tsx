import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../app/store";
import { deleteBook, fetchBooks } from "../../features/shopSlice";
import { Print_book } from "./Book";
import styles from "./Books.module.css";

interface booksProp {
  searchingBook: string;
}

const Books: React.FC<booksProp> = ({ searchingBook }): JSX.Element => {
  const books = useSelector((state: RootState) => state.shopReducer.books);
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    dispatch<any>(fetchBooks());
  }, []);

  const DeleteBook = (id: string) => {
    dispatch<any>(deleteBook(id));
  };

  return (
    <main className={styles.cards}>
      {books
        .filter((book) => {
          if (book.name.toLowerCase().includes(searchingBook.toLowerCase())) {
            return book;
          }
        })
        .map((book) => {
          return (
            <Print_book
              key={String(book._id)}
              book={book}
              DeleteBook={DeleteBook}
            />
          );
        })}
    </main>
  );
};

export default Books;
export { Books };
