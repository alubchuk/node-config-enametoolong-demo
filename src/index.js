const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawnSync;

try {
  const pathMaxProcess = spawn('python',[__dirname + "/scripts/getMaxPathVars.py"]);
  const [MAX_PATH, MAX_FILENAME] = pathMaxProcess.stdout.toString("utf-8").split(":").map(v => parseInt(v.trim()))
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
