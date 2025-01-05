// src/controllers/dataController.js
const { getCache, setCache } = require('../../../src/services/cacheService');

// Example route handler
const getData = async (req, res) => {
  const cacheKey = 'data';  // Unique cache key

  try {
    // Check if the data is in cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log('Serving data from cache');
      return res.json(cachedData);
    }

    // Fetch data from database (simulated)
    const data = { message: 'Data from database' };

    // Store the data in Redis cache for future use
    await setCache(cacheKey, data);

    console.log('Serving data from DB');
    return res.json(data);
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getData };
