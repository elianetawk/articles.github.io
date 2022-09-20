import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialLogInState = { accessToken: "" };
const loginSlice = createSlice({
  name: "login",
  initialState: initialLogInState,
  reducers: {
    storeAccessToken(state, action) {
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
    storeArticles(state, action) {
      state.articles = action.payload;
    },
    storeDisplayedArticles(state, action) {
      state.displayedArticles = action.payload;
    },
    incrementPage(state) {
      state.page = state.page + 1;
    },

    storeIsSearchMode(state, action) {
      state.isSearchMode = action.payload;
    },
    logOut(state) {
      state.articles = [];
      state.displayedArticles = [];
      state.page = 0;
      state.isSearchMode = false;
      //state = undefined;
      // console.log("logOut");
      // console.log(state.page);
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    articles: articlesSlice.reducer,
  },
});
export const logInActions = loginSlice.actions;
export const articlesActions = articlesSlice.actions;
export default store;
