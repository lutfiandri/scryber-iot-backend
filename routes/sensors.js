const { Router } = require('express');
const router = Router();
const { db } = require('../utils/firebase');
const sensorsSplitter = require('../utils/sensorsSplitter');
const fetch = require('node-fetch');

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

router.get('/dummy', async (req, res) => {
  try {
    const response = await fetch(
      'https://scryber-iot-backend.vercel.app/sensors/update/?data=9;8;7;6;5;4;3;2'
    );
    const responseJson = await response.json();
    res.json({ data: 'ok aman' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
