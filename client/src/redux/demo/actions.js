import { GET_ALL_IMAGES } from "./actionTypes";
import request from "../../api/request";

export function set_images(data) {
  return {
    type: GET_ALL_IMAGES,
    data,
  };
}

export function getAllImages(data) {
  return (dispatch) => {
    return request()
      .post(`photos/list`, data)
      .then((response) => {
        dispatch(set_images(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default {
  getAllImages,
};
