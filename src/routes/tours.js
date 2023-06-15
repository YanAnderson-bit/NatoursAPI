const express = require('express');

const toursController = require('../controllers/toursController');

const router = express.Router();
router
  .route('/')
  .get(toursController.getTours)
  .post(toursController.checkBody, toursController.createTour);
router.route('/:id').get(toursController.getTour);

module.exports = router;
