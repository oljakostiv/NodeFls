const router = require('express')
    .Router();

const { usersController } = require('../controllers');
const { userMiddle } = require('../middlewares');

router.get('/',
    userMiddle.getUsersByDynamicParam('queryUserValidator', 'query'),
    usersController.getAllUsers);

router.post('/',
    userMiddle.getUsersByDynamicParam('createUserValidator', 'body'),
    userMiddle.checkUniqueName,
    usersController.setUser);

router.delete('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.checkUserRoleMiddle(['admin']),
    usersController.deleteUser);

router.get('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddle.checkUserRoleMiddle(['admin' && 'user']),
    usersController.getSingleUser);

router.put('/:user_id',
    userMiddle.getUsersByDynamicParam('paramsUserValidator'),
    userMiddle.getUsersByDynamicParam('updateUserValidator'),
    userMiddle.checkUniqueName,
    usersController.updateUser);

module.exports = router;
