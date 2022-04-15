import { getAccidentPointData } from './accidentHSISAPI';

const propertyDamageSeverity = ['(0) Not Stated', '(1) No Injury'];
const injurySeverity = ['(5) Disabling Injury', '(6) Non-Disabling/Inj', '(7) Possible Injury', '(8) Non-Traffic Injury'];
const fatalSeverity = ['(2) Dead At Scene', '(3) Dead On Arrival', '(4) Died At Hospital', '(9) Non-Traffic Fatality'];

const getSummaryReportData = async (accidentInfo) => {
  let severity = [];
  severity = severity.concat(propertyDamageSeverity);
  severity = severity.concat(injurySeverity);
  severity = severity.concat(fatalSeverity);
  // accidentInfo.params.Severity.forEach((item) => {
  //   if (item === 'Property Damage Only') {
  //     severity = severity.concat(propertyDamageSeverity);
  //   } else if (item === 'Injury') {
  //     severity = severity.concat(injurySeverity);
  //   } else {
  //     severity = severity.concat(fatalSeverity);
  //   }
  // });

  accidentInfo.params.Severity = severity;
  const result = await getAccidentPointData(accidentInfo);
  return result;
};

export {
  getSummaryReportData,
};
