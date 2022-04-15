// import WSDOTRealTimeDataFormReducer from './MapsAndData/WSDOTRealTimeDataFormReducer';
import FormReducer from './Form/FormReducer';
import pointSafetyIndexReducer from './SafetyNet/pointSafetyIndexReducer';
import segmentSafetyIndexReducer from './SafetyNet/segmentSafetyIndexReducer';
import areaSafetyIndexReducer from './SafetyNet/areaSafetyIndexReducer';
import intersectionSafetyIndexReducer from './SafetyNet/intersectionSafetyIndexReducer';
import accidentHeatmapReducer from './SafetyNet/accidentHeatmapReducer';
import incidentFrequencyReducer from './SafetyNet/incidentFrequencyReducer';
import estimatedCrashMeanReducer from './SafetyNet/estimatedCrashMeanReducer';
import summaryReportReducer from './SafetyNet/summaryReportReducer';

export default {
  FormReducer,
  pointSafetyIndexReducer,
  segmentSafetyIndexReducer,
  areaSafetyIndexReducer,
  intersectionSafetyIndexReducer,
  accidentHeatmapReducer,
  incidentFrequencyReducer,
  estimatedCrashMeanReducer,
  summaryReportReducer,
};
