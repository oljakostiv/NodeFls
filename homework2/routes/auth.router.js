const router = require('express').Router();

const {authController} = require('../controllers');

router.get('/', authController.authUser);
router.post('/', authController.authPostUser);

module.exports = router;