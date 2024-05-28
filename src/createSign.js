export const cryptoSign = (method, path, body = "") => {
  const crypto = require("crypto-js");
  const secret = localStorage.getItem("Secret");
  let signStr = `${method}${path}${body}${secret}`;
  let sign = crypto.MD5(signStr).toString();
  return sign;
};
