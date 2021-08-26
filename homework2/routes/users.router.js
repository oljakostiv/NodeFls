const router = require('express').Router();

const { usersController } = require('../controllers');
const { isUserPresent, checkUniqueName } = require('../middlewares/user.middleware');

router.get('/', usersController.getAllUsers);
router.get('/:user_id', isUserPresent, usersController.getSingleUser);
router.post('/', checkUniqueName, usersController.setUser);
router.delete('/:user_id', isUserPresent, usersController.deleteUser);

module.exports = router;
