import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://service-i0ba2lfw-1317186071.gz.apigw.tencentcs.com/'
});

export default instance