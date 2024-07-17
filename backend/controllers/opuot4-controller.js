const { SerialPort, ReadlineParser } = require('serialport');
//const { SerialPortMock } = require('@serialport/binding-mock');
// const config = require('../config/config');
const configService = require('../config/config-service');
const config = configService.getConfig();
const protocols = require('../config/enumerates/protocols');

let serialport;
const startSymbols = 'w';
const endSymbols = 'g';//g97

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

// const handleWriteResponse = (err) => {
//     if (err) {
//         console.log('Error-Write: ', err.message)
//     } else {
//         if (config.logConsole) {
//             console.log('Written');
//         }
//     }
// }

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getWeightFromScale = async () => {
    if (config.logConsole) {
        console.log({ params, protocol: config.protocol });
    }
    let strData = '';
    if (!serialport) {
        serialport = new SerialPort(params);
        serialport.on('data', (data) => {
            if (config.logConsole) {
                // console.log('receivedBuffer', data);
                console.log('receivedString', data.toString());
            }
            strData += data.toString();
            strData = strData.toLowerCase();
            if (strData.search(endSymbols) > -1) {
                if (config.logConsole) {
                    console.log('receivedStringfull->strData', strData);
                }
                currentWeight = Number(strData.substring(strData.indexOf(startSymbols) + 1, strData.indexOf(endSymbols)).trim());
                strData = '';
                weightData.result = currentWeight;
                if (config.logConsole) {
                    console.log('receivedStringfull->currentWeight', currentWeight);
                }
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
                console.log('weightData', weightData);
            }
            //throw new Error(error.message);
        });
    }
    //console.log('writing', bufCheckRequest);
    //serialport.write(bufCheckRequest, handleWriteResponse);
};

if (config.protocol === protocols.OPout4.name) {
    setInterval(async () => {
        try {
            await getWeightFromScale();
        } catch (error) {
            weightData.is_error = true;
            weightData.error = error.message;
            weightData.result = 0;
        }

    }, 600);
}

exports.getWeightFromScale = getWeightFromScale;
exports.getWeight = getWeight;