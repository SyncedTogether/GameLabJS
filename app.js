const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;

// Configure multer storage to save files using their original names and extensions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Use the configured storage in the multer instance
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  // Send the file's id, text, and path to the client
  res.status(200).json({ id: req.file.filename, text: req.file.originalname, data: { path: req.file.path } });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

process.on("SIGINT", () => {
  console.log("\nCleaning up uploaded files...");
  deleteFolderRecursive(path.join(__dirname, "public", "uploads"));
  console.log("Cleanup complete. Exiting...");
  process.exit();
});
