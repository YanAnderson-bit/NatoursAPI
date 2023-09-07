import AppError from '../modules/AppError';

export default {
  undefinedRoute: (req, res) => {
    const route = req.originalUrl;
    const errorMessage = `The route ${route} is undefined`;
    const errorStatusCode = 400;

    const appError = new AppError(errorMessage, errorStatusCode);

    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
    });
  },
};
