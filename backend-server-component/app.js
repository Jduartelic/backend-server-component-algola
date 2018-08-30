const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const handlers = require("./server/api/routes/handlers");
const { CronJob } = require('cron');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/getNews', (req, res, next) => { handlers.hackerNews.getNews(req, res, next) });

app.post('/removeNews/:id', (req, res, next) => { handlers.hackerNews.removeNews(req, res, next) });

app.get('/refreshNews', (req, res, next) => { handlers.hackerNews.getNewsFromAPI(req, res, next) });

const _createCron = () => {
  return new CronJob({
    cronTime: '00 00 */1 * * 0-6',
    onTick: () => {
      handlers.hackerNews.getNewsFromAPI() 
    },
    start: true,
    timeZone: 'America/Santiago'
  });
 };


_createCron();

module.exports = app;