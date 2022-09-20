import classes from "./ArticleHeader.module.css";
import SearchField from "./SearchField";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { articlesActions } from "../../store";

const ArticleHeader = (props) => {
  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  const onChangeSearch = (text) => {
    // if (text === "") {
    filterArticle(text);
    // }
    dispatch(articlesActions.storeIsSearchMode(text !== ""));
  };
  // const onSubmitSearch = (text) => {
  //   if (text !== "") {
  //     filterArticle(text);
  //   }
  //   dispatch(articlesActions.storeIsSearchMode(text !== ""));
  // };

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
        <button onClick={props.onLogOut}>Logout</button>
      </nav>
      <nav>
        <h1>React Artiles</h1>
      </nav>
      <nav>
        <SearchField
          label="Search"
          onChange={onChangeSearch}
//onSubmit={onSubmitSearch}
        />
      </nav>
    </header>
  );
};

export default ArticleHeader;
