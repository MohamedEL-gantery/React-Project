const joi = require('joi');

exports.newPost = (post) => {
  const schema = joi.object({
    description: joi.string().trim().required(),
    media: joi.string().required(),
    user: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    id: joi.string(),
  });

  return schema.validate(post);
};

exports.updatePost = (post) => {
  const schema = joi.object({
    description: joi.string().trim(),
    media: joi.string(),
  });

  return schema.validate(post);
};
