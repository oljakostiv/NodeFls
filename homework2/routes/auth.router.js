const router = require('express')
    .Router();

const { authController } = require('../controllers');
const { constants: { BODY } } = require('../config');
const {
    authMiddle,
    mainMiddle
} = require('../middlewares');
const {
    userValidator: { authUserValidator }
} = require('../validators');

router.post('/',
    mainMiddle.isDataValid(authUserValidator, BODY),
    authMiddle.foundUser,
    authController.authPostUser);

router.post('/logout',
    authMiddle.validateAccessToken,
    authController.logoutUser);

router.post('/refresh',
    authMiddle.validateRefreshToken,
    authController.refresh);

module.exports = router;
