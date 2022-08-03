const path = require('path');
const express = require('express');
// const routes = require('./routes');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers/'));

// // turn on routes
// app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
