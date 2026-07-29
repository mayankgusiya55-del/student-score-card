const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');
const { validate, studentValidationRules, idParamRule } = require('../middleware/validators');
const {
  getStudents,
  getStudentById,
  createStudent,
  getStudentResult
} = require('../controllers/studentsController');

router.get('/', asyncHandler(getStudents));
router.post('/', studentValidationRules, validate, asyncHandler(createStudent));
router.get('/:id', idParamRule, validate, asyncHandler(getStudentById));
router.get('/:id/result', idParamRule, validate, asyncHandler(getStudentResult));

module.exports = router;
