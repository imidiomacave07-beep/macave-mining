const fs = require('fs');
const logFile = 'activity.log';

function logActivity(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
  console.log(`[${timestamp}] ${message}`);
}

module.exports = logActivity;
