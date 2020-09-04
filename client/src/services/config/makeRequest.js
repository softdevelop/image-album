import { callAPI } from './callAPI'

export const haddleError = (error) => {

}

const makeRequest = async (
  method,
  url,
  data) => {
  try {
    const res = await callAPI(method, url, data);
    return await res;
  } catch (error) {
    haddleError(error);
  }
}

export default makeRequest