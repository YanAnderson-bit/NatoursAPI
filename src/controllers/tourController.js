import TourModel from '../models/TourModel';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_NUMBER_OF_ITEMS_PER_PAGE = 100;

export default {
  getTours: async (req, res) => {
    try {
      let filters = { ...req.query };
      ['page', 'limit', 'sort', 'fields'].forEach((el) => delete filters[el]);
      filters = JSON.stringify(filters).replace(
        /\b(lt|gt|gte|lte)\b/g,
        (match) => `$${match}`
      );
      const sortBy = req.query.sort
        ? req.query.sort.split(',').join(' ')
        : 'ratingsAverage';

      const fields = req.query.fields
        ? req.query.fields.split(',').join(' ')
        : null;

      const page = req.query.page || DEFAULT_PAGE_NUMBER;
      const numberOfItemsPerPage =
        req.query.limit || DEFAULT_NUMBER_OF_ITEMS_PER_PAGE;
      const numberOfItemsToSkip = (page - 1) * numberOfItemsPerPage;

      const numberOfItems = await TourModel.countDocuments();

      if (page >= numberOfItems / numberOfItemsToSkip) {
        throw new Error(`Invalid Page Number`);
      }

      let query = null;
      query = TourModel.find(JSON.parse(filters));
      query = query.select(fields);
      query = query.sort(sortBy);
      query = query.skip(numberOfItemsToSkip).limit(numberOfItemsPerPage);
      query.then((tours) =>
        res.status(200).json({ results: tours.length, tours })
      );
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
};
