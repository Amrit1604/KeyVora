const errorHandler = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
};

module.exports = errorHandler;