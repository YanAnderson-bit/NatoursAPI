export default {
  top5CheapTours: (req, res, next) => {
    req.query = {
      limit: '5',
      sort: '-ratingsAverage,-price',
    };
    next();
  },
};
