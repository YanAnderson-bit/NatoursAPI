import express from 'express';

import tourController from '../controllers/tourController';
import tourMiddlewares from '../middlewares/tourMiddlewares';

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourMiddlewares.top5CheapTours, tourController.getTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year?').get(tourController.getMonthlyPlan);

router.route('/').get(tourController.getTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
