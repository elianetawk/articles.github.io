import axios from "axios";
import {
  API_REQUEST,
  API_REQUEST_LOGIN,
  API_REQUEST_ARTICLES,
} from "../constants";
import {
  apiStart,
  apiEnd,
  apiAccessToken,
  apiArticles,
  apiDisplayedArticles,
  apiLogOut,
} from "../actions/api";

 

const apiMiddleware =  ({ dispatch }) => (next) => (action) => {
    next(action);

    if (action.type !== API_REQUEST) return;

    const { url, method, headers, data, onSuccess, onFailure, label } =  action.payload;

    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";

    if (action.type === API_REQUEST) {
      dispatch(apiStart());
    }

    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
    let requestedData = null;
    axios
      .request({ url, method, headers, [dataOrParams]: data })
      .then(({ data }) => {
        requestedData = label === API_REQUEST_LOGIN ?data : onSuccess(data) ;
      })
      .catch((error) => {
        onFailure(error);
        if (label === API_REQUEST_ARTICLES) {
          dispatch(apiLogOut());
        }
      })
      .finally(() => {
        if (action.type === API_REQUEST) {
          dispatch(apiEnd());
        }
        if (requestedData != null) {
          if (label === API_REQUEST_LOGIN) {
            dispatch(apiAccessToken(requestedData["accessToken"]));
            onSuccess();
          } else if (label === API_REQUEST_ARTICLES) {
            dispatch(apiArticles(requestedData));
            dispatch(apiDisplayedArticles(requestedData));
          }
        }
      });
  };

export default apiMiddleware;
