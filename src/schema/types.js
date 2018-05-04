module.exports = `

  scalar DateTime

  enum NewsletterType {
    EVENTS
    ARTICLES
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

  type Newsletter {
    id: ID
    articles: [Article]
    city: City
    events: [Event]
    date: DateTime
    type: NewsletterType
    author: User
  }

  type Article {
    id: ID
    newsletter: Newsletter
    title: String
    subtitle: String
    text: String
    category: Category
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
    articles(newsletter: ID!): [Article],
    article(id: ID!): Article,
    categories: [Category],
    category(id: ID!): Category,
    cities: [City],
    city(id: ID!): City,
    districts(city: ID!): [District],
    district(id: ID!): District,
    events(newsletter: ID!): [Event],
    event(id : ID!): Event,
    newsletters(city: ID!):  [Newsletter],
    newsletter(id: ID!): Newsletter,
    subscriptions : [Subscription],
    profile: User,
    users: [User],
    user: User
  }

  type Mutation {
    signup(firstname: String!, lastname: String!, email: String!, password: String!): User
    login(email: String!, password: String!) : User
    logout : User

    createArticle(newsletter: ID!, category: ID!, title: String!, subtitle: String, text: String!): Article
    createCategory(name: String!) : Category,
    createCity(name: String!) : City,
    createDistrict(name: String!, city: ID!) : District
    createEvent(newsletter: ID!, category: ID!): Event
    createNewsletter(city: ID!, date: DateTime!, type: NewsletterType!, author: ID!): Newsletter
    createSubscription(city: ID!): Subscription,

    updateProfile(user: UserInput!): User

    deleteCity(id: ID!): City
    deleteSubscription(id: ID!): Subscription
  }
`;
