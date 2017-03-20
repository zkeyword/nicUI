const express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    let data = { title: 'moeui', isHome: true }
    res.render('index', data);
});

module.exports = router;