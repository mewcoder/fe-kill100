import axios from 'axios'
import { useMessage } from 'naive-ui'
const repo = 'https://api.github.com/repos/mewcoder/FE-Qu'

// const token = localStorage.getItem('token')

// axios.defaults.headers['authorization'] = `Bearer ${token}`;

axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem("token")
  if (token) {
    config.headers['authorization'] = `Bearer ${atob(token)}`;
  } else if (!token && config.method == 'post') {
    config.headers['authorization'] = `Bearer xxxxxxxxx`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});



export default {
  getLabels() {
    return axios.get(`${repo}/labels`)
  },
  getOneQuestion(id) {
    return axios.get(`${repo}/issues/${id}`)
  },
  getAllQuestion(data) {
    return axios.get(`${repo}/issues`, {
      params: data
    })
  },
  addOneQuestion(data) {
    return axios.post(`${repo}/issues`, data)
  }
}

