import axios from "axios";

const instance = axios.create({
  baseURL: 'https://coinrepublic-uat.azure-api.net/api',
  timeout: 20000,
  headers: {
    'content-type': 'application/json',
    'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677'
  },
});


const request = (options) => {
  // modify headers
  // instance.defaults.headers.common['Authorization'] = "";
  return instance
}

/**
 * How to use request
 * EX: 
 * - POST /login
 * request().post("/login", {username: "abc", password: "123"})
 * 
 * - GET /auth
 * request().get("/auth")
 * 
 */

export default request;
