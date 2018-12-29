import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerking-52a90.firebaseio.com/'
});

export default instance;