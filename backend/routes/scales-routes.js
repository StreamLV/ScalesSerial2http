const express = require('express');
const config = require('../config/config');
const protocols = require('../config/enumerates/protocols');
const moduleController = require(getModuleControllerPath());
const router = express.Router();

//api/scales
function getModuleControllerPath() {
    let mControllerPath = '../controllers/';
    switch (config.protocol) {
        case protocols.Demo.name:
            mControllerPath += protocols.Demo.module;
            break;
        case protocols.CasDefault.name:
            mControllerPath += protocols.CasDefault.module;
            break;
        case protocols.OPout4.name:
            mControllerPath += protocols.OPout4.module;
            break;
        case protocols.SASI.name:
                mControllerPath += protocols.SASI.module;
                break;
        default:
            mControllerPath += protocols.CasDefault.module;
    }
    return mControllerPath;
}

if (moduleController) {
    router.get('/', moduleController.getWeight);
}

module.exports = router;