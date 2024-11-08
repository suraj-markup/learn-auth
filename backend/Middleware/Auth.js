const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const auth = req.cookies.authtoken;
  if (!auth) return res.status(401).json({ message: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized access, token is invalid' });
  }
};

module.exports = { ensureAuthenticated };
