const express = require("express");

const {
  addAgent,
  getAgents,
  updateAgent,
  deleteAgent
} = require(
  "../controllers/agentController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post("/", protect, addAgent);

router.get("/", protect, getAgents);

router.put(
  "/:id",
  protect,
  updateAgent
);

router.delete(
  "/:id",
  protect,
  deleteAgent
);

module.exports = router;