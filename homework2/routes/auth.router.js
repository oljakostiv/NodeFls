const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddle } = require('../middlewares');
const { userMiddle } = require('../middlewares');
const { constants: { BODY } } = require('../config');

router.post('/', userMiddle.getUsersByDynamicParam('authUserValidator', BODY),
    authMiddle.foundUser,
    authController.authPostUser);

router.post('/logout',
    authMiddle.validateAccessToken,
    authController.logoutUser);

router.post('/refresh',
    authMiddle.validateRefreshToken,
    authController.refresh);

module.exports = router;
