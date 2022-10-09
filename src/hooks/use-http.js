import { API_REQUEST } from "../constants";
const useHttp = () => {
  const sendRequest = (requestConfig, onSuccess, onFailure) => {
    return apiAction({
      url: requestConfig.url,
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      data: requestConfig.body ? requestConfig.body : null,
      onSuccess: onSuccess,
      onFailure: onFailure,
      label: requestConfig.label,
    });
  };

  function apiAction({
    url = "",
    method = "",
    headers = {},
    data = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
  }) {
    return {
      type: API_REQUEST,
      payload: {
        url,
        method,
        headers,
        data,
        onSuccess,
        onFailure,
        label,
      },
    };
  }
  return { sendRequest };
};
export default useHttp;
