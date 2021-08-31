const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddle } = require('../middlewares');
const { authMiddle } = require('../middlewares');

router.post('/', userMiddle.getUsersByDynamicParam('authUserValidator'),
    authMiddle.foundUser,
    authController.authPostUser);

module.exports = router;
