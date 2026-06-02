const fs = require("fs");
const csv = require("csv-parser");
const XLSX = require("xlsx");

const Agent = require("../models/Agent");
const Task = require("../models/Task");

const distributeTasks = require(
  "../utils/distributeTasks"
);

// Upload File
const uploadFile = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message:
          "Please upload a file"
      });
    }

    const agents =
      await Agent.find();

    if (agents.length < 5) {
      return res.status(400).json({
        message:
          "Minimum 5 agents required"
      });
    }

    const ext =
      req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

    let records = [];

    // CSV
    if (ext === "csv") {
      await new Promise(
        (resolve, reject) => {
          fs.createReadStream(
            req.file.path
          )
            .pipe(csv())
            .on(
              "data",
              (data) =>
                records.push(data)
            )
            .on("end", resolve)
            .on("error", reject);
        }
      );
    }

    // XLS/XLSX
    else {
      const workbook =
        XLSX.readFile(
          req.file.path
        );

      const sheetName =
        workbook.SheetNames[0];

      records =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[
            sheetName
          ]
        );
    }

    if (records.length === 0) {
      return res.status(400).json({
        message:
          "File contains no data"
      });
    }

    // Validation
    const valid =
      records.every(
        (record) =>
          (record.FirstName ||
            record.firstname) &&
          (record.Phone ||
            record.phone)
      );

    if (!valid) {
      return res.status(400).json({
        message:
          "Invalid file format"
      });
    }

    const tasks =
      distributeTasks(
        records,
        agents
      );

    await Task.insertMany(tasks);

    res.status(201).json({
      success: true,
      totalRecords:
        records.length,
      message:
        "Tasks distributed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Distributed Tasks
const getTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await Task.find()
        .populate(
          "agentId",
          "name email"
        )
        .sort({
          createdAt: -1
        });

    res.status(200).json(
      tasks
    );

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  uploadFile,
  getTasks
};