const express = require('express')
router = express.Router()

router.get('/topsecret', (req, res) => {
    res.send("THIS IS TOP SECRET")
})

module.exports = router