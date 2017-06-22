"use strict";
require('dotenv').config();
const express = require('express');
const uuidV1 = require('uuid/v1');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const PythonShell = require('python-shell');
const fileUpload = require('express-fileupload');
const PORT = process.env.APP_ENV === "prod" ? 80 : 3001;
console.log(process.env.APP_ENV);

var passAsArgs = function (args) {
  return {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    scriptPath: process.cwd() + "/api",
    args: JSON.stringify(args)
  }
}

app.use(express.static(path.join(__dirname, 'build')));
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
  console.log('connection handled!');
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

const prepareArgs = (req, srcFileName, dstFileName) => {
  let params = req.body;
  console.log(srcFilePath(srcFileName),dstFilePath(dstFileName));
  return {
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
  }
}


app.post('/upload', function (req, res) {
  console.log('params: ', req.body);
  if (req.files.uploadedImage) {
    let srcFileName = fileNameGenerator();
    let dstFileName = fileNameGenerator();
    let apiArgs = prepareArgs(req, srcFileName, dstFileName)
    let uploadedImage = req.files.uploadedImage;
    apiArgs.cspaceLabel = apiArgs.cspaceLabel || "BGR";
    uploadedImage.mv(apiArgs.paths.srcPath, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      PythonShell.run('/cspaceIO.py', passAsArgs(apiArgs), function (err, results) {
          console.log(err);
        if (err) throw err;

        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        // fs.unlinkSync(apiArgs.paths.srcPath);
        res.send(dstFileName);
      });
    });

  }
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
});