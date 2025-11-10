// server.js
require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config');

const PORT = config.port;

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 CampusLearn Backend Server Started Successfully!
📍 Server: http://localhost:${PORT}
🌍 Environment: ${config.nodeEnv}
📊 Health Check: http://localhost:${PORT}/api/health
📚 API Documentation: http://localhost:${PORT}/api
⏰ Started at: ${new Date().toLocaleString()}
  `);
});