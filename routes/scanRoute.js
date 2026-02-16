const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { DocumentProcessorServiceClient } =
require('@google-cloud/documentai').v1;

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const client = new DocumentProcessorServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
// const client = new DocumentProcessorServiceClient();

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION;
const PROCESSOR_ID = process.env.PROCESSOR_ID;

router.post('/scan', upload.single('bill'), async (req, res) => {

  const file = fs.readFileSync(req.file.path);

  const name =
  `projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}`;

  const request = {
    name: name,
    rawDocument: {
      content: file,
      mimeType: 'image/jpeg'
    }
  };

  const [result] = await client.processDocument(request);

  const entities = result.document.entities;

  res.json(entities);
});

module.exports = router;
