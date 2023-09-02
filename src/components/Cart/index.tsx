import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { getUser, removeFromCart } from "../../features/usersSlice";
import { fetchBooks } from "../../features/shopSlice";
import styles from "./cart.module.css";

const Cart = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.usersSlice.user);
  const books = useSelector((state: RootState) => state.shopReducer.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUser());
    dispatch<any>(fetchBooks());
    console.log("in useEffect");
  }, [dispatch]);

  console.log(user);

  const removeBook = (bookId: String) => {
    dispatch<any>(removeFromCart(bookId));
  };

  return (
    <main>
      {!user?.cart?.length ? (
        <h2>Корзина пустая</h2>
      ) : (
        <ul>
          {user.cart?.map((cartItem) => {
            return books.map((book) => {
              if (cartItem === book._id) {
                return (
                  <li className={styles.li} key={String(book._id)}>
                    <div>
                      <img className={styles.img} src={book.img} />
                    </div>
                    <button onClick={() => removeBook(String(book._id))}>
                      x
                    </button>
                  </li>
                );
              }
            });
          })}
        </ul>
      )}
    </main>
  );
};

export { Cart };
