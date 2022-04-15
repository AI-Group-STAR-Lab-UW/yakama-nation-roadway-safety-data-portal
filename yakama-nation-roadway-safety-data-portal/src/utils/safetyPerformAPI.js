import { httpGetBody } from './service';
import { SERVER_DOMAIN } from '../constants/domain';
import BASIC_COLOR_LEVEL from '../assets/data/BASIC_COLOR_LEVEL';

const crashLocAPI = `${SERVER_DOMAIN}/incidentFrequencyAccidentData`;
const roadSectionDataAPI = `${SERVER_DOMAIN}/roadSectionData`;
const estimatedCrashMeanRoadDataAPI = `${SERVER_DOMAIN}/estimatedCrashMeanRoadData`;

const getCrashLoc = async (crashTimeInfo) => {
  const crashLocBody = await httpGetBody(crashLocAPI, crashTimeInfo);
  return crashLocBody.data;
};

const getRoadSectionData = async (roadSectionInfo) => {
  const roadSectionDataBody = await httpGetBody(roadSectionDataAPI, roadSectionInfo);
  return roadSectionDataBody.data;
};

const getEstimatedCrashMeanRoadData = async (roadSectionInfo) => {
  const roadSectionDataBody = await httpGetBody(estimatedCrashMeanRoadDataAPI, roadSectionInfo);
  return roadSectionDataBody.data;
};

const quantile = (arr, q) => {
  const asc = (array) => array.sort((a, b) => a - b);
  const sorted = asc(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
};

const getIncidentFrequencyData = (crashLoc, roadSectionData) => {
  const crashFreq = [];
  const statsCrashMeans = [];
  const polygons = [];

  roadSectionData.forEach((roadElement) => {
    let count = 0;
    crashLoc.forEach((crashInfo) => {
      if (crashInfo.milepost == null) return;
      if (crashInfo.rd_inv === roadElement.stateroute && crashInfo.milepost >= roadElement.barm && crashInfo.milepost < roadElement.earm) {
        count += 1;
      }
    });
    count /= Math.abs(roadElement.barm - roadElement.earm);
    statsCrashMeans.push(count);

    const crashFreqData = {
      polyLinePostgreGeom: roadElement.st_astext,
      count,
    };

    crashFreq.push(crashFreqData);
  });

  const levelA = quantile(statsCrashMeans, 1.0 / 6.0);
  const levelB = quantile(statsCrashMeans, 2.0 / 6.0);
  const levelC = quantile(statsCrashMeans, 3.0 / 6.0);
  const levelD = quantile(statsCrashMeans, 4.0 / 6.0);
  const levelE = quantile(statsCrashMeans, 5.0 / 6.0);

  crashFreq.forEach((crashData) => {
    const coordinates = [];
    // const rawData = crashData.polyLinePostgreGeom.substring('LINESTRING('.length, crashData.polyLinePostgreGeom.length - 1).split(',');
    const rawData = crashData.polyLinePostgreGeom.substring('MULTILINESTRING(('.length, crashData.polyLinePostgreGeom.length - 2).split(',');

    rawData.forEach((coor) => {
      const position = coor.split(' ');
      coordinates.push([position[1], position[0]]);
    });

    const result = {
      coordinates,
      color: '',
      safetyLevel: '',
    };

    const [level0, level1, level2, level3, level4, level5] = BASIC_COLOR_LEVEL;

    if (crashData.count <= levelA) {
      result.color = level0;
      result.safetyLevel = 'Level A';
    } else if (crashData.count <= levelB) {
      result.color = level1;
      result.safetyLevel = 'Level B';
    } else if (crashData.count <= levelC) {
      result.color = level2;
      result.safetyLevel = 'Level C';
    } else if (crashData.count <= levelD) {
      result.color = level3;
      result.safetyLevel = 'Level D';
    } else if (crashData.count <= levelE) {
      result.color = level4;
      result.safetyLevel = 'Level E';
    } else {
      result.color = level5;
      result.safetyLevel = 'Level F';
    }

    polygons.push(result);
  });

  return {
    polygons,
    minCount: 'Lv. A (1/6)',
    maxCount: 'Lv. F (6/6)',
    title: 'Level of Safety',
  };
};

const getEstimatedCrashMeanData = (betaList, roadSectionData) => {
  const crashMean = [];
  const statsCrashMeans = [];
  const polygons = [];
  roadSectionData.forEach((roadElement) => {
    const speedLMT = roadElement.speed_limit === 0.0 ? 55.0 : roadElement.speed_limit;
    const mean = Math.exp(betaList.Intercept + betaList['factor of Log'] * Math.log(roadElement.aadt) + betaList['factor of Lane Width'] * 12.0 + betaList['factor of # of lanes'] * parseFloat(roadElement.lanes) + betaList['factor of speed limit'] * speedLMT);

    statsCrashMeans.push(mean);

    const crashMeanData = {
      polyLinePostgreGeom: roadElement.st_astext,
      mean,
    };

    crashMean.push(crashMeanData);
  });

  const levelA = quantile(statsCrashMeans, 1.0 / 6.0);
  const levelB = quantile(statsCrashMeans, 2.0 / 6.0);
  const levelC = quantile(statsCrashMeans, 3.0 / 6.0);
  const levelD = quantile(statsCrashMeans, 4.0 / 6.0);
  const levelE = quantile(statsCrashMeans, 5.0 / 6.0);

  crashMean.forEach((crashMeanData) => {
    const coordinates = [];
    // const rawData = crashData.polyLinePostgreGeom.substring('LINESTRING('.length, crashData.polyLinePostgreGeom.length - 1).split(',');
    const rawData = crashMeanData.polyLinePostgreGeom.substring('MULTILINESTRING(('.length, crashMeanData.polyLinePostgreGeom.length - 2).split(',');

    rawData.forEach((coor) => {
      const position = coor.split(' ');
      coordinates.push([position[1], position[0]]);
    });

    const result = {
      coordinates,
      color: '',
      safetyLevel: '',
    };

    const [level0, level1, level2, level3, level4, level5] = BASIC_COLOR_LEVEL;

    if (crashMeanData.mean <= levelA) {
      result.color = level0;
      result.safetyLevel = 'Level A';
    } else if (crashMeanData.mean <= levelB) {
      result.color = level1;
      result.safetyLevel = 'Level B';
    } else if (crashMeanData.mean <= levelC) {
      result.color = level2;
      result.safetyLevel = 'Level C';
    } else if (crashMeanData.mean <= levelD) {
      result.color = level3;
      result.safetyLevel = 'Level D';
    } else if (crashMeanData.mean <= levelE) {
      result.color = level4;
      result.safetyLevel = 'Level E';
    } else {
      result.color = level5;
      result.safetyLevel = 'Level F';
    }

    polygons.push(result);
  });

  return {
    polygons,
    minCount: 'Lv. A (1/6)',
    maxCount: 'Lv. F (6/6)',
    title: 'Level of Safety',
  };
};

export {
  getCrashLoc, getRoadSectionData, getEstimatedCrashMeanRoadData, getIncidentFrequencyData, getEstimatedCrashMeanData,
};
