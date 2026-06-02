const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

// Add Agent
const addAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingAgent =
      await Agent.findOne({ email });

    if (existingAgent) {
      return res.status(400).json({
        message: "Agent already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      agent
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Agents
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(agents);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Agent
const updateAgent = async (
  req,
  res
) => {
  try {
    const agent =
      await Agent.findById(
        req.params.id
      );

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    const {
      name,
      email,
      mobile
    } = req.body;

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile =
      mobile || agent.mobile;

    await agent.save();

    res.status(200).json({
      success: true,
      agent
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Agent
const deleteAgent = async (
  req,
  res
) => {
  try {
    const agent =
      await Agent.findById(
        req.params.id
      );

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found"
      });
    }

    await Agent.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Agent deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addAgent,
  getAgents,
  updateAgent,
  deleteAgent
};