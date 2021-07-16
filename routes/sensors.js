const { Router } = require('express');
const router = Router();
const { db } = require('../utils/firebase');
const sensorsSplitter = require('../utils/sensorsSplitter');

// baseurl: /sensors

router.post('/', async (req, res) => {
  // res.json({ error: '' });

  try {
    const now = new Date();
    const docRef = db.collection('sensors').doc(now.toTimeString());
    const data = sensorsSplitter(req.body.data);
    await docRef.set(data);
    res.json({ error: '' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get('/update', async (req, res) => {
  try {
    const now = new Date();
    const docRef = db.collection('sensors').doc(now.toTimeString());
    const data = sensorsSplitter(req.query.data);
    await docRef.set(data);
    res.json({ error: '' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
