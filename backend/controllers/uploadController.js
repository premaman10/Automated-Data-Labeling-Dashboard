const fs = require("fs");
const csv = require("csv-parser");
const DataItem = require("../models/DataItem");

exports.uploadFile = async (req, res) => {
  try {
    const results = [];
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (file.mimetype === "application/json") {
      // Handle JSON file
      const jsonData = JSON.parse(fs.readFileSync(file.path, "utf8"));
      const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
      
      dataArray.forEach(item => {
        results.push({ rawData: item });
      });
      
      await DataItem.insertMany(results);
      fs.unlinkSync(file.path); // Clean up uploaded file
      res.json({ message: "JSON uploaded and saved", count: results.length });
    } else if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      // Handle CSV file
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => results.push({ rawData: data }))
        .on("end", async () => {
          await DataItem.insertMany(results);
          fs.unlinkSync(file.path); // Clean up uploaded file
          res.json({ message: "CSV uploaded and saved", count: results.length });
        });
    } else {
      fs.unlinkSync(file.path); // Clean up uploaded file
      res.status(400).json({ error: "Unsupported file type. Please upload CSV or JSON." });
    }
  } catch (error) {
    console.error(error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up uploaded file on error
    }
    res.status(500).json({ error: "Upload failed" });
  }
};
