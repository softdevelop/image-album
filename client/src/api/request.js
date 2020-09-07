import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/",
  timeout: 20000,
  headers: {
    "content-type": "application/json",
    "Ocp-Apim-Subscription-Key": "149de49b198446478de94394aced5677",
  },
});

const request = (options) => {
  return instance;
};
export default request;
