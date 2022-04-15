const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const postgresqlDb = require('./pgQueries');
const mssqlDb = require('./mssqlQueries');
const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (request, response) => {
  response.send("DRIVE NET DATA API");
});

app.get('/roadSectionData', postgresqlDb.getRoadSectionData);
app.get('/estimatedCrashMeanRoadData', postgresqlDb.getEstimatedCrashMeanRoadData);
app.get('/segmentData', postgresqlDb.getSegmentData);

app.get('/zipcodeAccidentData', mssqlDb.getZipcodeAccidentData);
app.get('/topkDangerousIntersectionData', mssqlDb.getTopkDangerousIntersectionData);
app.get('/intersectionAccidentData', mssqlDb.getIntersectionAccidentData);
app.get('/incidentFrequencyAccidentData', mssqlDb.getIncidentFrequencyAccidentData);
app.get('/accidentPointData', mssqlDb.getAccidentPointData);
app.get('/accidentSegmentData', mssqlDb.getAccidentSegmentData);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})
