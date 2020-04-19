import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-582fa.firebaseio.com/"
});

export default instance;
