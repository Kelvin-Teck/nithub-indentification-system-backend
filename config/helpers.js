const QRCode = require("qrcode");

const sendError = (message, code) => {
  var error = {
    status: "ERROR",
    code: code,
    message: message,
  };

  return error;
};

const sendSuccess = (message, data = undefined) => {
  var success = {
    status: "SUCCESS",
    code: 200,
    message: message,
    data: data,
  };

  return success;
};

const newError = (message, code) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};

const generateQRCode = async (data) => {
  try {
    const json_to_string = JSON.stringify(data);
    const code = await QRCode.toDataURL(json_to_string);

    return code;
  } catch (error) {
    return newError(
      `an error occured while generating QRCode '--${error.message}--'`,
      404
    );
  }
};

module.exports = {
  sendError,
  sendSuccess,
  newError,
  generateQRCode,
};
