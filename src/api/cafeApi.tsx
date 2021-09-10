import axios from "axios";

const baseURL = 'https://cafe-rn.herokuapp.com/api';

const cafeApi = axios.create({ baseURL });

export default cafeApi;