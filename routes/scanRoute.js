const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { DocumentProcessorServiceClient } =
require('@google-cloud/documentai').v1;

const router = express.Router();
const upload = multer({ dest: '/tmp' });


const client = new DocumentProcessorServiceClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDS)
});

// const client = new DocumentProcessorServiceClient();

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION;
const PROCESSOR_ID = process.env.PROCESSOR_ID;

router.post('/scan', upload.single('bill'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded"
      });
    }

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

    return res.status(200).json({
      status: "success",
      data: entities
    });

  } catch (error) {

    console.error("Google Document AI Error:", error);

    return res.status(error.code || 500).json({
      status: "error",
      message: error.message,
      details: error.details || "Unknown error from Google",
      code: error.code || 500
    });

  }
});


module.exports = router;
