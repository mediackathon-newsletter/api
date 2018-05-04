const models = require('../db/models');
const AuthService = require('../services/auth');
const GraphQLIsoDate = require('graphql-iso-date');

module.exports = {
  DateTime: GraphQLIsoDate,

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
    newsletter: (rootValue, { id }) =>
      models.Newsletter.findOne({ _id: id })
        .populate('articles')
        .populate('journalist'),
    subscriptions: (rootValue, _, { req }) =>
      models.Subscription.find({ user: req.user.id }).populate('city'),
    users: () => models.User.find(),
    profile: (rootValue, _, { req }) =>
      models.User.findOne({ _id: req.user.id }),
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
    // Create
    createArticle: (rootValue, { article }) => models.Article.create(article),
    createCategory: (rootValue, { category }) =>
      models.Category.create(category),
    createCity: (rootValue, { city }) => models.City.create(city),
    createDistrict: (rootValue, { district }) =>
      models.District.create(district),
    createEvent: (rootValue, { newsletter, category }) =>
      models.Event.create({ newsletter, category }),
    createNewsletter: (rootValue, { newsletter }, { req }) =>
      models.Newsletter.create({ newsletter, journalist: req.user._id }),
    createSubscription: (rootValue, { city }, { req }) =>
      models.Subscription.create({ user: req.user.id, city }),
    // Update
    updateArticle: (rootValue, { article }) =>
      models.Article.findOneAndUpdate({ _id: article.id }, article, {
        new: true
      }),
    updateCity: (rootValue, { city }) =>
      models.City.findOneAndUpdate({ _id: city.id }, city, {
        new: true
      }),
    updateDistrict: (rootValue, { district }) =>
      models.District.findOneAndUpdate({ _id: district.id }, district, {
        new: true
      }),
    updateNewsletter: (rootValue, { newsletter }) =>
      models.Newsletter.findOneAndUpdate({ _id: newsletter.id }, newsletter, {
        new: true
      }),
    updateProfile: (rootValue, { user }, { req }) => {
      return models.User.findOneAndUpdate({ _id: req.user._id }, user, {
        new: true
      });
    },
    // Delete
    deleteArticle: (rootValue, { id }) => models.Article.remove({ _id: id }),
    deleteCategory: (rootValue, { id }) => models.Category.remove({ _id: id }),
    deleteCity: (rootValue, { id }) =>
      models.City.remove({
        _id: id
      }),
    deleteDistrict: (rootValue, { id }) => models.District.remove({ _id: id }),
    deleteNewsletter: (rootValue, { id }) =>
      models.Newsletter.remove({ _id: id }),
    deleteSubscription: (rootValue, { id }, { req }) =>
      models.Subscription.remove({
        user: req.user._id,
        _id: id
      })
  }
};
