import { GET_ALL_IMAGES, UPLOAD_IMAGES, DELETE_IMAGES } from "./actionTypes";
import request from "../../api/request";

export function set_images(data) {
  return {
    type: GET_ALL_IMAGES,
    data,
  };
}

export function set_data_after_images(data) {
  return {
    type: UPLOAD_IMAGES,
    data,
  };
}

export function set_data_delete(data) {
  return {
    type: DELETE_IMAGES,
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

export function uploadImages(data) {
  return (dispatch) => {
    return request()
      .put(`photos`, data)
      // .then((response) => {
      //   dispatch(set_images(response.data));
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  };
}

export function deleteImages(data) {
  return (dispatch) => {
    return request()
      .delete(`photos`, { data })
      .then((response) => {
        dispatch(set_data_delete(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default {
  getAllImages,
  uploadImages,
};
