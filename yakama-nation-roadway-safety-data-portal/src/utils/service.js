import axios from 'axios';
import moment from 'moment';

const httpGetBody = async (url, params = null) => {
  try {
    const body = await axios.get(url, params);
    return body;
  } catch (e) {
    console.error(e);
  }
  return null;
};

const generateQueryParamsUrl = (root, obj) => {
  let qs = '';
  let result = (root[root.length - 1] === '/') ? root : `${root}/`;
  result += `${obj.fileName}`;
  const paramsObj = obj.queryParams;
  Object.keys(paramsObj).forEach((key) => {
    qs += `${key}=${paramsObj[key]}&`;
  });
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); // chop off last "&"
    result = `${result}?${qs}`;
  }
  return result;
};

const formatStartEndTime = (startDate, startTime, offset = 15) => {
  const start = moment(`${startDate} ${startTime}`);
  const result = {
    params: {
      start: start.format('YYYY-MM-DD HH:mm:ss.SSS'),
      end: start.add('m', offset).format('YYYY-MM-DD HH:mm:ss.SSS'),
    },
  };
  return result;
};

const sortSelectedStrings = (strings) => {
  const sorted = [];
  strings.forEach((str) => {
    sorted.push(parseInt(str, 10));
  });
  sorted.sort();
  sorted.forEach((int, i) => {
    sorted[i] = int.toString();
  });
  return sorted;
};

const getLargestNumInArrayIndex = (array) => {
  return array.indexOf(Math.max(...array));
};

// https://stackoverflow.com/questions/38770055/javascript-converting-3-numbers-to-percentage-doesnt-yield-100-total
const roundPercentageTotals = (numArr) => {
  // Total of all numbers passed.
  const total = numArr[0] + numArr[1] + numArr[2];

  // Percentage representations of each number (out of 100).
  const num1Percent = Math.round((numArr[0] / total) * 100);
  const num2Percent = Math.round((numArr[1] / total) * 100);
  const num3Percent = Math.round((numArr[2] / total) * 100);

  // Total percent of the 3 numbers combined (doesnt always equal 100%).
  const totalPercentage = num1Percent + num2Percent + num3Percent;

  // If not 100%, then we need to work around it by subtracting from the largest number (not as accurate but works out).
  if (totalPercentage !== 100) {
    // Get the index of the largest number in the array.
    const index = getLargestNumInArrayIndex(numArr);

    // Take the difference away from the largest number.
    numArr[index] -= (totalPercentage - 100);

    // Re-run this method recursively, until we get a total percentage of 100%.
    return roundPercentageTotals(numArr);
  }

  // Return the percentage version of the array passed in.
  return [num1Percent, num2Percent, num3Percent];
};

export {
  httpGetBody, generateQueryParamsUrl, formatStartEndTime, sortSelectedStrings, roundPercentageTotals,
};
