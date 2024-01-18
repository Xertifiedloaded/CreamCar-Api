// Import necessary modules
const jwt = require('jsonwebtoken');

const Token = (newUser, res) => {
    const token = jwt.sign(
        {
            payload: { userId: newUser._id, newUser: newUser },
        },
        process.env.SECRETKEY,
        { expiresIn: "10h" }
    );
    res.status(201).json({
        message: "Details user created successfully creates",
        user: newUser,
        token: token,
    });
};

module.exports = Token;