import ArticleHeader from "./ArticleHeader";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articlesActions } from "../../store";
import Modal from "../Modal/Modal";
import ArticlesList from "./ArticlesList";
import classes from "./ArticleItem.module.css";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {
  LOADING,
  WRONG,
  UNAUTHORIZED,
  NO_MORE_DATA,
  API_REQUEST_ARTICLES,
} from "../../constants";

const ArticleForm = () => {
  const accessToken = useSelector((state) => state.login.accessToken);
  const IsLoadingData = useSelector((state) => state.articles.IsLoadingData);
  const pageNum = useSelector((state) => state.articles.page);
  let arliclesList = useSelector((state) => state.articles.articles);
  let displayedArticles = useSelector(
    (state) => state.articles.displayedArticles
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const httpData = useHttp();
  const { sendRequest: fetchArticles } = httpData;

  const updateModal = (message) => {
    setModalIsOpen(true);
    setModalMessage(message);
  };

  const prepareNewList = (articleData) => {
    const loadedArticles = [];
    let newList = [];
    for (const key in articleData) {
      const article = articleData[key];
      let id = Math.random().toString(36).slice(2, 7);
      loadedArticles.push({
        title: article.headline.main,
        description: article.abstract,
        id: article._id + id,
      });
    }
    newList = arliclesList.concat(loadedArticles);
    return newList;
  };
  const onSuccess = (data) => {
    const articleData = data.response.docs;
    if (articleData.length > 0) {
      let newList = prepareNewList(articleData);
      return newList;
    } else {
      updateModal(NO_MORE_DATA);
    }
    return null;
  };

  const onFailure = (error) => {
    if (error.response.data.message === UNAUTHORIZED) {
      navigate("/login");
    } else {
      updateModal(WRONG);
    }
  };

  useEffect(() => {
    const requestConfig = {
      url: "http://34.245.213.76:3000/articles?page=" + pageNum,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      label: API_REQUEST_ARTICLES,
    };
    dispatch(fetchArticles(requestConfig, onSuccess, onFailure));
  }, [dispatch, pageNum, accessToken]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <ArticleHeader />

      {displayedArticles.length === 0 && (
        <div className={classes.notfound}>
          <h1>Result Not Found</h1>
        </div>
      )}
      <Modal isLoading={true} label={LOADING} show={IsLoadingData} />
      <Modal
        isLoading={false}
        label={modalMessage}
        show={modalIsOpen}
        closed={closeModal}
      />

      <ArticlesList />
    </div>
  );
};

export default ArticleForm;
