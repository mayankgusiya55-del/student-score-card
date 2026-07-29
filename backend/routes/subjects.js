const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { getSubjects } = require('../controllers/subjectsController');

router.get('/', asyncHandler(getSubjects));

module.exports = router;
