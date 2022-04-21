const Joi = require('@hapi/joi');

const cats = {
  body: Joi.object().keys({
    greeting: Joi.string(),
    who: Joi.string(),
    width: Joi.number(),
    height: Joi.number(),
    color: Joi.string(),
    size: Joi.number(),
  }),
};

module.exports = {
  cats,
};
