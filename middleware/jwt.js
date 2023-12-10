const jwt=require("jsonwebtoken");
const createError = require("../utils/createError");
exports.verifytoken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log(token,"done")
    if (!token) next(401,"you are not authenticated")
  
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    } catch (err) {
      return next(createError(403,"Token is not valid"))
    }
  };