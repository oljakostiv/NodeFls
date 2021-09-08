const router = require('express')
    .Router();

const { authController } = require('../controllers');
const {
    constants: { BODY, EMAIL },
    dbTab: { CHANGE_PASS }
} = require('../config');
const {
    authMiddle,
    mainMiddle,
} = require('../middlewares');
const {
    userValidator: {
        authUserValidator,
        password,
        passReset,
        email
    }
} = require('../validators');
const { UserModel } = require('../dataBase');

router.post('/',
    mainMiddle.isDataValid(authUserValidator, BODY),
    authMiddle.foundUser,
    authController.authPostUser);

router.get('/activate',
    authMiddle.isAccActive,
    authController.activateAccount);

router.post('/logout',
    authMiddle.validateAccessToken,
    authController.logoutUser);

router.post('/password/forgot',
    mainMiddle.isDataValid(email, BODY),
    mainMiddle.getItemByDynamicParam(UserModel, EMAIL),
    authController.mailForUserPass);

router.put('/password/forgot',
    mainMiddle.isDataValid(password, BODY),
    authMiddle.validateActionToken(CHANGE_PASS),
    authController.changePass);

router.put('/password/reset',
    mainMiddle.isDataValid(passReset, BODY),
    authMiddle.validateAccessToken,
    authMiddle.prePassword,
    authController.changePass);

router.post('/refresh',
    authMiddle.validateRefreshToken,
    authController.refresh);

module.exports = router;
