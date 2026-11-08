const jwt = require('jsonwebtoken');

function unauthorized(res) {
  return res.status(401).json({ error: { message: 'Authentication required' } });
}

/**
 * Require a valid Bearer token and attach its claims to the request.
 */
function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return unauthorized(res);
  if (!process.env.JWT_SECRET) return next(new Error('JWT_SECRET is not configured'));

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return unauthorized(res);
    }
    return next(error);
  }
}

/**
 * Restrict a route to one or more user roles. Use after authenticate.
 * @param {...string} allowedRoles
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: { message: 'Insufficient permissions' } });
    }
    return next();
  };
}

module.exports = { authenticate, authorize };
