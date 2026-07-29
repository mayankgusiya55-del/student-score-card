const { body, param, validationResult } = require('express-validator');

// Runs after the *ValidationRules array and turns errors into a 400 response
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

const studentValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Student name is required')
    .isLength({ min: 2, max: 150 }).withMessage('Name must be 2-150 characters')
    .matches(/^[a-zA-Z\s.'-]+$/).withMessage('Name must contain only letters and spaces'),
  body('roll_no')
    .trim()
    .notEmpty().withMessage('Roll number is required')
    .isLength({ max: 50 }).withMessage('Roll number too long'),
  body('class')
    .trim()
    .notEmpty().withMessage('Class is required')
    .isLength({ max: 50 }).withMessage('Class value too long')
];

const marksValidationRules = [
  body('student_id')
    .notEmpty().withMessage('student_id is required')
    .isInt({ min: 1 }).withMessage('student_id must be a valid positive integer'),
  body('marks')
    .isArray({ min: 1 }).withMessage('marks must be a non-empty array'),
  body('marks.*.subject_id')
    .notEmpty().withMessage('subject_id is required for each mark entry')
    .isInt({ min: 1 }).withMessage('subject_id must be a valid positive integer'),
  body('marks.*.marks_obtained')
    .notEmpty().withMessage('marks_obtained is required for each mark entry')
    .isFloat({ min: 0, max: 100 }).withMessage('marks_obtained must be between 0 and 100')
];

const idParamRule = [
  param('id').isInt({ min: 1 }).withMessage('Invalid id supplied')
];

module.exports = { validate, studentValidationRules, marksValidationRules, idParamRule };
