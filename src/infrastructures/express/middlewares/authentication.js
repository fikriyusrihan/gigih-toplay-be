const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authenticate(req, res, next) {
  const bearerToken = req.header('Authorization');
  const token = bearerToken ? bearerToken.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;
