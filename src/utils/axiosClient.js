const axios = require('axios');

const createClient = (baseUrl, headers = {}, responseType = '') => {
  const apiClient = axios.create({
    responseType: 'arraybuffer',
    headers: {
      ...headers,
    },
    baseURL: baseUrl,
  });

  return apiClient;
};

module.exports = createClient;
