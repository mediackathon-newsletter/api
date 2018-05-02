const models = require('../db/models');
const AuthService = require('../services/auth');

module.exports = {
  Query: {
    articles: (rootValue, { newsletter }) =>
      models.Articles.find({ newsletter }),
    article: (rootValue, { id }) => models.Article.findOne({ _id: id }),
    categories: () => models.Category.find(),
    category: (rootValue, { id }) => models.Category.findOne({ _id: id }),
    cities: () => models.City.find(),
    city: (rootValue, { id }) =>
      models.City.findOne({ _id: id }).populate('districts'),
    districts: (rootValue, { city }) => models.District.find({ city }),
    district: (rootValue, { id }) =>
      models.District.findOne({ _id: id }).populate('city'),
    events: (rootValue, { newsletter }) => models.Event.find({ newsletter }),
    event: (rootValue, { id }) => models.Event.findOne({ _id: id }),
    newsletters: (rootValue, { city }) => models.Newsletter.find({ city }),
    newsletter: (rootValue, { id }) => models.Newsletter.findOne({ _id: id }),
    users: () => models.User.find(),
    user: (rootValue, _, { req }) => {
      return req.user;
    }
  },
  Mutation: {
    // Authentication
    signup: (rootValue, { email, password, firstname, lastname }, { req }) =>
      AuthService.signup({ email, password, firstname, lastname, req }),
    login: (rootValue, { email, password }, { req }) =>
      AuthService.login({ email, password, req }),
    logout: (rootValue, _, { req }) => {
      const { user } = req;
      req.logout();
      return user;
    },
    // Others
    createArticle: (
      rootValue,
      { newsletter, category, title, subtitle, text }
    ) => models.Article.create({ newsletter, category, title, subtitle, text }),
    createCategory: (rootValue, { name }) => models.Category.create({ name }),
    createCity: (rootValue, { name }) => models.City.create({ name }),
    createDistrict: (rootValue, { name, city }) =>
      models.District.create({ name, city }),
    createEvent: (rootValue, { newsletter, category }) =>
      models.Event.create({ newsletter, category }),
    createNewsletter: (rootValue, { city, date, type, author }) =>
      models.Newsletter.create({ city, date, type, author })
  }
};
