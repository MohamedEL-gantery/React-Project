const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/PostController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.route('/').get(postController.getAllPosts);

router.use(authController.protected);

router.route('/').post(upload.single('media'), postController.createPost);

router
  .route('/:id')
  .patch(upload.single('media'), postController.updatePost)
  .get(postController.getOnePost)
  .delete(postController.deletePost);

module.exports = router;
