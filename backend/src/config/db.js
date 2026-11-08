const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * @param {string} [uri] MongoDB connection string.
 * @returns {Promise<typeof mongoose>}
 */
async function connectDb(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error('MONGODB_URI is required to connect to MongoDB');
  }

  await mongoose.connect(uri);
  console.info('Connected to MongoDB');
  return mongoose;
}

module.exports = connectDb;
