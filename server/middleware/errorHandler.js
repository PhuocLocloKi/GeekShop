module.exports = (err, req, res, next) => {
  console.error('SYSTEM_ROUTING_EXCEPTION_THROWN:', err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || 'Fatal error: Internal server processing anomaly.';

  res.status(status).json({
    message,
    status,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
