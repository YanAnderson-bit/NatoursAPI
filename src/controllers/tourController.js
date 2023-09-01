import Query from '../modules/QueryModule';
import TourModel from '../models/TourModel';

export default {
  getTours: async (req, res) => {
    try {
      const query = new Query(TourModel, req.query);

      query.find().sort().select().paginate();
      const tours = await query.query;
      res.status(200).json({ results: tours.length, tours });
    } catch (error) {
      res.status(404).json({ status: 'fail', error });
    }
  },

  getTour: (req, res) => {
    TourModel.findById(req.params.id)
      .then((tour) => res.status(200).json({ tour }))
      .catch((error) => res.status(404).json({ status: 'fail', error }));
  },

  updateTour: (req, res) => {
    TourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((tour) => res.status(200).json({ tour }))
      .catch((error) => res.status(404).json({ status: 'fail', error }));
  },

  createTour: (req, res) => {
    TourModel.create(req.body)
      .then((tour) => res.status(200).json({ status: 'sucess', tour }))
      .catch((error) => res.status(400).json({ status: 'fail', error }));
  },

  deleteTour: (req, res) => {
    TourModel.findByIdAndDelete(req.params.id)
      .then((tour) => res.status(200).json({ status: 'sucess', tour }))
      .catch((error) => res.status(400).json({ status: 'fail', error }));
  },

  getTourStats: async (req, res) => {
    try {
      const tours = await TourModel.aggregate([
        { $match: { ratingsAverage: { $gte: 4.5 } } },
        {
          $group: {
            _id: '$name',
            toursQuantity: { $sum: 1 },
            averageRating: { $avg: '$ratingsAverage' },
            averagePrice: { $avg: '$price' },
            minimunPrice: { $min: '$price' },
            maximumPrice: { $max: '$price' },
          },
        },
        {
          $addFields: {
            name: '$_id',
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
      res.status(200).json(tours);
    } catch (error) {
      res.status(400).json({ status: 'fail', error });
    }
  },

  getMonthlyPlan: async (req, res) => {
    try {
      const date = new Date();
      const year = req.params.year || date.getFullYear();

      const tours = await TourModel.aggregate([
        {
          $unwind: '$startDates',
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            toursQuantity: { $sum: 1 },
            tours: { $push: '$name' },
          },
        },
        {
          $addFields: {
            month: '$_id',
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
      res.status(200).json(tours);
    } catch (error) {
      res.status(400).json({ status: 'fail', error });
    }
  },
};
