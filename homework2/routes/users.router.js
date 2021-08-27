const router = require('express').Router();

const { usersController } = require('../controllers');
const { userMiddle } = require('../middlewares');

router.get('/', usersController.getAllUsers);
router.post('/', userMiddle.checkUniqueName, usersController.setUser);

router.delete('/:user_id', userMiddle.isUserPresent, usersController.deleteUser);
router.get('/:user_id', userMiddle.isUserPresent, usersController.getSingleUser);
router.put('/:user_id', userMiddle.isUserPresent, userMiddle.checkUniqueName, usersController.updateUser);

module.exports = router;
