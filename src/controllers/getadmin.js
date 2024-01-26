const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.models");

const getAllAccount = async (req, res) => {
  try {
    const users = await Admin.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { getAllAccount, authenticateToken };
