import express from 'express';

import tourController from '../controllers/tourController';

const router = express.Router();
router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
