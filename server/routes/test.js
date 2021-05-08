var express = require("express");
var router = express.Router();

router.get("/test", function (req, res, next) {
    res.send("12345678 this message is sent from the server");
    //
});

module.exports = router;