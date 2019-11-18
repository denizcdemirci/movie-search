import axios from 'axios';

const apiUrl = 'https://www.omdbapi.com/';
const apiKey = '91275cd';

export default {
  search(name, year, type) {
    return axios.get(apiUrl, {
      params: {
        apikey: apiKey,
        s: name,
        y: year,
        type: type
      }
    });
  }
}
