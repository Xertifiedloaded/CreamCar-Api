const jwt = require("jsonwebtoken");
const { errorResMsg } = require("../library/ErrorHandler");
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return errorResMsg(res, 401, "Unauthorized")
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.decoded = decoded; // get the token from body
        if (!decoded)
            return errorResMsg(res, 401, "Authentication failed")
        next();
    } catch (error) {
        return errorResMsg(res,401,"Authentication failed")
    }
};

module.exports = isAuthenticated;