const express = require('express');
const Ctrl = require('./Ctrl');

const router = express.Router();

router.get('/', Ctrl.helloWorld);
router.get('/status', Ctrl.status);

/* 
/deal/game/:id/
*/

module.exports = router;
