const authMiddleware = (req, res, next) => {
  
    if (!if req.headers['authorisation']) {
      return res.status(401).send ("NO ENTRY!");
    } 
    next();
  };

export default authMiddleware;
