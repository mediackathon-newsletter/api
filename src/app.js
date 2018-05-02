const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// GraphQL dependencies
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('mongoose');

// Authentication dependencies
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

// Variables
const MONGO_URL = 'mongodb://localhost/newsletter';
const EXPRESS_PORT = 4000;

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);

mongoose.connection
  .on('error', () => console.log('Failed to connect to mongoDB'))
  .once('open', () => console.log('Connected to mongoDB'));

// Import GraphQL Schema
const schema = require('./schema');

const app = express();

// Session conf
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'notasecret',
    store: new MongoStore({
      url: MONGO_URL,
      autoReconnect: true
    })
  })
);

// Passport conf
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({ schema, context: { req } }))
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(EXPRESS_PORT);
