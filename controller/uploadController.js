const AWS = require("aws-sdk");
const Job = require("../models/Job");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

exports.getPresignedUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60, // 1 minute expiry
      ContentType: fileType,
      ACL: "private",
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

    // Save job in MongoDB
    const job = await Job.create({ fileName, s3Key: fileName });
    res.json({ uploadURL, jobId: job._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
