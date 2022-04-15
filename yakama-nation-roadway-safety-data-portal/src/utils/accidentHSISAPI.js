import { httpGetBody } from './service';
import { WA_COUNTY_BOUNDARIES, YAKIMA_ZIP_CODE_AREA } from '../assets/data/WA_COUNTY_BOUNDARIES';
import { generateGradientColors } from './renderGradientColors';
import { SERVER_DOMAIN } from '../constants/domain';

const accidentDataAPI = `${SERVER_DOMAIN}/accidentData`;
const zipcodeAccidentDataAPI = `${SERVER_DOMAIN}/zipcodeAccidentData`;
const intersectionAccidentDataAPI = `${SERVER_DOMAIN}/intersectionAccidentData`;
const topkDangerousIntersectionDataAPI = `${SERVER_DOMAIN}/topkDangerousIntersectionData`;
const accidentPointDataAPI = `${SERVER_DOMAIN}/accidentPointData`;
const accidentSegmentDataAPI = `${SERVER_DOMAIN}/accidentSegmentData`;
const segmentDataAPI = `${SERVER_DOMAIN}/segmentData`;

const getAccidentData = async (accidentTimeInfo) => {
  const accidentsBody = await httpGetBody(accidentDataAPI, accidentTimeInfo);
  return accidentsBody.data;
};

const getZipcodeAccidentData = async (accidentTimeInfo) => {
  const accidentsBody = await httpGetBody(zipcodeAccidentDataAPI, accidentTimeInfo);
  return accidentsBody.data;
};

const getIntersectionAccidentData = async (accidentTimeInfo) => {
  const intersectionAccidentsBody = await httpGetBody(intersectionAccidentDataAPI, accidentTimeInfo);
  return intersectionAccidentsBody.data;
};

const getTopkDangerousIntersectionData = async (accidentTimeInfo) => {
  const topkDangerousIntersectionBody = await httpGetBody(topkDangerousIntersectionDataAPI, accidentTimeInfo);
  return topkDangerousIntersectionBody.data;
};

const getAccidentPointData = async (accidentTimeInfo) => {
  const accidentsBody = await httpGetBody(accidentPointDataAPI, accidentTimeInfo);
  return accidentsBody.data;
};

const getAccidentSegmentData = async (accidentTimeInfo) => {
  const accidentsBody = await httpGetBody(accidentSegmentDataAPI, accidentTimeInfo);
  return accidentsBody.data;
};

const getSegmentData = async () => {
  const segmentsBody = await httpGetBody(segmentDataAPI);
  return segmentsBody.data;
};

const getIntersectionSafetyIndex = (intersectionAccidentsData) => {
  const minCount = 0;
  let maxCount = 0;
  const polygons = [];

  YAKIMA_ZIP_CODE_AREA.features.forEach((polygon) => {
    polygons.push({
      ...YAKIMA_ZIP_CODE_AREA,
      features: [polygon],
      count: 0,
      name: polygon.properties.ZIPCODE,
    });
  });

  intersectionAccidentsData.forEach((intersectionAccidentData) => {
    polygons.forEach((polygon) => {
      if (intersectionAccidentData.postcode === polygon.name.toString()) {
        polygon.count += 1;
        if (polygon.count > maxCount) {
          maxCount = polygon.count;
        }
      }
    });
  });

  const colors = generateGradientColors(maxCount);

  polygons.forEach((polygon) => {
    if (polygon.count === 0) {
      polygon.color = '#a0a0a0';
    } else {
      polygon.color = colors[polygon.count - 1];
    }
  });

  return {
    polygons,
    minCount,
    maxCount,
    title: 'Number of Cases',
  };
};

const getAreaSafetyIndex = (accidentsData) => {
  const minCount = 0;
  let maxCount = 0;
  const polygons = [];

  WA_COUNTY_BOUNDARIES.features.forEach((polygon) => {
    polygons.push({
      ...WA_COUNTY_BOUNDARIES,
      features: [polygon],
      count: 0,
      id: polygon.properties.JURISDICT_DESG_CD,
      name: polygon.properties.JURISDICT_NM,
    });
  });

  accidentsData.forEach((accidentData) => {
    polygons.forEach((polygon) => {
      if (accidentData.COUNTY === polygon.id.toString()) {
        polygon.count += 1;
        if (polygon.count > maxCount) {
          maxCount = polygon.count;
        }
      }
    });
  });

  const colors = generateGradientColors(maxCount);

  polygons.forEach((polygon) => {
    if (polygon.count === 0) {
      polygon.color = '#a0a0a0';
    } else {
      polygon.color = colors[polygon.count - 1];
    }
  });

  return {
    polygons,
    minCount,
    maxCount,
    title: 'Number of Cases',
  };
};

const getSegmentSafetyIndex = (accidentsData, segmentsData) => {
  const segments = [];
  const segmentAccidentCountHashMap = Object.assign({}, ...accidentsData.map((s) => ({ [s.segment_id]: s.count })));
  for (let i = 0; i < segmentsData.length; i++) {
    const coordinates = [];
    const rawData = segmentsData[i].st_astext.substring('LINESTRING('.length, segmentsData[i].st_astext.length - 1).split(',');

    rawData.forEach((coor) => {
      const position = coor.split(' ');
      coordinates.push([position[1], position[0]]);
    });

    const data = {
      stateroute: segmentsData[i].stateroute,
      barm: segmentsData[i].barm,
      earm: segmentsData[i].earm,
      count: segmentAccidentCountHashMap[segmentsData[i].id] ? segmentAccidentCountHashMap[segmentsData[i].id] : 0,
      coordinates,
    };
    segments.push(data);
  }

  const maxCount = Object.keys(segmentAccidentCountHashMap).reduce((a, v) => Math.max(a, segmentAccidentCountHashMap[v]), -Infinity);
  const minCount = 0;
  const colors = generateGradientColors(maxCount);

  segments.forEach((segment) => {
    if (segment.count === 0) {
      segment.color = '#01df01';
    } else {
      segment.color = colors[segment.count - 1];
    }
  });

  return {
    segments,
    minCount,
    maxCount,
    title: 'Number of Cases',
  };
};

export {
  getAccidentData,
  getIntersectionAccidentData,
  getAccidentPointData,
  getAccidentSegmentData,
  getSegmentData,
  getIntersectionSafetyIndex,
  getAreaSafetyIndex,
  getSegmentSafetyIndex,
  getZipcodeAccidentData,
  getTopkDangerousIntersectionData,
};
