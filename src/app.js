const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('mongoose');

// Mongoose
mongoose.connect('mongodb://localhost/newsletter');

mongoose.connection
  .on('error', () => console.log('Failed to connect to mongoDB'))
  .once('open', () => console.log('Connected to mongoDB'));

// Import GraphQL Schema
const schema = require('./schema');

// Listen PORT
const PORT = 4000;

const app = express();

app.use(morgan('dev'));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
