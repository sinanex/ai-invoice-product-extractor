const express = require('express');
const multer = require('multer');
const fs = require('fs');

const {DocumentProcessorServiceClient} =
require('@google-cloud/documentai').v1;

const app = express();
const upload = multer({dest:'uploads/'});

const client = new DocumentProcessorServiceClient({
  keyFilename: 'flutter-billing-487409-2443188f75d8.json'
});

const PROJECT_ID = '525258507832';
const LOCATION = 'us';
const PROCESSOR_ID = '33f8108a17f1c2c7';

app.post('/scan', upload.single('bill'), async (req,res)=>{

  const file = fs.readFileSync(req.file.path);

  const name =
  `projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}`;

  const request = {
    name: name,
    rawDocument:{
      content: file,
      mimeType:'image/jpeg'
    }
  };

  const [result] = await client.processDocument(request);

  const entities = result.document.entities;

  let items = [];

//   entities.forEach(entity=>{

//     if(entity.type==="line_item"){

//       let item = {
//         name:"",
//         qty:"",
//         price:"",
//         total:""
//       };

//       entity.properties.forEach(p=>{

//         if(p.type==="description")
//           item.name=p.mentionText;

//         if(p.type==="quantity")
//           item.qty=p.mentionText;

//         if(p.type==="unit_price")
//           item.price=p.mentionText;

//         if(p.type==="amount")
//           item.total=p.mentionText;

//       });

//       items.push(item);
//     }
//   });

  
  res.json(entities);

});

app.listen(3000,()=>{
console.log("Server running at 3000");
});
