import { readFileSync } from 'fs';

import TourModel from '../models/TourModel';

const tours = JSON.parse(
  readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

export default {
  checkBody: (req, res, next) => {
    if (!req.body.name || !req.body.price)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Missing tour name or price' });
    next();
  },

  getTours: (req, res) =>
    res.status(200).json({ results: tours.length, tours }),

  getTour: (req, res) => {
    const tourId = Number(req.params.id);
    const tour = tours.find((item) => item.id === tourId);
    if (!tour) return res.status(404).json({ status: 'fail' });
    return res.status(200).json({ status: 'success', tour });
  },
  updateTour: (req, res) => {},
  createTour: async (req, res) => {
    const tour = await TourModel.create(req.body);
    res.status(200).json({ status: 'sucess', tour });
  },
  deleteTour: (req, res) => {},
};
