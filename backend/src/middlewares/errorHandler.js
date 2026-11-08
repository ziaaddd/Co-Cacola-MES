/**
 * Express error handler. Keep internal details out of production responses.
 */
function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  const status =
    error.name === 'ValidationError' || error.name === 'CastError'
      ? 400
      : error.code === 11000
        ? 409
        : Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode < 600
          ? error.statusCode
          : 500;

  const message =
    status === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Internal server error';

  if (status === 500) console.error(error);
  res.status(status).json({ error: { message } });
}

module.exports = errorHandler;
