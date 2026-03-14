const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const extractToken = (req) => {
  if (req.cookies?.admin_session) return req.cookies.admin_session;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return null;
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find admin and attach to request
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or inactive admin account' 
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Authentication error' 
    });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select('-password');
      
      if (admin && admin.isActive) {
        req.admin = admin;
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
}; 