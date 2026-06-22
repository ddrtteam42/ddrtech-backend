const { Router } = require('express');
const { submitApplication } = require('../controllers/applicationController');

const router = Router();

router.post('/apply', submitApplication);

module.exports = router;
