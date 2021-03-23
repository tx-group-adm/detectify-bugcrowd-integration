module.exports.errorHandling = (msg, err, res) => {
  let error = err;
  if (typeof err === 'string') {
    try {
      error = JSON.parse(err);
    } catch (e) {
      // ignore
    }
  }
  console.error(msg, err);
  res.status(500).json({
    error: true,
    message: msg instanceof TypeError ? msg.message : msg || error.message || error,
    genericEror: error,
  });
};
