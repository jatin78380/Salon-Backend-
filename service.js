const { Router } = require("express");
const router = Router();

const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer();

// upload field name should be 'file'
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // convert the buffer to b64 string for uploading
  const base64String = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;

  new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(file.buffer);
  })
    .then((uploadResult) => {
      console.log(uploadResult);
      return res.status(200).json({
        message: "Image upload Successfull",
        imageUrl: uploadResult.secure_url,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).json({ message: "Upload Error" });
    });
});

module.exports = router;
