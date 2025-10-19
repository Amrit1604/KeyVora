const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    padsFile: './data/pads.json',
    usersFile: './data/users.json',
    sessionsFile: './data/sessions.json',
  },
  encryption: {
    algorithm: 'AES-GCM',
    keyLength: 256,
  },
};

module.exports = config;