import axios from "axios-minified";

const BASE_URL = axios.create({ baseURL: `${import.meta.env.VITE_URL}/api` });

export default BASE_URL;
