import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { json } from "stream/consumers";
import { RootState } from "../app/store";
import { User } from "./usersSlice";
import { Reviews } from "../components/Review";

export interface Review {
  _id: String;
  user: User;
  reviwedBookId: String;
  title: String;
  date: String;
  likes: String[];
  dislikes: String[];
  loading?: boolean;
}

export interface ReviewState {
  reviews: Review[];
  error: String | null;
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: [],
  error: null,
  loading: false,
};

export const fetchReviews = createAsyncThunk<
  Review[],
  void,
  { rejectValue: string; state: RootState }
>("book/review", async (bookId, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3001/get_reviews");
    const reviews = await res.json();

    if (reviews.error) {
      return thunkAPI.rejectWithValue(reviews.error);
    }

    return reviews;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const Like = createAsyncThunk<
  Review,
  String,
  { rejectValue: string; state: RootState }
>("add/like", async (reviewId, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3001/add_like/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
    });

    const review = await res.json();

    if (review.error) {
      return thunkAPI.rejectWithValue(review.error);
    }

    return review;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const DisLike = createAsyncThunk<
  Review,
  String,
  { rejectValue: string; state: RootState }
>("add/dislike", async (reviewId, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3001/add_dislike/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
    });

    const review = await res.json();

    if (review.error) {
      return thunkAPI.rejectWithValue(review.error);
    }

    return review;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const writeReview = createAsyncThunk<
  Review,
  { title: String; bookId: String },
  { rejectValue: string; state: RootState }
>("write/review", async ({ title, bookId }, thunkAPI) => {
  try {
    const res = await fetch(`/book/review/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
      body: JSON.stringify({ title }),
    });

    const review = await res.json();

    if (review.error) {
      return thunkAPI.rejectWithValue(review.error);
    }

    return review;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const removeReview = createAsyncThunk<
  String,
  String,
  { rejectValue: string; state: RootState }
>("review/remove", async (reviewId, thunkAPI) => {
  try {
    const res = await fetch(`/book/remove_review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
    });

    const removedReview = await res.json();

    if (removedReview.error) {
      return thunkAPI.rejectWithValue(removedReview.error);
    }

    return removedReview;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchReviews.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });

    builder
      .addCase(Like.fulfilled, (state, action) => {
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.payload._id) {
            review.likes = action.payload.likes;
            review.dislikes = action.payload.dislikes;
            review.loading = false;
            return review;
          }
          return review;
        });
      })
      .addCase(Like.pending, (state, action) => {
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.meta.arg) {
            review.loading = true;
            return review;
          }
          return review;
        });
      })
      .addCase(Like.rejected, (state, action) => {
        state.error = String(action.payload);
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.meta.arg) {
            review.loading = false;
            return review;
          }
          return review;
        });
      });

    builder
      .addCase(DisLike.fulfilled, (state, action) => {
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.payload._id) {
            review.dislikes = action.payload.dislikes;
            review.likes = action.payload.likes;
            review.loading = false;
            return review;
          }
          return review;
        });
      })
      .addCase(DisLike.pending, (state, action) => {
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.meta.arg) {
            review.loading = true;
            return review;
          }
          return review;
        });
      })
      .addCase(DisLike.rejected, (state, action) => {
        state.error = String(action.payload);
        state.reviews = state.reviews.map((review) => {
          if (review._id === action.meta.arg) {
            review.loading = false;
            return review;
          }
          return review;
        });
      });

    builder
      .addCase(writeReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(writeReview.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(writeReview.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });

    builder.addCase(removeReview.fulfilled, (state, action) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
  },
});

export default reviewSlice.reducer;
