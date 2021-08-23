const router = require('express').Router();

const {usersController} = require('../controllers');

router.get('/', usersController.getAllUsers);
router.get('/:user_id', usersController.getSingleUser);
router.post('/', usersController.setUser);

module.exports = router;
