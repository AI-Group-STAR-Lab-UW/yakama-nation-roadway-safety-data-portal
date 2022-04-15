require('dotenv').config();
const Pool = require('pg').Pool

const poolRoute = new Pool({
  user: process.env.PGSQL_USERNAME,
  host: '128.95.29.75',
  database: 'route',
  password: process.env.PGSQL_PASSWORD,
  port: 5432
});

const poolNewLoopMap = new Pool({
  user: process.env.PGSQL_USERNAME,
  host: '128.95.29.75',
  database: 'postgres217',
  password: process.env.PGSQL_PASSWORD,
  port: 5432
})

const getRoadSectionData = (request, response) => {
  try {
    let sqlQuery = '';
    if (request.query["Choose Route"] === 'All Routes') {
      // sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(geom, 4326))), stateroute, barm, earm FROM state_lines_2016 WHERE Region = 'SC' AND stateroute in ('410', '012', '097', '090', '010', '970', '082', '821', '823', '024', '022', '241')`;
      sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(the_geom, 4326))), route_id as stateroute, bpoint as barm, epoint as earm FROM inrix_cabinet WHERE region = 'SC' AND route_id in ('410', '012', '097', '090', '010', '970', '082', '821', '823', '024', '022', '241')`;
    } else {
      // sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(geom, 4326))), stateroute, barm, earm FROM state_lines_2016 WHERE stateroute = '${request.query["Choose Route"]}'`;
      sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(the_geom, 4326))), route_id as stateroute, bpoint as barm, epoint as earm FROM inrix_cabinet WHERE route_id = '${request.query["Choose Route"]}'`;
    }
    // poolNewLoopMap.query(sqlQuery, (error, results) => {
    poolRoute.query(sqlQuery, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        response.status(200).json(results.rows);
      }
    })
  } catch (err) {
    console.log(err);
  }
}

const getEstimatedCrashMeanRoadData = (request, response) => {
  try {
    let sqlQuery = '';
    if (request.query["Choose Route"] === 'All Routes') {
      // sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(geom, 4326))), stateroute, barm, earm FROM state_lines_2016 WHERE Region = 'SC' AND stateroute in ('410', '012', '097', '090', '010', '970', '082', '821', '823', '024', '022', '241')`;
      sqlQuery = `SELECT st_AsText(ST_Force2D(ST_Transform(the_geom, 4326))), s.route_id, s.bpoint, s.epoint, s.aadt, s.lanes, s.speed_limit FROM inrix_cabinet as s WHERE region = 'SC' AND s.route_id in ('410', '012', '097', '090', '010', '970', '082', '821', '823', '024', '022', '241')`;
    } else {
      // sqlQuery = `SELECT ST_AsText(ST_Force2D(ST_Transform(geom, 4326))), stateroute, barm, earm FROM state_lines_2016 WHERE stateroute = '${request.query["Choose Route"]}'`;
      sqlQuery = `SELECT st_AsText(ST_Force2D(ST_Transform(the_geom, 4326))), s.route_id, s.bpoint, s.epoint, s.aadt, s.lanes, s.speed_limit FROM inrix_cabinet as s WHERE s.route_id = '${request.query["Choose Route"]}'`;
    }
    // console.log(sqlQuery);
    // poolNewLoopMap.query(sqlQuery, (error, results) => {
    poolRoute.query(sqlQuery, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        response.status(200).json(results.rows);
      }
    })
  } catch (err) {
    console.log(err);
  }
}

const getSegmentData = (request, response) => {
  try {
    const sqlQuery = `SELECT id, stateroute, barm, earm, ST_AsText(ST_Force2D(ST_Transform(geom, 4326))) FROM state_lines_2016 WHERE Region = 'SC' AND stateroute in ('410', '012', '097', '090', '010', '970', '082', '821', '823', '024', '022', '241')`;
    poolNewLoopMap.query(sqlQuery, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        response.status(200).json(results.rows);
      }
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getRoadSectionData,
  getEstimatedCrashMeanRoadData,
  getSegmentData,
}
