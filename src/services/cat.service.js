const httpStatus = require('http-status');
const sharp = require('sharp');
const { writeFile } = require('fs').promises;
const { join } = require('path');

const ApiError = require('../utils/ApiError');
const axiosClient = require('../utils/axiosClient');

const fetchCatImages = async ({ url, responseType }) => {
  const client = axiosClient(url, responseType);

  console.log('response---url---', url);

  let response = null;
  try {
    response = await client.get('/');
    response = response?.data;
  } catch (error) {
    console.log('error', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
  }

  console.log('response', response, url);

  return response;
};

const generateCatUrl = ({ type, width = 400, height = 500, color = 'Pink', size = 100 }) => {
  const req = {
    url: `https://cataas.com/cat/says/${type}?width=${width}&height=${height}&color=${color}&s=${size}`,
    responseType: 'arraybuffer',
  };
  return req;
};

const blendTwoImages = async (imageOne, imageTwo) => {
  console.log('started');

  return await sharp(imageOne)
    .composite([{ input: imageTwo, gravity: 'southeast' }])
    .toBuffer()
    .then(async (data) => {
      console.log('data', data);
      const fileOut = join(process.cwd(), `/cat-card.jpg`);

      try {
        await writeFile(fileOut, data, 'binary');
      } catch (error) {
        return 'File created unsuccessfully!';
      }

      return 'File created successfully!';
    });
};

/**
 * Query for posts
 * @returns {Promise<Cat>}
 */
const generateCats = async ({ greeting = 'Hello', who = 'You', width = 400, height = 500, color = 'Pink', size = 100 }) => {
  const urlOne = generateCatUrl({ type: greeting, width, height, color, size });
  const urlTwo = generateCatUrl({ type: who, width, height, color, size });

  console.log('response---url---', urlOne);

  const imageOne = await fetchCatImages({ ...urlOne });
  const imageTwo = await fetchCatImages({ ...urlTwo });

  return await blendTwoImages(imageOne, imageTwo);
};

module.exports = {
  generateCats,
  generateCatUrl,
};
