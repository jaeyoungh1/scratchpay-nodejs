const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

// generic test route
router.get('/test', function (req, res) {
    res.json({ "Testing": "Hello World 🌎!" });
});


module.exports = router