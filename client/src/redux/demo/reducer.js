import { GET_ALL_IMAGES, UPLOAD_IMAGES } from "./actionTypes";

const initState = {
  images: {},
  isUploadSuccess: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ALL_IMAGES:
      return {
        ...state,
        images: action.data,
      };
    case UPLOAD_IMAGES:
      return {
        ...state,
        isUploadSuccess: true,
      };
    default:
      return state;
  }
}
