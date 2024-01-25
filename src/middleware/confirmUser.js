const { errorResMsg } = require("../library/ErrorHandler")

const userAuth = (req, res, next) => {
    if (req.user == null) {
        errorResMsg(res, 403, "you need to sign in")
    }
    next()
}

const adminRole = (role) => {
    if (req.user.role !== role) {
        errorResMsg(res, 401, "You are not allowed")
    }
    next()
}

const adminAuth = (req, res, next) => {
    try {
        const user = req.user;
console.log(user);
        if (!user || user.role !== 'admin') {
            return errorResMsg(res, 403, "Unauthorized access");
        }
        next();
    } catch (error) {
        return errorResMsg(res, 500, "Error checking admin status");
    }
};

module.exports = { userAuth, adminRole, adminAuth }