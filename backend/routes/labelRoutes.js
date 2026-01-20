const express = require("express");
const router = express.Router();
const labelController = require("../controllers/labelController");

router.post("/auto-label", labelController.autoLabelData);
router.put("/:id/approve", labelController.approveLabel);
router.put("/:id/override", labelController.overrideLabel);
router.get("/stats", labelController.getStats);

module.exports = router;
