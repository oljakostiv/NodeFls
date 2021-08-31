const router = require('express')
    .Router();

const { usersController } = require('../controllers');
const { userMiddle } = require('../middlewares');

router.get('/',
    userMiddle.validateUserQuery,
    userMiddle.getUsersByDynamicParam('role'),
    // userMiddle.allUsersPresent,
    usersController.getAllUsers);
router.post('/',
    userMiddle.validateUserBody,
    // userMiddle.getUserByDynamicParam('name'),
    userMiddle.checkUniqueName,
    usersController.setUser);

router.delete('/:user_id',
    userMiddle.validateUserParams,
    userMiddle.isUserPresent,
    userMiddle.checkUserRoleMiddle(['admin']),
    usersController.deleteUser);
router.get('/:user_id',
    userMiddle.validateUserParams,
    userMiddle.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddle.checkUserRoleMiddle(['admin' && 'user']),
    usersController.getSingleUser);
router.put('/:user_id',
    userMiddle.validateUserParams,
    userMiddle.validateUserUpdate,
    userMiddle.isUserPresent,
    userMiddle.checkUniqueName,
    usersController.updateUser);

module.exports = router;
