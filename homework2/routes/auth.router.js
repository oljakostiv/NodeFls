const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddle } = require('../middlewares');
const { userMiddle } = require('../middlewares');
const { constants: { BODY, } } = require('../config');

router.post('/', userMiddle.getUsersByDynamicParam('authUserValidator', BODY),
    authMiddle.foundUser,
    authController.authPostUser);

module.exports = router;
