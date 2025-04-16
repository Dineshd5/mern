const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: `welcome ${req.user.id},you are authenticated` });
});

module.exports = router;
