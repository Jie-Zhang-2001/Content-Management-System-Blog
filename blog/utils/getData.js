const axios = require('axios');

const getData = async (url) => {
        const data = await axios.get(url);
        return data;
}

export default getData;