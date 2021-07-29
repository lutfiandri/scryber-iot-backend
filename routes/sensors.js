const { Router } = require('express');
const router = Router();
const { db } = require('../utils/firebase');
const sensorsSplitter = require('../utils/sensorsSplitter');
const fetch = require('node-fetch');

// baseurl: /sensors

router.post('/', async (req, res) => {
  try {
    const colRef = db.collection('sensors');
    const data = sensorsSplitter(req.body.data);
    await colRef.add(data);
    res.json({
      status: 'success',
      error: '',
    });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
});

module.exports = router;
