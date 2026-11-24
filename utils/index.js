function sendResponse(res, { msg, status = 200, data, ...rest }) {
  res.status(status).json({
    message: msg,
    status,
    data,
    ...rest,
  });
}

module.exports = sendResponse;
