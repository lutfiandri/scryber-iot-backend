const { Router } = require('express');
const router = Router();

// baseurl: /events

router.post('/', (req, res) => {
  res.json({ data: req.query.data });
});

module.exports = router;
