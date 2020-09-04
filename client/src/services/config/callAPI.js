import axios from "axios";
export const callAPI = (method, url, data) => {
  return axios({
    baseURL: 'https://coinrepublic-uat.azure-api.net/api',
    timeout: 20000,
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': '149de49b198446478de94394aced5677'
    },
    method,
    url,
    data,
  })
}