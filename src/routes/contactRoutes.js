const { Router } = require('express');
const { submitContact } = require('../controllers/contactController');

const router = Router();

router.post('/contact', submitContact);

module.exports = router;
