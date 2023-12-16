module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'blug',
    jwtSession: { session: false },
  };