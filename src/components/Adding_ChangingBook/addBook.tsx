import React, { useState, useEffect } from "react";
import {
  addBook,
  Book,
  changeBook,
  fetchBooks,
} from "../../features/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./addBook.module.css";
import { BookSelection } from "./BookSelection";
import { RootState } from "../../app/store";

const Add_ChangeBook = (): JSX.Element => {
  const dispatch = useDispatch();

  const [bookChanged, setBookChanged] = useState<boolean>(false);

  useEffect(() => {
    console.log(`fetchBook. setBookChange: ${bookChanged}`);
    dispatch<any>(fetchBooks());
    setBookChanged(false);
  }, [dispatch, bookChanged]);

  const [wantToChangeBook, setWantToChangeBook] = useState<boolean>(false);

  const [isEmptyInput, setIsEmptyInput] = useState<boolean>(false);

  const [name, setBookName] = useState<string>("");
  const [_id, setId] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [img, setImage] = useState<string>("");

  const addNewBook = () => {
    const book: Book = { name, genre, img, author, price };
    dispatch<any>(addBook(book));
    setAuthor("");
    setBookName("");
    setPrice(0);
    setImage("");
    setGenre("");
  };

  const changeOldBook = () => {
    const book: Book = { _id, name, genre, img, author, price };
    dispatch<any>(changeBook(book));
    setBookChanged(true);
    setAuthor("");
    setBookName("");
    setPrice(0);
    setImage("");
    setId("");
    setGenre("");
  };

  const change_addBook = (wantToChangeBook: boolean) => {
    setWantToChangeBook(wantToChangeBook);
    setAuthor("");
    setBookName("");
    setPrice(0);
    setImage("");
    setId("");
    setGenre("");
  };

  const SetIsEmptyInput = () => {
    if (name && genre && img && author && price) {
      setIsEmptyInput(true);
    } else {
      setIsEmptyInput(false);
    }
  };

  useEffect(() => {
    SetIsEmptyInput();
  }, [name, genre, img, author, price]);

  return (
    <div>
      {wantToChangeBook ? (
        <>
          <h3 className={styles.h3}>Выберите книгу для изменения</h3>
          <BookSelection
            setAuthor={setAuthor}
            setBookName={setBookName}
            setGenre={setGenre}
            setId={setId}
            setImage={setImage}
            setPrice={setPrice}
          />{" "}
        </>
      ) : null}

      <div>
        <h1 className={styles.h1}>
          {wantToChangeBook ? "Изменение книги" : "Добавление книги"}
        </h1>
        <form className={styles.form}>
          {wantToChangeBook ? (
            <div className={styles.div}>
              <input
                value={_id}
                className={styles.input}
                placeholder="id книги"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          ) : null}
          <div className={styles.div}>
            <input
              value={name}
              className={styles.input}
              placeholder="Название книги"
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className={styles.div}>
            <input
              value={genre}
              className={styles.input}
              placeholder="Жанр"
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className={styles.div}>
            <input
              value={price ? price : ""}
              className={styles.input}
              placeholder="Цена"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className={styles.div}>
            {" "}
            <input
              value={author}
              className={styles.input}
              placeholder="Автор"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={styles.div}>
            {" "}
            <input
              value={img}
              className={styles.input}
              placeholder="URL картинки"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </form>
        <div className={styles.buttons_div}>
          <button
            className={!isEmptyInput ? styles.disabled : styles.button}
            onClick={
              wantToChangeBook ? () => changeOldBook() : () => addNewBook()
            }
            disabled={!isEmptyInput ? true : false}
          >
            {wantToChangeBook ? "Изменить" : "Добавить"}
          </button>
          <button
            onClick={() => {
              change_addBook(!wantToChangeBook);
            }}
            className={styles.button}
          >
            {wantToChangeBook ? "Добавить книгу" : "Изменить книгу"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { Add_ChangeBook };
