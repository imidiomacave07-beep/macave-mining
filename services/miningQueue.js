const queue = new Map();

function isProcessing(userId) {
  return queue.get(userId);
}

function lock(userId) {
  queue.set(userId, true);
}

function unlock(userId) {
  queue.delete(userId);
}

module.exports = { isProcessing, lock, unlock };
