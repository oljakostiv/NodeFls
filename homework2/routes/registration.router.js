const router = require('express').Router();

const {registrationController} = require('../controllers');

router.get('/', registrationController.presentUser);
router.post('/', registrationController.registrationUser);

module.exports = router;