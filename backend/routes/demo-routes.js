const express = require('express');
const demoController = require(`../backend/controllers/demo-controller`);
const router = express.Router();

//demo
router.get('/:weight', demoController.setWeight);

module.exports = router;