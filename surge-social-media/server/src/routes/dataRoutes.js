// src/routes/dataRoutes.js
const express = require('express');
const { getData } = require('../controllers/dataController');
const router = express.Router();

// Define your API routes
router.get('/data', getData);

module.exports = router;
