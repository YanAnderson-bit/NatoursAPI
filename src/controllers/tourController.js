import TourModel from '../models/TourModel';

export default {
  getTours: (req, res) => {
    //FILTERING FIRST
    let filters = { ...req.query };
    ['page', 'limit', 'sort', 'fields'].forEach((el) => delete filters[el]);
    filters = JSON.stringify(filters).replace(
      /\b(lt|gt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    //SORTING SECOND

    //PAGINATION/LIMIT THIRD

    const query = TourModel.find(JSON.parse(filters));
    query
      .then((tours) => res.status(200).json({ results: tours.length, tours }))
      .catch((error) => res.status(400).json({ status: 'fail', error }));
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
};
