const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

// services
const { catService } = require('../services');

const cats = catchAsync(async (req, res) => {
  const data = await catService.generateCats({ ...req.body });
  res.status(httpStatus.OK).send(data);
});

module.exports = {
  cats,
};
