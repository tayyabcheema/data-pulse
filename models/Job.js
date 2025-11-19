const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: { type: String }, // optional if you have auth
  fileName: { type: String, required: true },
  s3Key: { type: String, required: true },
  status: { type: String, default: "uploaded" }, // uploaded, processing, completed
  resultLocation: { type: String }, // S3/DynamoDB reference
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
