export function checkRole(role) {
    return function(req, res, next) {
      const user = req.session.user;
      if (!user || user.role != role) {
        // User is not logged in or doesn't have the required role
        return res.status(403).send('Forbidden');
      }
      // User is logged in and has the required role
      next();
    };
  }



