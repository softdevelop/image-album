import { GET_ALL_IMAGES } from "./actionTypes";

const initState = {
  images: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ALL_IMAGES:
      return {
        ...state,
        images: action.data,
      };
    default:
      return state;
  }
}
