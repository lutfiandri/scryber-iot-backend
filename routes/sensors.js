const { Router } = require('express');
const router = Router();
const { db } = require('../utils/firebase');
const sensorsAverage = require('../utils/sensorsAverage');
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

router.post('/daily', async (req, res) => {
  // const today = new Date(); // 00:01 malam
  // const yesterdayEnd = new Date(
  //   today -
  //     today.getHours() * 60 * 60 * 1000 -
  //     today.getMinutes() * 60 * 1000 -
  //     today.getSeconds() * 1000 -
  //     1000 // biar 23.59.59 GMT0
  // );

  const yesterdayEnd = new Date();
  const yesterdayStart = new Date(yesterdayEnd - 24 * 60 * 60 * 1000);

  try {
    await db
      .collection('sensors')
      .where('created_at', '>', yesterdayStart)
      .where('created_at', '<=', yesterdayEnd)
      .get()
      .then((querySnapshot) => {
        const sensorsData = [];
        querySnapshot.forEach((doc) => {
          sensorsData.push(doc.data());
        });

        const averageSensorsData = sensorsAverage(
          sensorsData,
          yesterdayStart,
          yesterdayEnd
        );

        db.collection('sensors_daily')
          .add(averageSensorsData)
          .then(() =>
            res.json({
              status: 'success',
              error: '',
            })
          );
      });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
});

router.post('/weekly', async (req, res) => {
  // const today = new Date(); // 00:01 malam
  // const lastSundayEnd = new Date(
  //   today -
  //     (today.getDay() - 1) * 24 * 60 * 60 * 1000 -
  //     today.getHours() * 60 * 60 * 1000 -
  //     today.getMinutes() * 60 * 1000 -
  //     today.getSeconds() * 1000 -
  //     1000 // biar 23.59.59
  // );

  const lastSundayEnd = new Date();
  const lastSundayStart = new Date(lastSundayEnd - 7 * 24 * 60 * 60 * 1000);

  try {
    await db
      .collection('sensors_daily')
      .where('time_end_at', '>', lastSundayStart)
      .where('time_end_at', '<=', lastSundayEnd)
      .get()
      .then((querySnapshot) => {
        const sensorsData = [];
        querySnapshot.forEach((doc) => {
          sensorsData.push(doc.data());
        });

        const averageSensorsData = sensorsAverage(
          sensorsData,
          lastSundayStart,
          lastSundayEnd
        );

        console.log(sensorsData);

        db.collection('sensors_weekly')
          .add(averageSensorsData)
          .then(() =>
            res.json({
              status: 'success',
              error: '',
            })
          );
      });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
});

module.exports = router;
