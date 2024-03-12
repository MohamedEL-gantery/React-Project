const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, 'post must have description'],
    },
    media: {
      type: String,
      required: [true, 'post must have attach file'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'post Must Belong To User'],
    },
    id: String,
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name media',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
