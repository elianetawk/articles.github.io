import { articlesActions } from "../store";
import { useSelector, useDispatch } from "react-redux";

const useFilter = () => {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();

  const setFilter = (text) => {
    var filteredArticle = articles.filter(function (article) {
      return (
        article.title.toLowerCase().includes(text.toLowerCase()) ||
        article.description.toLowerCase().includes(text.toLowerCase())
      );
    });
    dispatch(articlesActions.setDisplayedArticles(filteredArticle));
    dispatch(articlesActions.storeIsSearchMode(text !== ""));
  };

  return [setFilter];
};
export default useFilter;
