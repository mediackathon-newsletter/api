module.exports = `

  scalar DateTime

  enum NewsletterType {
    EVENTS
    ARTICLES
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


  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    password: String
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
    articles: [Article],
    article: Article,
    categories: [Category],
    category(id: ID!): Category,
    cities: [City],
    city(id: ID!): City,
    districts(city: ID!): [District],
    district(id: ID!): District,
    events: [Event],
    event: Event,
    newsletters:  [Newsletter],
    newsletter: Newsletter
    users: [User],
    user: [User]
  }

  type Mutation {
    createArticle(newsletter: ID!, category: ID!, title: String!, subtitle: String, text: String!): Article
    createCategory(name: String!) : Category,
    createCity(name: String!) : City,
    createDistrict(name: String!, city: ID!) : District
    createEvent(newsletter: ID!, category: ID!): Event
    createNewsletter(city: ID!, date: DateTime!, type: NewsletterType!, author: ID!): Newsletter
    createUser(firstname: String!, lastname: String!, email: String!, password: String!, journalist: Boolean): User
  }
`;
