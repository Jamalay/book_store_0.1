import { useState } from "react";
import { Route, Routes } from "react-router";
import Books from "./components/Books";
import { Add_ChangeBook } from "./components/Adding_ChangingBook/addBook";
import { Header } from "./components/Header/Header";
import { Cart } from "./components/Cart";
import { AboutBook } from "./components/AboutBook/AboutBook";
import { Footer } from "./components/Footer/Footer";
import { SignUp } from "./components/Authorization/SignUp/SignUp";
import { SignIn } from "./components/Authorization/SignIn/SignIn";
import { Profile } from "./components/Profile";

function App() {
  // var Jan02_1970 = new Date();
  // alert(Jan02_1970.getDate());
  // alert(Jan02_1970.getMonth());
  // alert(Jan02_1970.getFullYear());
  // alert(Jan02_1970.getTime());

  const [searchingBook, setSearchingBook] = useState<string>("");
  return (
    <>
      <Header
        searchingBook={searchingBook}
        setSearchingBook={setSearchingBook}
      />
      <main>
        <Routes>
          <Route
            path="/books"
            element={<Books searchingBook={searchingBook} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="books/addbook" element={<Add_ChangeBook />} />
          <Route path="books/about_book/:bookId" element={<AboutBook />} />
          <Route path="auth_sign_up" element={<SignUp />} />
          <Route path="auth_sign_in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

//useParams

export default App;
