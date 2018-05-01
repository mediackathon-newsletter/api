const models = require('../db/models');

module.exports = {
  Query: {
    articles: () => [],
    article: () => {},
    categories: () => models.Category.find(),
    category: (root, { id }) => models.Category.findOne({ _id: id }),
    cities: () => models.City.find(),
    city: (root, { id }) =>
      models.City.findOne({ _id: id }).populate('districts'),
    districts: (root, { city }) => models.District.find({ city }),
    district: (root, { id }) =>
      models.District.findOne({ _id: id }).populate('city'),
    events: () => [],
    event: () => {},
    newsletters: () => [],
    newsletter: () => {},
    users: () => [],
    user: () => {}
  },
  Mutation: {
    createArticle: (root, { newsletter, category, title, subtitle, text }) =>
      models.Article.create({ newsletter, category, title, subtitle, text }),
    createCategory: (root, { name }) => models.Category.create({ name }),
    createCity: (root, { name }) => models.City.create({ name }),
    createDistrict: (root, { name, city }) =>
      models.District.create({ name, city }),
    createEvent: (root, { newsletter, category }) =>
      models.Event.create({ newsletter, category }),
    createNewsletter: (root, { city, date, type, author }) =>
      models.Newsletter.create({ city, date, type, author }),
    createUser: (root, { firstname, lastname, email, password }) =>
      models.User.create({ firstname, lastname, email, password })
  }
};
