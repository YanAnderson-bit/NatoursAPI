export default {
  undefined: (req, res) => {
    res
      .status(400)
      .send(
        `<html><body><h1>The route ${req.originalUrl} is undefined</h1></body></html>`
      );
  },
};
