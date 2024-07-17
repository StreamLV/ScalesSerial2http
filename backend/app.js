const express = require('express');
const configService = require('./config/config-service');
// const configApp = require('./config/configApp');
const configApp = configService.getConfigApp();
const app = express();
const scalesRoutes = require('./routes/scales-routes');
const demoRoutes = require('./routes/demo-routes');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  // res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/demo', demoRoutes);
app.use('/', scalesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Could not find this route' });
});

app.listen(configApp.port);