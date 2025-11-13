const express = require('express');
const router = express.Router();
const PadController = require('../controllers/padController');
const padController = new PadController();

// Hello endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'hello' });
});

// API Routes for AJAX requests
router.post('/pads', padController.createPad.bind(padController));
router.get('/pads/:id', padController.getPad.bind(padController));
router.put('/pads/:id', padController.updatePad.bind(padController));
router.delete('/pads/:id', async (req, res) => {
  try {
    const Pad = require('../models/Pad');
    const { id } = req.params;

    // Find and delete pad by slug or title
    const result = await Pad.findOneAndDelete({
      $or: [
        { slug: id.toLowerCase() },
        { title: { $regex: new RegExp(`^${id}$`, 'i') } }
      ]
    });

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Pad not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pad', error: error.message });
  }
});
router.get('/pads', padController.listPads.bind(padController));

module.exports = router;