module.exports = `

  scalar DateTime

  enum NewsletterType {
    EVENTS
    ARTICLES
  }

  input ArticleInput {

    newsletter: ID!
    category: ID!
    title: String!
    subtitle: String
    text: String!
  }

  input CityInput {
    id: ID
    name: String!
  }

  input DistrictInput {
    id: ID
    name: String!
    city: ID!
  }

  input UserInput {
    firstname: String
    lastname: String
    email: String
    journalist: Boolean
    biography: String
    linkedin: String
    twitter: String
    facebook: String
    street: String
    city: String
    postalCode: String
    birthday: DateTime
  }

  input NewsletterInput {
    id: ID
    city: ID!
    date: DateTime!
    type: NewsletterType!
  }



  type Newsletter {
    id: ID
    articles: [Article]
    city: City
    events: [Event]
    date: DateTime
    type: NewsletterType
    journalist: User
  }

  type Article {
    id: ID
    newsletter: Newsletter
    title: String
    subtitle: String
    text: String
    category: Category
    district: District
  }

  type Category {
    id: ID
    name: String
  }

  type City {
    id: ID
    name: String
    districts: [District]
  }

  type District {
    id: ID
    city: City
    name: String
  }

  type Event {
    id: ID
    category: ID
    newsletter: Newsletter
  }

  type Subscription {
    id: ID
    city: City
  }


  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    journalist: Boolean
    biography: String
    linkedin: String
    twitter: String
    facebook: String
    street: String
    city: String
    postalCode: String
    birthday: DateTime
  }

  type Query {
    articles(newsletter: ID!): [Article]
    article(id: ID!): Article
    categories: [Category]
    category(id: ID!): Category
    cities: [City]
    city(id: ID!): City
    districts(city: ID!): [District]
    district(id: ID!): District
    events(newsletter: ID!): [Event]
    event(id : ID!): Event
    newsletters(city: ID!):  [Newsletter]
    newsletter(id: ID!): Newsletter
    subscriptions : [Subscription]
    profile: User
    users: [User]
    user: User
  }

  type Mutation {

    signup(firstname: String!, lastname: String!, email: String!, password: String!): User
    login(email: String!, password: String!) : User
    logout : User

    createArticle(article: ArticleInput!): Article
    createCategory(name: String!) : Category
    createCity(city: CityInput!) : City
    createDistrict(district: DistrictInput!) : District
    createEvent(newsletter: ID!, category: ID!): Event
    createNewsletter(newsletter: NewsletterInput!, journalist: ID!): Newsletter
    createSubscription(city: ID!): Subscription

    updateArticle(article: ArticleInput!): Article
    updateCity(city: CityInput!) : City
    updateDistrict(district: DistrictInput!): District
    updateNewsletter(newsletter: NewsletterInput!): Newsletter
    updateProfile(user: UserInput!): User

    deleteArticle(id: ID!): Article
    deleteCategory(id: ID!): Category
    deleteCity(id: ID!): City
    deleteDistrict(id: ID!): District
    deleteNewsletter(id: ID!): Newsletter
    deleteSubscription(id: ID!): Subscription

  }
`;
