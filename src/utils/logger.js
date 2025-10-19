const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

function logInfo(message) {
  const logMessage = `[INFO] ${new Date().toISOString()}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

function logError(message) {
  const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

function logWarning(message) {
  const logMessage = `[WARNING] ${new Date().toISOString()}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

module.exports = {
  logInfo,
  logError,
  logWarning,
};