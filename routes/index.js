const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

console.log("Router loaded");


//making it available for outside
module.exports = router;