const { SerialPort, ReadlineParser } = require('serialport');
const config = require('../config/config');
let serialport;
// const bufWeightCheckRequest = Buffer.from('W', 'utf-8');
const bufWeightCheckRequest = Buffer.from('?W\r\n', 'utf-8');

const parseDevPath = (devPath) => {
    if (devPath.toLowerCase().includes('com')) {
        return devPath.replace('/dev/', '').toUpperCase();
    }
    return devPath;
}
const params = { path: parseDevPath(`/dev/${config.devpath}`), baudRate: Number(config.rate), autoOpen: true };
let currentWeight = 0;
let weightData = {
    is_error: false,
    error: '',
    result: 0,
};

const getWeight = async (req, res, next) => {
    res.json(weightData);
}

const handleWriteResponse = (err) => {
    if (err) {
        console.log('Error-Write: ', err.message)
    } else {
        if (config.logConsole) {
            console.log('Written');
        }
    }
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getWeightFromScale = async () => {
    if (config.logConsole) {
        console.log({ params });
    }
    let strData = '';
    if (!serialport) {
        serialport = new SerialPort(params);
        serialport.on('data', (data) => {
            if (config.logConsole) {
                console.log('received', data);
                console.log('receivedString', data.toString());
            }
            strData += data.toString();
            strData = strData.toLowerCase();
            if (config.logConsole) {
                console.log('receivedStringfull->strData', strData);
            }
            if (strData.search('kg') > -1) {
                currentWeight = Number(strData.substring(strData.indexOf('s') + 1, strData.indexOf('kg')).trim());
                strData = '';
                weightData.result = currentWeight;
            }

            weightData.is_error = false;
            weightData.error = '';
        });
        serialport.on('error', function (error) {
            currentWeight = 0;
            weightData = {
                is_error: true,
                error: error.message,
                result: 0,
            };
            if (config.logConsole) {
                console.log('serialport_error', error.message);
            }
            //throw new Error(error.message);
        });
    }
    //console.log('writing', bufWeightCheckRequest);
    serialport.write(bufWeightCheckRequest, handleWriteResponse);
};

setInterval(async () => {
    try {
        await getWeightFromScale();
    } catch (error) {
        weightData.is_error = true;
        weightData.error = error.message;
        weightData.result = 0;
    }

}, 600)

exports.getWeightFromScale = getWeightFromScale;
exports.getWeight = getWeight;