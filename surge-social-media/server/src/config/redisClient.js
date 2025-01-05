// src/config/redisClient.js
const redis = require('redis');

// Create a Redis client instance
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost', // Use environment variable for flexibility
  port: process.env.REDIS_PORT || 6379,       // Default Redis port
});

client.on('error', (err) => {
  console.log('Error connecting to Redis: ' + err);
});

module.exports = client;
