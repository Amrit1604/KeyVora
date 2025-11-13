// Express error-handling middleware - ensure 4 args so Express recognizes it
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Error handler caught:', err && err.stack ? err.stack : err);

  // Handle body-parser / JSON parse errors explicitly
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }

  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Malformed JSON in request body' });
  }

  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Something went wrong!';
  res.status(status).json({ message });
};

module.exports = errorHandler;