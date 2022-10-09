import { useSelector } from "react-redux";
import ArticleItem from "./ArticleItem";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { articlesActions } from "../../store";
import classes from "./ArticleItem.module.css";
const ArticlesList = () => {
  const articles = useSelector((state) => state.articles.displayedArticles);
  const isSearchMode = useSelector((state) => state.articles.isSearchMode);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  const list = articles.map((article) => (
    <ArticleItem
      key={article.id}
      id={article.id}
      title={article.title}
      description={article.description}
    />
  ));

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  function fetchMoreListItems() {
    setTimeout(() => {
      if (!isSearchMode) {
        dispatch(articlesActions.incrementPage());
      }
      setIsFetching(false);
    }, 1000);
  }
  return (
    <section>
      <div>
        <ul className={classes.emptyItem}></ul>
        <ul>{list}</ul>
      </div>
    </section>
  );
};

export default ArticlesList;
