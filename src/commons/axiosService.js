import axios from "axios";

class AxiosService {
  constructor() {
    const instance = axios.create();
    this.instance = instance;
  }
  handleSuccess(response) {
    return response;
  }
  handleErro(erro) {
    return Promise.reject(error);
  }
  get(url) {
    return this.instance.get(url);
  }
}

export default new AxiosService();
