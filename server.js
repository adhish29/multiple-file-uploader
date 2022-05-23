const express = require("express");
const multer = require("multer");

const app = express();

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "pdf" ||
    file.mimetype.split("/")[1] ===
      "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype.split("/")[1] === "msword"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF or Doc or Docx File!!"), false);
  }
};

// const upload = multer({ dest: "./uploads" });
const upload = multer({ storage: storage, fileFilter: multerFilter });

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  req.files.map((file) => console.log(file.originalname));
  res.send("uploading successful!!!");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
