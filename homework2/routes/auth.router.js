const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddle } = require('../middlewares');

router.post('/', authMiddle.validateUserBody, authMiddle.foundUser, authController.authPostUser);

module.exports = router;
// work
