import React, { useEffect, useState } from "react";
import { set } from "mongoose";
import { addBook, fetchBooks, Book } from "./features/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Route, Routes } from "react-router";
import Books from "./components/Books";
import { Add_ChangeBook } from "./components/Adding_ChangingBook/addBook";
import { Header } from "./components/Header/Header";
import { Cart } from "./components/Cart";
import { AboutBook } from "./components/AboutBook/AboutBook";
import { Footer } from "./components/Footer/Footer";

function App() {
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

//useParams

export default App;
