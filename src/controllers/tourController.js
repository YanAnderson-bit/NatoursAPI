import { readFileSync } from 'fs';

import TourModel from '../models/TourModel';

const tours = JSON.parse(
  readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

export default {
  getTours: (req, res) =>
    res.status(200).json({ results: tours.length, tours }),

  getTour: (req, res) => {
    const tourId = Number(req.params.id);
    const tour = tours.find((item) => item.id === tourId);
    if (!tour) return res.status(404).json({ status: 'fail' });
    return res.status(200).json({ status: 'success', tour });
  },
  updateTour: (req, res) => {},
  createTour: (req, res) => {
    TourModel.create(req.body)
      .then((document) =>
        res.status(200).json({ status: 'sucess', tour: document })
      )
      .catch((error) => res.status(400).json({ status: 'fail', error }));
  },
  deleteTour: (req, res) => {},
};
