import { DEMO_ACTION } from './actionTypes'
const INITIAL_STATE = {
  data: {},
  loading: false
};
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DEMO_ACTION: {
      return {
        ...state,
        data: payload
      }
    }
    default: return state;
  }
}