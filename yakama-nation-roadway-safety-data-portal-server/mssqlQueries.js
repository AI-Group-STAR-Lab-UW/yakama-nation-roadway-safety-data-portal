require('dotenv').config();
const sql = require('mssql');
const helpers = require('./helpers');
const sqlConfig = ((user, password, server, database, options) => {
  return {
    user,
    password,
    server,
    database,
    options
  };
})

const HSISReqConfig = sqlConfig(process.env.MSSQL_USERNAME, process.env.MSSQL_PASSWORD, '128.95.29.70', 'HSIS', {encrypt: false});

const getZipcodeAccidentData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const queryString = request.query ? helpers.generateSqlFilterString(request.query) : '';
        let sqlQuery = `SELECT postcode FROM [HSIS].[dbo].[Accident_v2_Yakima] ${queryString}`;
        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

const getIntersectionAccidentData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const queryString = request.query ? helpers.generateSqlFilterString(request.query) : '';
        let sqlQuery = `SELECT acc.ACCYR, acc.CASENO, acc_inter.intersection_id, acc.REPORT, inter.intersection_name, inter.lat as LATITUDE, inter.lon as LONGITUDE, inter.postcode
                        FROM [HSIS].[dbo].[Accident_v2_Yakima] as acc
                        INNER join [HSIS].[dbo].[accident_intersection_250m] as acc_inter
                        on acc.CASENO = acc_inter.CASENO
                        INNER join [HSIS].[dbo].[intersection_250m] as inter
                        on acc_inter.intersection_id = inter.intersection_id
                        ${queryString}`;

        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

const getTopkDangerousIntersectionData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const k = request.query.k;
        let sqlQuery = `select top(${k}) count(*) as Count, inter.intersection_name, inter.postcode
                        FROM [HSIS].[dbo].[Accident_v2_Yakima] as acc
                        INNER join [HSIS].[dbo].[accident_intersection_250m] as acc_inter
                        on acc.CASENO = acc_inter.CASENO
                        INNER join [HSIS].[dbo].[intersection_250m] as inter
                        on acc_inter.intersection_id = inter.intersection_id
                        group by inter.intersection_name ,inter.postcode
                        ORDER BY Count DESC`;

        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

const getAccidentPointData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const queryString = request.query ? helpers.generateSqlFilterString(request.query) : '';
        let sqlQuery = `SELECT ACCYR, ACCTYPE, SEVERITY, LATITUDE, LONGITUDE, rodwycls, MONTH FROM [HSIS].[dbo].[Accident_v2_Yakima] ${queryString}`;
        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

const getIncidentFrequencyAccidentData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const queryString = request.query ? helpers.generateSqlFilterString(request.query) : '';
        let sqlQuery = `SELECT CASENO, rd_inv, milepost FROM [HSIS].[dbo].[Accident_v2_Yakima] as c WHERE c.STARTDATETIME >= '${request.query["Start Date"]} ${request.query["Start Time"]}' and c.STARTDATETIME < '${request.query["End Date"]} ${request.query["End Time"]}'`;
        // console.log(sqlQuery);
        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

const getAccidentSegmentData = ((request, response) => {
  try {
    sql.connect(HSISReqConfig, (err) => {
      if (err) {
        console.log(err);
      } else {
        const sqlRequest = new sql.Request();
        const queryString = Object.keys(request.query).length !== 0 ? `${helpers.generateSqlFilterString(request.query)} AND segment_id IS NOT NULL` : ' WHERE segment_id IS NOT NULL';
        let sqlQuery = `SELECT segment_id, COUNT(segment_id) as count FROM [HSIS].[dbo].[Accident_seg_Yakima] ${queryString} GROUP BY segment_id`;
        sqlRequest.query(sqlQuery, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            response.json(data.recordsets[0]);
          }
          sql.close();
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
})

module.exports = {
  getZipcodeAccidentData,
  getAccidentPointData,
  getAccidentSegmentData,
  getIntersectionAccidentData,
  getTopkDangerousIntersectionData,
  getIncidentFrequencyAccidentData,
}
