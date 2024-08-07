import axios from "axios";

const baseURL = "/api";
class apiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  defineInsideConfig = () => {
    const config = {
      baseUrl: this.baseURL,
      header: {},
    };
    return config;
  };
  interceptors = (instance) => {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  };

  request = (config) => {
    config = { ...this.defineInsideConfig(), ...config };
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance);
    return axiosInstance(config);
  };
}
const APIClient = new apiClient(baseURL);
export default APIClient;
