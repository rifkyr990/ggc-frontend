const express = require('express');
const router = express.Router();
const perumahanController = require('../controllers/perumahanControllers');

router.post('/', perumahanController.createPerumahan);
router.get('/', perumahanController.getAllPerumahan);
router.get('/:id', perumahanController.getPerumahanById);
router.put('/:id', perumahanController.updatePerumahan);
router.delete('/:id', perumahanController.deletePerumahan);

module.exports = router;
