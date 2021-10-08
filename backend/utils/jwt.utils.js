// Imports
const jwt = require('jsonwebtoken');

// Exported functions
module.exports = {
  /**
   * Generates token for a specific user
   * @param {{id: number, isAdmin: boolean}}} userData 
   * @returns 
   */
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: '24h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    const userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
} 