import { useDispatch, useSelector } from "react-redux";
import { Book, addBook } from "../../features/shopSlice";
import styles from "./Books.module.css";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { authSignUp } from "../../features/applicationSlice";
import { addBookToCart } from "../../features/usersSlice";

interface bookProps {
  book: Book;
  DeleteBook: Function;
}

const Print_book: React.FC<bookProps> = ({ book, DeleteBook }) => {
  const path = `books/about_book/${book._id}`;

  let isAuthorizated = false;

  const token = useSelector((state: RootState) => state.applicationSlice.token);
  const dispathc = useDispatch();

  console.log(token);

  if (token) {
    isAuthorizated = true;
  }

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
        <Link to={isAuthorizated ? "" : "/auth_sign_up"}>
          <button
            className={styles.BuyButton}
            onClick={() => dispathc<any>(addBookToCart(String(book._id)))}
          >
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
        </Link>
      </div>
      {/* <div>
          <button onClick={() => DeleteBook(book._id)}>x</button>
        </div> */}
    </div>
  );
};

export { Print_book };
