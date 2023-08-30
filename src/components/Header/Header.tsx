import styles from "./Header.module.css";
// import cartLogo from "../../logos/bag.png";
import { Link } from "react-router-dom";
import { Cart_svg } from "./Cart_svg";
import { Plus_svg } from "./Plus_svg";
import { Categories_svg } from "./Categories_svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { getUser } from "../../features/usersSlice";
import { Profile_svg } from "./Profile_svg";

interface headerProp {
  searchingBook: String;
  setSearchingBook: Function;
}

const Header: React.FC<headerProp> = ({
  searchingBook,
  setSearchingBook,
}): JSX.Element => {
  const findBook = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchingBook(e.target.value);
    console.log(searchingBook);
  };

  const user = useSelector((state: RootState) => state.usersSlice.user);
  const token = useSelector((state: RootState) => state.applicationSlice.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUser());
  }, [token]);

  return (
    <header>
      <div className={styles.main_div}>
        <div className={styles.site_logo}>
          <Link to="/books" className={styles.a}>
            На главную
          </Link>
        </div>
        <div>
          <button className={styles.categories_button}>
            <div>
              <Categories_svg />
            </div>
            <div>Категории</div>
          </button>
        </div>
        <div className={styles.form_div}>
          <form className={styles.form}>
            <input
              placeholder="Хочу найти"
              className={styles.input}
              onChange={findBook}
            />
            <button className={styles.header_search__button}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.header_search__button_icon}
              >
                <path d="M9.167 4.167a5 5 0 100 10 5 5 0 000-10zm-6.667 5a6.667 6.667 0 1111.78 4.279l2.286 2.286a.833.833 0 01-1.179 1.179l-2.33-2.33A6.667 6.667 0 012.5 9.167z"></path>
              </svg>
            </button>
          </form>
        </div>
        <div className={styles.links_div}>
          {user?.role === "ADMIN" ? <Plus_svg /> : ""}
          <Cart_svg />
          <Profile_svg />
        </div>
      </div>
    </header>
  );
};

export { Header };
