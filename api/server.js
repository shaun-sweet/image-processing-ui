const express = require('express')
const uuidV1 = require('uuid/v1');
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs');
const PythonShell = require('python-shell');
const fileUpload = require('express-fileupload');


var options = {
  mode: 'text',
  scriptPath: '/home/sweet/projects/image-processing-ui/api',
  args: [JSON.stringify({name:'groot',occuptation:'tree'})]
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(fileUpload());


app.get('/', function (req, res) {
  let response = "filename: "+ uuidV1();
  PythonShell.run('testIO.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', JSON.parse(results[0]));
  });

  res.json({test: response});
})

app.post('/upload', function (req, res) {
  let sampleFile = req.files.sampleFile;
  console.log(sampleFile);

  sampleFile.mv('/home/sweet/projects/image-processing-ui/api/images/'+ uuidV1() +'.desktop', function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
