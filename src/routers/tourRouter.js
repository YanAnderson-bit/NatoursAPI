import express from 'express';

import tourController from '../controllers/tourController';
import tourMiddlewares from '../middlewares/tourMiddlewares';

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourMiddlewares.aliasTop5CheapTours, tourController.getTours);

router.route('/').get(tourController.getTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
