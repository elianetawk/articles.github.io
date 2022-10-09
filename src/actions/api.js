import { articlesActions, logInActions } from "../store";

export const apiStart = () => articlesActions.IsLoadingData(true);
export const apiEnd = () => articlesActions.IsLoadingData(false);
export const apiAccessToken = (accessToken) => logInActions.setAccessToken(accessToken);
export const apiArticles = (articles) => articlesActions.setArticles(articles);
export const apiDisplayedArticles = (articles) => articlesActions.setDisplayedArticles(articles);
export const apiLogOut = () => articlesActions.logOut();
