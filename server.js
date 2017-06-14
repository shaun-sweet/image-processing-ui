const express = require('express')
const uuidV1 = require('uuid/v1');
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs');
const PythonShell = require('python-shell');
const fileUpload = require('express-fileupload');

var passAsArgs = function (args) {
  return {
    mode: 'text',
    scriptPath: '/home/sweet/projects/image-processing-ui/api',
    args: [JSON.stringify(args)]
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(fileUpload());


app.get('/', function (req, res) {
  let response = "filename: "+ uuidV1();
  // PythonShell.run('testIO.py', options, function (err, results) {
  //   if (err) throw err;
  //   // results is an array consisting of messages collected during execution
  //   console.log('results: %j', JSON.parse(results[0]));
  // });

  res.json({test: response, alex: "cool", travis: "very gay... very very gay.  sad really"});
})

var processImage = function () {

};

var dstFilePath = function (name) {
  return filePath()+'output/' + name;
}

var srcFilePath = function (name) {
  return filePath()+'input/' + name;
}

var filePath = function () {
  return process.cwd()+'/api/';
}

app.post('/upload', function (req, res) {
  console.log(req.body);
  if (req.files.sampleFile) {
    let sampleFile = req.files.sampleFile;
    let srcFileName = uuidV1();
    let dstFileName = uuidV1();
    sampleFile.mv(srcFilePath(srcFileName), function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(dstFilePath(dstFileName));
    });

  }
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
