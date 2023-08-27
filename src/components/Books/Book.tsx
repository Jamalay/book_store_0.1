import { useDispatch } from "react-redux";
import { Book } from "../../features/shopSlice";
import styles from "./Books.module.css";
import { Link } from "react-router-dom";

interface bookProps {
  book: Book;
  DeleteBook: Function;
}

const Print_book: React.FC<bookProps> = ({ book, DeleteBook }) => {
  const path = `books/about_book/${book._id}`;

  return (
    <div className={styles.card}>
      <Link to={`/books/about_book/${book._id}`}>
        <div>
          <img className={styles.img} src={book?.img} />
        </div>
      </Link>
      <div>
        <p className={styles.price}>{book?.price} ₽</p>
      </div>
      <div>
        <p className={styles.book_name}>{book?.name}</p>
        <p className={styles.author}>{book?.author}</p>
      </div>
      <div>
        <button className={styles.BuyButton}>
          {book.loading ? (
            <div className={styles.lds_ring}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Купить"
          )}
        </button>
      </div>
      {/* <div>
        <button onClick={() => DeleteBook(book._id)}>x</button>
      </div> */}
    </div>
  );
};

export { Print_book };
