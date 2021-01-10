import axios from 'axios';
const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    
    }
}

export default setAuthHeader;