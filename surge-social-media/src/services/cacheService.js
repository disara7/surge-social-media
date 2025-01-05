// src/services/cacheService.js
const redisClient = require('../config/redisClient');

// Function to get data from Redis cache
const getCache = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) return reject(err);
      resolve(data ? JSON.parse(data) : null); // Parse JSON if data is available
    });
  });
};

// Function to set data in Redis cache
const setCache = (key, value, expirationTime = 3600) => {
  return new Promise((resolve, reject) => {
    redisClient.setex(key, expirationTime, JSON.stringify(value), (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

module.exports = { getCache, setCache };
