const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_NUMBER_OF_ITEMS_PER_PAGE = 100;

class Query {
  constructor(model, queryString) {
    this.model = model;
    this.query = null;
    this.queryString = queryString;
  }

  find() {
    const hasFilters = Object.keys(this.queryString).length;

    if (hasFilters) {
      this.findByFilters();
      return this;
    }
    this.query = this.model.find();
    return this;
  }

  findByFilters() {
    let queryFilters = { ...this.queryString };
    ['page', 'limit', 'sort', 'fields'].forEach(
      (el) => delete queryFilters[el]
    );
    queryFilters = JSON.stringify(queryFilters).replace(
      /\b(lt|gt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    queryFilters = JSON.parse(queryFilters);
    this.query = this.model.find(queryFilters);
  }

  sort() {
    const sortBy = this.queryString.sort
      ? this.queryString.sort.split(',').join(' ')
      : 'ratingsAverage';

    this.query = this.query.sort(sortBy);
    return this;
  }

  select() {
    const fields = this.queryString.fields
      ? this.queryString.fields.split(',').join(' ')
      : null;
    this.query = this.query.select(fields);
    return this;
  }

  paginate() {
    const page = this.queryString.page || DEFAULT_PAGE_NUMBER;
    const numberOfItemsPerPage =
      this.queryString.limit || DEFAULT_NUMBER_OF_ITEMS_PER_PAGE;
    const numberOfItemsToSkip = (page - 1) * numberOfItemsPerPage;
    this.query = this.query
      .skip(numberOfItemsToSkip)
      .limit(numberOfItemsPerPage);

    return this;
  }
}

export default Query;
