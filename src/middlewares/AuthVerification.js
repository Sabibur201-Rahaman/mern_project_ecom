const { DecodeToken } = require("../utility/TokenHelper");
module.exports = (req, res, next) => {
  let token = req.headers["token"];
  // console.log(token)
  if (!token) {
    token = req.cookies["token"];
  }
  let decoded = DecodeToken(token);
  // console.log(decoded)
  if (decoded === null) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized",
    });
  } else {
    let email = decoded["email"];
    let user_id = decoded["user_id"];
    req.headers.email = email;
    req.headers.user_id = user_id;
    next()
  }
};
