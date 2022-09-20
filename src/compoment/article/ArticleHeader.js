import classes from "./ArticleHeader.module.css";
import SearchField from "./SearchField";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { articlesActions } from "../../store";

const ArticleHeader = (props) => {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  const onChangeSearch = (text) => {
    filterArticle(text);
    dispatch(articlesActions.storeIsSearchMode(text !== ""));
  };

  const filterArticle = (text) => {
    var filteredArticle = articles.filter(function (article) {
      return (
        article.title.toLowerCase().includes(text.toLowerCase()) ||
        article.description.toLowerCase().includes(text.toLowerCase())
      );
    });
    dispatch(articlesActions.storeDisplayedArticles(filteredArticle));
  };

  return (
    <header className={classes.header}>
      <nav>
        <h1>React Artiles</h1>
      </nav>
      <nav></nav>
      <nav></nav>
      <nav>
        <Link to="/login" onClick={props.onLogOut}>
          LogOut
        </Link>
      </nav>
      <nav>
        <SearchField label="Search" onChange={onChangeSearch} />
      </nav>
    </header>
  );
};

export default ArticleHeader;
