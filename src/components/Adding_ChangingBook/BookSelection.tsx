import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from "./addBook.module.css";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../features/shopSlice";

interface bookSelectionProp {
  setId: Function;
  setBookName: Function;
  setGenre: Function;
  setPrice: Function;
  setAuthor: Function;
  setImage: Function;
}

const BookSelection: React.FC<bookSelectionProp> = ({
  setId,
  setAuthor,
  setBookName,
  setGenre,
  setImage,
  setPrice,
}): JSX.Element => {
  const books = useSelector((state: RootState) => state.shopReducer.books);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch<any>(fetchBooks());
  // }, [books]);

  const ChooseBook = (
    _id: String | undefined,
    author: String,
    bookName: String,
    genre: String,
    image: string,
    price: number | null
  ) => {
    setAuthor(author);
    setBookName(bookName);
    setGenre(genre);
    setImage(image);
    setId(_id);
    setPrice(price);
  };

  const [choosed, setChoosed] = useState<boolean>(false);
  return (
    <>
      <div className={styles.bookSelection_main_div}>
        {books.map((book) => {
          return (
            <div
              className={
                !choosed ? styles.selection_card : styles.selection_cardChoosed
              }
              onClick={() => {
                ChooseBook(
                  book._id,
                  book.author,
                  book.name,
                  book.genre,
                  book.img,
                  book.price
                );
                setChoosed(!choosed);
                console.log(choosed);
              }}
              key={String(book._id)}
            >
              <div>
                <img className={styles.img} src={book.img} />
              </div>
              <div>
                <p>{book.loading ? "Loading" : book.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { BookSelection };
