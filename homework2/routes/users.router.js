const router = require('express').Router();

const { usersController } = require('../controllers');
const { userMiddle } = require('../middlewares');
const {
    constants: {
        BODY,
        QUERY,
        PARAMS,
        USER_ID,
        ID
    },
    userRole: { ADMIN, USER }
} = require('../config');
const {
    userValidator: {
        createUserValidator,
        queryUserValidator,
        updateUserValidator,
        paramsUserValidator
    }
} = require('../validators');

router.get('/',
    userMiddle.getUsersByDynamicParam(queryUserValidator, QUERY),
    usersController.getAllUsers);

router.post('/',
    userMiddle.getUsersByDynamicParam(createUserValidator, BODY),
    userMiddle.checkUniqueName,
    usersController.setUser);

router.delete('/:user_id',
    userMiddle.getUsersByDynamicParam(paramsUserValidator),
    userMiddle.checkUserRoleMiddle([ADMIN]),
    usersController.deleteUser);

router.get('/:user_id',
    userMiddle.getUsersByDynamicParam(paramsUserValidator),
    userMiddle.getUserByDynamicParam(USER_ID, PARAMS, ID),
    userMiddle.checkUserRoleMiddle([
        ADMIN,
        USER
    ]),
    usersController.getSingleUser);

router.put('/:user_id',
    userMiddle.getUsersByDynamicParam(paramsUserValidator),
    userMiddle.getUsersByDynamicParam(updateUserValidator),
    userMiddle.checkUniqueName,
    usersController.updateUser);

module.exports = router;
