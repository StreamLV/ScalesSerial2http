const fs = require('fs');
const path = require('path');
const pathConfig = path.join(process.cwd(), 'config.json');
const configExist = fs.existsSync(pathConfig);
const config = require('./config');
let configDataJson;
if (configExist) {
  const dataConfigFile = fs.readFileSync(pathConfig, { encoding: 'utf8', flag: 'r' });
  configDataJson = JSON.parse(dataConfigFile);
}
//
const pathConfigApp = path.join(process.cwd(), 'configApp.json');
const configAppExist = fs.existsSync(pathConfigApp);
const configApp = require('./configApp');
let configAppDataJson;
if (configAppExist) {
  const dataConfigAppFile = fs.readFileSync(pathConfig, { encoding: 'utf8', flag: 'r' });
  configAppDataJson = JSON.parse(dataConfigAppFile);
}

const getConfig = () => {
  if (configExist) {
    return configDataJson;
  } else {
    return config;
  }
};

const getConfigApp = () => {
    if (configExist) {
      return configAppDataJson;
    } else {
      return configApp;
    }
  };

exports.getConfig = getConfig;
exports.getConfigApp = getConfigApp;