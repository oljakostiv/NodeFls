const router = require('express')
    .Router();

const { authController } = require('../controllers');
const {
    actions: { FORGOT_PASS },
    constants: { BODY, EMAIL },
    // dbTab: { CHANGE_PASS }
} = require('../config');
const {
    authMiddle,
    mainMiddle,
    // userMiddle
} = require('../middlewares');
const {
    userValidator: {
        authUserValidator,
        password,
        // passReset,
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

router.post('/password/forgot/send',
    mainMiddle.isDataValid(email, BODY),
    mainMiddle.getItemByDynamicParam(UserModel, EMAIL),
    // userMiddle.isNotPresent,
    authController.mailForUserPass);

router.post('/password/forgot/set',
    mainMiddle.isDataValid(password, BODY),
    authMiddle.validateActionToken(FORGOT_PASS),
    authController.changePass);

router.put('/password/reset');

router.post('/refresh',
    authMiddle.validateRefreshToken,
    authController.refresh);

module.exports = router;
