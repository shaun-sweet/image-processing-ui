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
    pythonPath: '/usr/bin/python3',
    scriptPath: process.cwd() + "/api",
    args: JSON.stringify(args)
  }
}
app.use(express.static(path.join(__dirname, 'api', 'output')));
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
  res.send("hello")
})

var processImage = function () {
  PythonShell.run('/cspaceIO.py', passAsArgs(test), function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);

    console.log(test.name);
  });
};

var dstFilePath = function (name) {
  return filePath()+'output/' + name;
}

var srcFilePath = function (name) {
  return filePath()+'input/' + name;
}

var fileNameGenerator = function () {
  return uuidV1()+".jpg";
}

var filePath = function () {
  return process.cwd()+'/api/';
}

app.post('/upload', function (req, res) {
  var params = req.body;
  console.log('params: ', params);
  if (req.files.sampleFile) {
    let sampleFile = req.files.sampleFile;
    let srcFileName = fileNameGenerator();
    let dstFileName = fileNameGenerator();
    console.log(srcFileName);
    let processingInput = {
      cspaceLabel: params.colorSpaceLabel,
      paths: {
        srcPath: srcFilePath(srcFileName),
        dstPath: dstFilePath(dstFileName)
      },
      sliderPos: [
        parseInt(params.c1min),
        parseInt(params.c1max),
        parseInt(params.c2min),
        parseInt(params.c2max),
        parseInt(params.c3min),
        parseInt(params.c3max)
      ]
    };
    processingInput.cspaceLabel = processingInput.cspaceLabel || "BGR";
    sampleFile.mv(srcFilePath(srcFileName), function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(passAsArgs(processingInput));
      PythonShell.run('/cspaceIO.py', passAsArgs(processingInput), function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        fs.unlinkSync(processingInput.paths.srcPath);
        res.send(dstFileName);
      });
    });

  }
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
