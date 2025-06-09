const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Create PDF route
app.post("/api/generate-pdf", async (req, res) => {
  const { text } = req.body;
  try {
    const uuid = crypto.randomUUID();
    const filePath = path.join(__dirname, 'pdfs', `${uuid}.pdf`);
    const writeStream = fs.createWriteStream(filePath);

    const doc = new PDFDocument();
    doc.pipe(writeStream);
    doc.text(text);
    doc.end();

    writeStream.on("close", async () => {
      try {
        const fileContent = await fs.promises.readFile(filePath);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${uuid}.pdf`);
        res.send(fileContent);
      } catch (err) {
        console.error("Error reading PDF file:", err);
        res.status(500).send("Error generating PDF");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
});

// Route to list all PDFs
app.get('/', (req, res) => {
  fs.readdir(path.join(__dirname, 'pdfs'), (err, files) => {
    if (err) {
      console.error('Error reading PDF directory:', err);
      return res.status(500).send('Error reading PDF directory');
    }
    res.render('allpdfs', { files });
  });
});

// Route to view individual PDFs
app.get('/pdfs/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'pdfs', filename);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      console.error('Error accessing PDF file:', err);
      return res.status(404).send('PDF not found');
    }
    res.sendFile(filePath);
  });
});

// Start the server after routes
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
