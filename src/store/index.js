
import { createSlice, configureStore } from "@reduxjs/toolkit";
import apiMiddleware from "../middleware/api";

const initialLogInState = { accessToken: "" };
const loginSlice = createSlice({
  name: "login",
  initialState: initialLogInState,
  reducers: {
   setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

const initialArticlesState = {
  articles: [],
  displayedArticles: [],
  page: 0,
  isSearchMode: false,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
    
    setDisplayedArticles(state, action) {
      state.displayedArticles = action.payload;
    },
    incrementPage(state) {
      state.page = state.page + 1;
    },

    storeIsSearchMode(state, action) {
      state.isSearchMode = action.payload;
    },

    IsLoadingData(state, action) {
      state.IsLoadingData = action.payload;
    },

    logOut(state) {
      state.articles = [];
      state.displayedArticles = [];
      state.page = 0;
      state.isSearchMode = false;
      state.IsLoadingData = false;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    articles: articlesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).prepend(apiMiddleware),
});
export const logInActions = loginSlice.actions;
export const articlesActions = articlesSlice.actions;
export default store;
