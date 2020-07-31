const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawnSync;

try {
  const pathMaxProcess = spawn('python',[__dirname + "/scripts/getPathMax.py"]);
  const fileNameMaxProcess = spawn('python',[__dirname + "/scripts/getFileNameMax.py"]);
  const MAX_PATH = parseInt(pathMaxProcess.stdout.toString("utf-8"));
  const MAX_FILENAME = parseInt(fileNameMaxProcess.stdout.toString("utf-8"));
  console.log({ MAX_PATH, MAX_FILENAME })

  const paths = fs.readdirSync(__dirname + "/config")
  console.log({ paths })
  const longPath = paths.map(p => path.resolve(p)).join(path.delimiter)
  const runtimeJSON = "/runtime.json";
  console.log({ longPath, longPathLength: longPath.length + runtimeJSON.length })

  process.env.NODE_CONFIG_DIR = longPath;
} catch(e) {
  console.log("Error happened: " + e)
}

require('config');
