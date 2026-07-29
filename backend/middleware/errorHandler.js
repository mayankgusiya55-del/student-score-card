
function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);


  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists (duplicate roll number or marks entry).'
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Could not connect to the database. Please try again later.'
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server.'
  });
}


const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

module.exports = { errorHandler, asyncHandler, notFound };
