const router = require('express')
    .Router();

const { usersController } = require('../controllers');
const {
    constants: {
        BODY,
        QUERY,
        PARAMS,
        USER_ID,
        ID
    },
    userRole: { ADMIN }
} = require('../config');
const { UserModel } = require('../dataBase');
const {
    authMiddle,
    mainMiddle,
    userMiddle
} = require('../middlewares');
const {
    userValidator: {
        queryUserValidator,
        updateUserValidator,
        paramsUserValidator,
        createUserValidator
    }
} = require('../validators');

router.get('/',
    mainMiddle.isDataValid(queryUserValidator, QUERY),
    usersController.getAllUsers);

router.post('/',
    mainMiddle.isDataValid(createUserValidator, BODY),
    userMiddle.checkUniqueName,
    usersController.setUser);

router.delete('/:user_id',
    mainMiddle.isDataValid(paramsUserValidator),
    authMiddle.validateAccessToken,
    mainMiddle.getItemByDynamicParam(UserModel, USER_ID, PARAMS, ID),
    userMiddle.isNotPresent,
    userMiddle.checkUserRoleMiddle([ADMIN]),
    usersController.deleteUser);

router.get('/:user_id',
    mainMiddle.isDataValid(paramsUserValidator),
    mainMiddle.getItemByDynamicParam(UserModel, USER_ID, PARAMS, ID),
    usersController.getSingleUser);

router.put('/:user_id',
    mainMiddle.isDataValid(paramsUserValidator),
    mainMiddle.isDataValid(updateUserValidator, BODY),
    authMiddle.validateAccessToken,
    mainMiddle.getItemByDynamicParam(UserModel, USER_ID, PARAMS, ID),
    userMiddle.checkUniqueName,
    userMiddle.updateMiddle,
    usersController.updateUser);

module.exports = router;
