const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments_controller');
const passport = require('passport');

// Define a dynamic route parameter for the post ID
router.post('/create', passport.checkAuthentication, commentController.create);
router.post('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;
