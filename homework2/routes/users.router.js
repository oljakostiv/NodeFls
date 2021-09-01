const router = require('express').Router();

const { usersController } = require('../controllers');
const { authMiddle, userMiddle } = require('../middlewares');
const {
    constants: {
        BODY,
        QUERY,
        PARAMS,
        USER_ID,
        ID
    },
    // userRole: { ADMIN }
} = require('../config');

router.get('/',
    userMiddle.getUsersByDynamicParam('queryUserValidator', QUERY),
    usersController.getAllUsers);

router.post('/',
    userMiddle.getUsersByDynamicParam('createUserValidator', BODY),
    userMiddle.checkUniqueName,
    usersController.setUser);

router.delete('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.getUserByDynamicParam(USER_ID, PARAMS, ID),
    // userMiddle.checkUserRoleMiddle([ADMIN]),
    authMiddle.validateAccessToken,
    usersController.deleteUser);

router.get('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.getUserByDynamicParam(USER_ID, PARAMS, ID),
    usersController.getSingleUser);

router.put('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.getUserByDynamicParam(USER_ID, PARAMS, ID),
    userMiddle.getUsersByDynamicParam('updateUserValidator'),
    userMiddle.checkUniqueName,
    usersController.updateUser);

module.exports = router;
