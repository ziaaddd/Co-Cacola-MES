const { validateEnv } = require('./config/env');
const app = require('./app');
const connectDb = require('./config/db');

async function startServer() {
  const config = validateEnv();
  await connectDb(config.mongoUri);

  const server = app.listen(config.port, () => {
    console.info(`MES API listening on port ${config.port}`);
  });

  const shutdown = (signal) => {
    console.info(`${signal} received; closing HTTP server`);
    server.close(async (error) => {
      if (error) {
        console.error('Failed to close HTTP server cleanly', error);
        process.exitCode = 1;
      }
      const mongoose = require('mongoose');
      await mongoose.disconnect();
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch((error) => {
  console.error('Failed to start MES API', error);
  process.exitCode = 1;
});
