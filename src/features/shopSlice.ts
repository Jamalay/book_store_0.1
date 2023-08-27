import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadavg } from "os";

export interface Book {
  _id?: String;
  name: String;
  price: number | null;
  genre: String;
  img: string;
  author: String;
  loading?: boolean;
}

export interface ShopState {
  books: Book[];
  error: string | null | unknown;
}

const initialState: ShopState = {
  books: [],
  error: null,
};

export const fetchBooks = createAsyncThunk<
  Book[],
  void,
  { rejectValue: string }
>("books/fetchBooks", async (data, thunkAPI) => {
  try {
    const res = await fetch("/books");
    const books = await res.json();

    return books;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
  "/books",
  async ({ name, price, genre, author, img }, thunkAPI) => {
    try {
      const res = await fetch("/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          price,
          genre,
          img,
          author,
        }),
      });
      const book = await res.json();
      return book;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("books/deleteBook", async (bookId, thunkAPI) => {
  try {
    const res = await fetch(`/books/${bookId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return bookId;
    }
    return thunkAPI.rejectWithValue("tete");
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const changeBook = createAsyncThunk<Book, Book, { rejectValue: string }>(
  "books/cnangeBook",
  async ({ _id, name, price, author, genre, img }, thunkAPI) => {
    try {
      const res = await fetch(`/books/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          price,
          author,
          genre,
          img,
        }),
      });
      const book = await res.json();
      return book;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const shopSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchBooks.pending, (state, action) => {
        state.error = null;
      });

    builder
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.meta.arg) {
            book.loading = true;
          }
          return book;
        });
      });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });

    builder
      .addCase(changeBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.payload._id) {
            return action.payload;
          }
          return book;
        });
        state.error = null;
      })
      .addCase(changeBook.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changeBook.pending, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.meta.arg._id) {
            book.loading = true;
          }
          book.loading = false;
          return book;
        });
      });
  },
});

export default shopSlice.reducer;
