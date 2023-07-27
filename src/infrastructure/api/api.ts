import axios from 'axios';
import Config from '../../config';

const instance = axios.create({
    baseURL: Config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;