const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send("wow");
});

module.exports = router;

