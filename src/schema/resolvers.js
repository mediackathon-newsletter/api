const Category = require('../db/models/category');

module.exports = {
  Query: {
    articles: () => [],
    article: () => {},
    categories: () => Category.find(),
    category: (obj, { id }) => Category.findOne({ _id: id }),
    cities: () => [],
    city: () => {},
    events: () => [],
    event: () => {},
    newsletters: () => [],
    newsletter: () => {},
    users: () => [],
    user: () => {}
  },
  Mutation: {
    createCategory: (obj, { name }) => Category.create({ name })
  }
};
