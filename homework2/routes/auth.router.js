const router = require('express')
    .Router();

const { authController } = require('../controllers');
const {
    authMiddle,
    mainMiddle
} = require('../middlewares');
const { userMiddle } = require('../middlewares');
const { constants: { BODY } } = require('../config');
const {
    userValidator: { authUserValidator }
} = require('../validators');

router.post('/',
    mainMiddle.isDataValid(authUserValidator, BODY),
    userMiddle.getUserByDynamicParam('name'),
    authMiddle.foundUser,
    authController.authPostUser);

router.post('/logout',
    authMiddle.validateAccessToken,
    authController.logoutUser);

router.post('/refresh',
    authMiddle.validateRefreshToken,
    authController.refresh);

module.exports = router;
