var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const path = require('path');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const upload = multer({ dest: 'Bureau/' });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (req.file) {
     const nameWithExtension = req.file.originalname;
    const extension = path.extname(nameWithExtension);
    const name = path.basename(nameWithExtension, extension);
    res.json({
      name: name,
      type: req.file.mimetype,
      size: req.file.size
    });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
