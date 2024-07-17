//for-win-service
const casController = require('../controllers/cas2-controller');
const opuot4Controller = require('../controllers/opuot4-controller');
const sasiController = require('../controllers/sasi-controller');
const demoController = require('../controllers/demo-controller');
//for-win-service
//
const express = require('express');
const config = require('../config/config');
const protocols = require('../config/enumerates/protocols');
const moduleController = getModuleController(); 
const router = express.Router();

//api/scales
function getModuleController() {
    let mController;
    switch (config.protocol) {
        case protocols.Demo.name:
            mController = demoController;
            break;
        case protocols.CasDefault.name:
            mController = casController;
            break;
        case protocols.OPout4.name:
            mController = opuot4Controller;
            break;
        case protocols.SASI.name:
            mController = sasiController;
                break;
        default:
            mController = demoController;
    }
    return mController;
}

if (moduleController) {
    router.get('/', moduleController.getWeight);
}

module.exports = router;