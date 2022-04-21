const express = require('express');
const catsRoute = require('./cats.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/cats', catsRoute);
router.use('/docs', docsRoute);

module.exports = router;
