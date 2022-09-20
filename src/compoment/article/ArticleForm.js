import ArticleHeader from "./ArticleHeader";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articlesActions } from "../../store";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import ArticlesList from "./ArticlesList";
import classes from "./ArticleItem.module.css";
import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector((state) => state.login.accessToken);
  const pageNum = useSelector((state) => state.articles.page);
  let arliclesList = useSelector((state) => state.articles.articles);
  let displayedArticles = useSelector(
    (state) => state.articles.displayedArticles
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function requestData() {
    setIsLoading(true);
    console.log("requestData");
    console.log(pageNum);
    const response = await fetch(
      "http://34.245.213.76:3000/articles?page=" + pageNum,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    setIsLoading(false);
    console.log(data);
    if (data.status === "OK") {
      const loadedArticles = [];

      const articleData = data.response.docs;
      if (articleData.length > 0) {
        let newList = [];

        for (const key in articleData) {
          const article = articleData[key];
          let id = Math.random().toString(36).slice(2, 7);
          loadedArticles.push({
            id: article._id + id,
            title: article.headline.main,
            description: article.abstract,
          });
          newList = arliclesList.concat(loadedArticles);
        }
        dispatch(articlesActions.storeArticles(newList));
        dispatch(articlesActions.storeDisplayedArticles(newList));
      } else {
        setModalIsOpen(true);
        setModalMessage("No More Data");
      }
    } else {
      setModalIsOpen(true);
      setModalMessage("Somthing is wrong");
      dispatch(articlesActions.storeArticles([]));
      dispatch(articlesActions.storeDisplayedArticles([]));
      if (data.message == "Unauthorized") {
        logOut();
      }
    }
  }
  const fetchArticles = useCallback(async () => {
    requestData();
  }, [accessToken, pageNum, dispatch]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const logOut = () => {
    
    dispatch(articlesActions.logOut());
    navigate("/login");
  };
  return (
    <div>
      <ArticleHeader onLogOut={logOut} />

      {displayedArticles.length === 0 && (
        <div className={classes.naviator}>
          <h1>Result Not Found</h1>
        </div>
      )}
      <Modal isLoading={true} label="Loading ... " show={isLoading} />
      <Backdrop show={isLoading} />
      <Modal
        isLoading={false}
        label={modalMessage}
        show={modalIsOpen}
        closed={closeModal}
      />
      <Backdrop show={modalIsOpen} />
      <ArticlesList />
    </div>
  );
};
export default ArticleForm;
