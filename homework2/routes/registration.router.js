const router = require('express').Router();

const {registrationController} = require('../controllers');

router.get('/', registrationController.presentUser);

module.exports = router;
