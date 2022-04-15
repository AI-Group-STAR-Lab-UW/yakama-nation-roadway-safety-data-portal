const generateSqlFilterString = ((obj) => {

  let queryString = 'WHERE';
  if (obj['Year(s)']) {
    queryString += ' ACCYR IN ('
    obj['Year(s)'].map((yr) => {
      queryString += ` '${yr}',`
    })
    queryString = queryString.substring(0, queryString.length-1);
    queryString += ') AND'
  }

  if (obj['Month(s)']) {
    queryString += ' MONTH IN ('
    obj['Month(s)'].map((month) => {
      queryString += ` '${getMonthNumber(month)}',`
    })
    queryString = queryString.substring(0, queryString.length-1);
    queryString += ') AND'
  }

  if (obj['Weekday(s)']) {
    queryString += ' WEEKDAY IN ('
    obj['Weekday(s)'].map((weekday) => {
      queryString += ` '${getWeekdayNumber(weekday)}',`
    })
    queryString = queryString.substring(0, queryString.length-1);
    queryString += ') AND'
  }

  if (obj['Roadway Class']) {
    queryString += ' rodwycls IN ('
    obj['Roadway Class'].map((rdClass) => {
      queryString += ` '${getRoadwayClass(rdClass)}',`
    })
    queryString = queryString.substring(0, queryString.length-1);
    queryString += ') AND'
  }

  if (obj['Severity']) {
    queryString += ' SEVERITY IN ('
    obj['Severity'].map((severity) => {
      queryString += ` '${getSeverityNumber(severity)}',`
    })
    queryString = queryString.substring(0, queryString.length-1);
    queryString += ') AND'
  }

  if (obj['Zipcode']) {
    return 'WHERE SUBSTRING( inter.postcode, 1, 5 ) =' + obj['Zipcode'].toString();
  }

  return queryString == 'WHERE' ? '' : queryString.substring(0, queryString.length-3)
})

const getMonthNumber = ((stringOfMonth) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return months.indexOf(stringOfMonth) + 1;
})

const getWeekdayNumber = ((stringOfWeekday) => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  return weekdays.indexOf(stringOfWeekday) + 1;
})

const getRoadwayClass = ((stringOfSeverity) => {
  const levelOfSeverity = [
    '(01) Urban Freeways',
    '(02) Urban Freeways < 4 Ln',
    '(03) Urban 2 Lane Roads',
    '(04) Urban Multilane Divided Non Freeways',
    '(05) Urban Multilane Undivided Non Freeways',
    '(06) Rural Freeways',
    '(07) Rural Freeways < 4 Ln',
    '(08) Rural 2 Lane Roads',
    '(09) Rural Multilane Divided Non Freeways',
    '(10) Rural Multilane Undivided Non Freeways',
    '(99) Others'
  ];

  if (levelOfSeverity.indexOf(stringOfSeverity) + 1 > 10) {
    return 99;
  } else {
    return levelOfSeverity.indexOf(stringOfSeverity) + 1
  }
})

const getSeverityNumber = ((stringOfSeverity) => {
  const levelOfSeverity = [
    '(0) Not Stated',
    '(1) No Injury',
    '(2) Dead At Scene',
    '(3) Dead On Arrival',
    '(4) Died At Hospital',
    '(5) Disabling Injury',
    '(6) Non-Disabling/Inj',
    '(7) Possible Injury',
    '(8) Non-Traffic Injury',
    '(9) Non-Traffic Fatality'
  ];

  return levelOfSeverity.indexOf(stringOfSeverity);
})

module.exports = {
  generateSqlFilterString,
}
