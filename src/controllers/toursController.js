const { readFileSync } = require('fs');

const tours = JSON.parse(
  readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

module.exports = {
  checkBody: (req, res, next) => {
    if (!req.body.name || !req.body.price)
      return res.status(404).json({ status: 'fail' });
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
  createTour: (req, res) =>
    res.status(200).json({ status: 'sucess', tour: req.body }),
  deleteTour: (req, res) => {},
};
