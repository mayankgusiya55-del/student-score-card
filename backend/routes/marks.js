const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { validate, marksValidationRules } = require('../middleware/validators');
const { submitMarks } = require('../controllers/marksController');

router.post('/', marksValidationRules, validate, asyncHandler(submitMarks));

module.exports = router;
