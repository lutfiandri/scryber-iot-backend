const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/dummy', (req, res) => {
//   console.log(req.pa)
// });

app.use('/sensors', require('./routes/sensors'));
app.use('/events', require('./routes/events'));

app.listen(5000, () => console.log('server running on port 5000'));
