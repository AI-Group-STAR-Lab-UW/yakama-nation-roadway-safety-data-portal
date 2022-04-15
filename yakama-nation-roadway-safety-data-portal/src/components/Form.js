import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import renderFormHelper from '../utils/renderFormHelper';
import '../assets/styles/form.css';
import '../assets/styles/plot.css';
import Mask from '../widget/Form/Mask';
import DownloadCrashDataTable from './SafetyNet/CrashDataDownloadForm/downloadCrashDataTable';

import CrashSeverity from './SafetyNet/SummayForm/crashSeverity';
import YearTrend from './SafetyNet/SummayForm/yearTrend';
import MonthAggregate from './SafetyNet/SummayForm/monthAggregate';
import ContactInfo from './SafetyNet/ContactForm/contactInfo';

import {
  getZipcodeAccidentData, getAccidentPointData, getAccidentSegmentData, getSegmentData, getSegmentSafetyIndex, getIntersectionAccidentData, getIntersectionSafetyIndex,
} from '../utils/accidentHSISAPI';
import {
  getCrashLoc, getRoadSectionData, getIncidentFrequencyData, getEstimatedCrashMeanRoadData, getEstimatedCrashMeanData,
} from '../utils/safetyPerformAPI';
import { getSummaryReportData } from '../utils/summaryReportAPI';
import { sortSelectedStrings, roundPercentageTotals } from '../utils/service';

import FormAction from '../actions/Form/FormAction';
import pointSafetyIndexAction from '../actions/SafetyNet/pointSafetyIndexAction';
import segmentSafetyIndexAction from '../actions/SafetyNet/segmentSafetyIndexAction';
import areaSafetyIndexAction from '../actions/SafetyNet/areaSafetyIndexAction';
import intersectionSafetyIndexAction from '../actions/SafetyNet/intersectionSafetyIndexAction';
import accidentHeatmapAction from '../actions/SafetyNet/accidentHeatmapAction';
import incidentFrequencyAction from '../actions/SafetyNet/incidentFrequencyAction';
import estimatedCrashMeanAction from '../actions/SafetyNet/estimatedCrashMeanAction';
import summaryReportAction from '../actions/SafetyNet/summaryReportAction';

import BASIC_COLOR_LEVEL from '../assets/data/BASIC_COLOR_LEVEL';
import { getColorBar } from '../utils/generateColorBar';
import { generateGradientColors } from '../utils/renderGradientColors';
import Loading from '../widget/Plot/loadingAnimation';

class Form extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      displayMinModal: false,
      displaySummaryReport: false,
      colorbarMinValue: null,
      colorbarMaxValue: null,
      colorbarTitle: null,
      listOfColors: [],
      warningMessage: '',
      loaded: false,
      loading: false,
      formParamsCurrentStore: {},
    };
  }

  isObjEmpty = (obj) => (
    Object.keys(obj).length === 0
  )

  isNumber = (val) => {
    const regPos = /^[0-9]+.?[0-9]*/;
    if (regPos.test(val)) {
      return true;
    }
    return false;
  }

  compareObjects = (a, b) => {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) return false;
    const keysA = Object.keys(a); const
      keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (typeof a[key] === 'function' || typeof b[key] === 'function') {
        if (a[key].toString() !== b[key].toString()) return false;
      } else {
        if (!this.compareObjects(a[key], b[key])) return false;
      }
    }
    return true;
  }

  isPointSafetyIndex = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Point Based Crash Visualization';
  }

  isSegmentSafetyIndex = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Segment Based Safety Index';
  }

  isAreaSafetyIndex = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Zipcode-based Safety Index Visualization';
  }

  isAccidentHeatmap = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Crash Heatmap Visualization';
  }

  isIncidentFrequency = (btn) => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Safety Performance Visualization' && btn === 'Visualize Incident Frequency';
  }

  isEstimatedCrashMean = (btn) => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Safety Performance Visualization' && btn === 'Estimated Crash Mean';
  }

  isCrashDataDownloadForm = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Crash Data Download';
  }

  isDownloadCrashData = (btn) => {
    return btn === 'Download Crash Data';
  }

  isSummaryReport = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Summary Report';
  }

  isContactForm = () => {
    const { uiParams: { formTitle } } = this.props;
    return formTitle === 'Contact Us';
  }

  renderDownloadCrashData = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setPointSafetyIndexData }, formParams } = this.props;
      const accidentTimeInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
          'Month(s)': formParams['Month(s)'],
          'Weekday(s)': formParams['Weekday(s)'],
          'Roadway Class': formParams['Roadway Class'],
          Severity: formParams.Severity,
        },
      };

      const accidentsData = await getAccidentPointData(accidentTimeInfo);
      setPointSafetyIndexData(accidentsData);
      this.setState({ loaded: true });
    } catch (err) {
      console.error(err);
    }
  }

  renderPointSafetyIndex = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setPointSafetyIndexData }, formParams } = this.props;
      const accidentTimeInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
          'Month(s)': formParams['Month(s)'],
          'Weekday(s)': formParams['Weekday(s)'],
          'Roadway Class': formParams['Roadway Class'],
          Severity: formParams.Severity,
        },
      };

      const accidentsData = await getAccidentPointData(accidentTimeInfo);

      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setPointSafetyIndexData(accidentsData);
    } catch (err) {
      console.error(err);
    }
  }

  renderSegmentSafetyIndex = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setSegmentSafetyIndexData }, formParams } = this.props;
      const accidentTimeInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
          'Month(s)': formParams['Month(s)'],
          'Weekday(s)': formParams['Weekday(s)'],
          'Roadway Class': formParams['Roadway Class'],
          Severity: formParams.Severity,
        },
      };

      const accidentsData = await getAccidentSegmentData(accidentTimeInfo);
      const segmentsData = await getSegmentData();
      const segmentSafetyIndexWithColor = getSegmentSafetyIndex(accidentsData, segmentsData);
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setSegmentSafetyIndexData(segmentSafetyIndexWithColor.segments);
      this.setState({
        colorbarMinValue: segmentSafetyIndexWithColor.minCount.toString(),
        colorbarMaxValue: segmentSafetyIndexWithColor.maxCount.toString(),
        colorbarTitle: segmentSafetyIndexWithColor.title,
        listOfColors: generateGradientColors(segmentSafetyIndexWithColor.maxCount),
      });
    } catch (err) {
      console.error(err);
    }
  }

  renderAreaSafetyIndex = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setAreasAndColors }, formParams } = this.props;

      const accidentTimeInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
          'Month(s)': formParams['Month(s)'],
          'Weekday(s)': formParams['Weekday(s)'],
          'Roadway Class': formParams['Roadway Class'],
          Severity: formParams.Severity,
        },
      };

      const intersectionAccidentsData = await getZipcodeAccidentData(accidentTimeInfo);
      const intersectionSafetyIndexWithColor = getIntersectionSafetyIndex(intersectionAccidentsData);
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setAreasAndColors(intersectionSafetyIndexWithColor.polygons);
      this.setState({
        colorbarMinValue: intersectionSafetyIndexWithColor.minCount.toString(),
        colorbarMaxValue: intersectionSafetyIndexWithColor.maxCount.toString(),
        colorbarTitle: intersectionSafetyIndexWithColor.title,
        listOfColors: generateGradientColors(intersectionSafetyIndexWithColor.maxCount),
      });
    } catch (err) {
      console.error(err);
    }
  }

  renderIntersectionSafetyIndex = async () => {
    try {
      const { actions: { setIntersectionAreasAndColors } } = this.props;

      const intersectionAccidentsData = await getIntersectionAccidentData();
      const intersectionSafetyIndexWithColor = getIntersectionSafetyIndex(intersectionAccidentsData);

      setIntersectionAreasAndColors(intersectionSafetyIndexWithColor.polygons);
    } catch (err) {
      console.error(err);
    }
  }

  renderAccidentHeatmap = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setAccidentHeatmapData }, formParams } = this.props;

      const accidentTimeInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
          'Month(s)': formParams['Month(s)'],
          'Weekday(s)': formParams['Weekday(s)'],
          'Roadway Class': formParams['Roadway Class'],
          Severity: formParams.Severity,
        },
      };

      const accidentsData = await getAccidentPointData(accidentTimeInfo);

      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setAccidentHeatmapData(accidentsData);
    } catch (err) {
      console.error(err);
    }
  }

  renderIncidentFrequency = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setRoutesAndColors }, formParams } = this.props;

      const crashTimeInfo = {
        params: {
          'Start Date': formParams['Start Date'],
          'End Date': formParams['End Date'],
          'Start Time': formParams['Start Time'],
          'End Time': formParams['End Time'],
        },
      };

      const roadSectionInfo = {
        params: {
          'Choose Route': formParams['Choose Route'],
        },
      };

      const crashLoc = await getCrashLoc(crashTimeInfo);
      const roadSectionData = await getRoadSectionData(roadSectionInfo);
      const polyLinesWithColor = getIncidentFrequencyData(crashLoc, roadSectionData);
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setRoutesAndColors(polyLinesWithColor.polygons);
      this.setState({
        colorbarMinValue: polyLinesWithColor.minCount,
        colorbarMaxValue: polyLinesWithColor.maxCount,
        colorbarTitle: polyLinesWithColor.title,
        listOfColors: BASIC_COLOR_LEVEL,
      });
    } catch (err) {
      console.error(err);
    }
  }

  renderEstimatedCrashMean = async () => {
    try {
      this.setState({ loading: true });
      const { actions: { setRoutesAndColors }, formParams } = this.props;

      const betaList = {
        Intercept: -6.840,
        'factor of Log': 1.154,
        'factor of Lane Width': -0.066,
        'factor of # of lanes': -0.056,
        'factor of left shoulder width': -0.006,
        'factor of right shoulder width': -0.05,
        'factor of median width': -0.004,
        'factor of speed limit': -0.02,
      };

      const roadSectionInfo = {
        params: {
          'Choose Route': formParams['Choose Route'],
        },
      };

      const roadSectionData = await getEstimatedCrashMeanRoadData(roadSectionInfo);
      const polyLinesWithColor = getEstimatedCrashMeanData(betaList, roadSectionData);
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
      setRoutesAndColors(polyLinesWithColor.polygons);
      this.setState({
        colorbarMinValue: polyLinesWithColor.minCount,
        colorbarMaxValue: polyLinesWithColor.maxCount,
        colorbarTitle: polyLinesWithColor.title,
        listOfColors: BASIC_COLOR_LEVEL,
      });
    } catch (err) {
      console.error(err);
    }
  }

  checkPointSafetyIndexInput = async () => {
    const { formParams } = this.props;
    let noWarning = true;
    let msg = '';
    const accidentTimeInfo = {
      params: {
        'Year(s)': formParams['Year(s)'],
        'Month(s)': formParams['Month(s)'],
        'Weekday(s)': formParams['Weekday(s)'],
        'Roadway Class': formParams['Roadway Class'],
        Severity: formParams.Severity,
      },
    };

    const accidentsData = await getAccidentPointData(accidentTimeInfo);

    if (accidentsData.length === 0) {
      msg = '* No data available. *';
      noWarning = false;
    }

    return {
      noWarning,
      msg,
    };
  }

  checkDateAndTimeRange = () => {
    const { formParams } = this.props;
    let noWarning = true;
    let msg = '';
    const startData = moment(formParams['Start Date']);
    const endDate = moment(formParams['End Date']);
    const startTime = moment(formParams['Start Time'], 'hh:mm');
    const endTime = moment(formParams['End Time'], 'hh:mm');
    if (startData.isAfter(endDate)) {
      msg = '* The start date must be before or equal to the end date . *';
      noWarning = false;
      return {
        noWarning,
        msg,
      };
    }

    if (startData.isSame(endDate) && (!startTime.isBefore(endTime))) {
      msg = '* The start time must be before the end time . *';
      noWarning = false;
      return {
        noWarning,
        msg,
      };
    }

    return {
      noWarning,
      msg,
    };
  }

  checkYearInputForSummary = () => {
    const { formParams } = this.props;
    let noWarning = true;
    let msg = '';
    const years = formParams['Year(s)'];
    // const typeOfSeverity = formParams.Severity;
    if (years.length < 2) {
      msg = '* Please Select at least two years . *';
      noWarning = false;
      return {
        noWarning,
        msg,
      };
    }

    return {
      noWarning,
      msg,
    };
  }

  submitFormClick = async (btn) => {
    const {
      actions: {
        resetPointSafetyIndexData,
        resetSegmentSafetyIndexData,
        resetAreaSafetyIndexData,
        resetAccidentHeatmapData,
        resetIncidentFrequencyData,
        resetEstimatedCrashMeanData,
        resetSummaryReportData,
      },
    } = this.props;
    this.setState({ displayMinModal: true });

    if (this.isPointSafetyIndex()) {
      try {
        const checkInputStatus = await this.checkPointSafetyIndexInput();
        this.setState({ warningMessage: checkInputStatus.msg });
        if (checkInputStatus.noWarning) {
          resetPointSafetyIndexData();
          this.renderPointSafetyIndex();
        } else {
          this.setState({ displayMinModal: false });
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (this.isSegmentSafetyIndex()) {
      resetSegmentSafetyIndexData();
      this.renderSegmentSafetyIndex();
    }

    if (this.isAreaSafetyIndex()) {
      resetAreaSafetyIndexData();
      this.renderAreaSafetyIndex();
    }

    if (this.isAccidentHeatmap()) {
      resetAccidentHeatmapData();
      this.renderAccidentHeatmap();
    }

    if (this.isIncidentFrequency(btn)) {
      const checkDateStatus = this.checkDateAndTimeRange();
      this.setState({ warningMessage: checkDateStatus.msg });
      if (checkDateStatus.noWarning) {
        resetIncidentFrequencyData();
        this.renderIncidentFrequency();
      } else {
        this.setState({ displayMinModal: false });
      }
    }

    if (this.isEstimatedCrashMean(btn)) {
      const checkDateStatus = this.checkDateAndTimeRange();
      this.setState({ warningMessage: checkDateStatus.msg });
      if (checkDateStatus.noWarning) {
        resetEstimatedCrashMeanData();
        this.renderEstimatedCrashMean();
      } else {
        this.setState({ displayMinModal: false });
      }
    }

    if (this.isCrashDataDownloadForm()) {
      try {
        if (this.isDownloadCrashData(btn)) {
          this.setState({ displayMinModal: false });
          this.renderDownloadCrashData();
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (this.isSummaryReport()) {
      const checkDateStatus = this.checkYearInputForSummary();
      this.setState({ warningMessage: checkDateStatus.msg });
      if (checkDateStatus.noWarning) {
        resetSummaryReportData();
        this.renderSummaryReport();
      } else {
        this.setState({ displayMinModal: false });
      }
    }
  }

  resubmitButtonClick = () => {
    const {
      actions: {
        resetPointSafetyIndexData,
        resetSegmentSafetyIndexData,
        resetAreaSafetyIndexData,
        resetAccidentHeatmapData,
        resetIncidentFrequencyData,
        resetEstimatedCrashMeanData,
        resetSummaryReportData,
      },
    } = this.props;
    this.setState({
      displayMinModal: false,
      displaySummaryReport: false,
      loading: false,
      loaded: false,
      colorbarMinValue: null,
      colorbarMaxValue: null,
    });
    resetPointSafetyIndexData();
    resetSegmentSafetyIndexData();
    resetAreaSafetyIndexData();
    resetAccidentHeatmapData();
    resetIncidentFrequencyData();
    resetEstimatedCrashMeanData();
    resetSummaryReportData();
  }

  closeBottonClick = () => {
    const { actions: { resetUiForm } } = this.props;
    resetUiForm();
    this.setState({
      displayMinModal: false, warningMessage: '', loading: false, loaded: false, displaySummaryReport: false,
    });
  }

  renderTitle = () => {
    const { uiParams: { formTitle } } = this.props;
    return (
      <div className="header">
        <h3 style={{ textAlign: 'center' }}>{formTitle}</h3>
      </div>
    );
  }

  renderInputs = () => {
    const { uiParams } = this.props;
    return uiParams.uiList.map((input) => {
      const { name, type, value } = input;
      const key = uuidv4();
      return renderFormHelper(name, type, value, key);
    });
  }

  renderMinModalContent = () => {
    const { formParams } = this.props;
    return Object.keys(formParams).map((key) => {
      if (formParams[key]) {
        return (
          <div className="min-modal" key={uuidv4()}>
            <p style={{
              borderWeight: '500', textAlign: 'center', margin: '0', borderBottom: 'solid 2px black', backgroundColor: 'rgba(245,245,220, 0.5)',
            }}
            >{key}
            </p>
            <p>{typeof formParams[key] === 'object' ? formParams[key].join(', ') : formParams[key].toString().toUpperCase()}</p>
          </div>
        );
      } return null;
    });
  }

  renderMinModalForm = () => {
    const minModelContents = this.renderMinModalContent();
    let isFilterSetting = false;
    if (minModelContents.length > 0) {
      minModelContents.forEach((obj) => {
        if (obj) {
          isFilterSetting = true;
        }
      });
    }

    return (
      <div className="min-submit-form transparency shadow card">
        {isFilterSetting ? this.renderMinModalContent() : <p style={{ textAlign: 'center', margin: 'auto', padding: '5px' }}>No Filter Setting</p>}
        <div className="footer text-center">
          <button className="btn btn-xs btn-fill btn-info" onClick={this.resubmitButtonClick}>Re-Submit</button>
        </div>
      </div>
    );
  }

  renderLoadingAnimation = () => {
    const { loaded, loading } = this.state;
    return (
      <div>
        <div className="animation-plot">
          { !loaded && <Loading loading={loading} /> }
          <div ref={this.myRef} />
        </div>
      </div>
    );
  }

  renderSubmitButton = () => {
    const { uiParams: { buttons }, formParams } = this.props;
    const { loading, loaded, formParamsCurrentStore } = this.state;

    // If the form is changed after processing download, the button should be back to the normal one.
    if (!this.compareObjects(formParamsCurrentStore, formParams)) {
      this.setState({ formParamsCurrentStore: formParams, loading: false, loaded: false });
    }

    return buttons.map((btn) => {
      // Normal case
      if (btn !== 'Download Crash Data') {
        return (
          <div className="footer text-center" key={uuidv4()}>
            <button type="submit" className="btn btn-info btn-fill" onClick={() => (this.submitFormClick(btn))}>{btn}</button>
          </div>
        );
      }

      // Special Case, but in a initial stage
      if (btn === 'Download Crash Data' && !loading && !loaded) {
        return (
          <div className="footer text-center" key={uuidv4()}>
            <button type="submit" className="btn btn-info btn-fill" onClick={() => (this.submitFormClick(btn))}>{btn}</button>
          </div>
        );
      }

      // Special Case. If Loaded, show DownloadAveragedDataTable tag, or show processing button.
      return (
        <div className="footer text-center" key={uuidv4()}>
          {!loaded ? (
            <button type="submit" className="btn btn-processing btn-fill">Processing Data...</button>
          ) : (
            <DownloadCrashDataTable name="Ready To Download Crash Data" />
          )}
        </div>
      );
    });
  }

  renderAlert = () => {
    if (this.state.warningMessage) {
      return (
        <p style={{ color: 'red', textAlign: 'center' }}>{this.state.warningMessage}</p>
      );
    }
    return null;
  }

  renderMainForm = () => {
    const { uiParams: { formTitle } } = this.props;
    const {
      actions: {
        resetIntersectionSafetyIndexData,
      },
    } = this.props;

    if (formTitle === 'Intersection Safety Index Visualization') {
      resetIntersectionSafetyIndexData();
      this.renderIntersectionSafetyIndex();
      return null;
    }
    return (
      <div>
        <div className="submit-form card shadow">
          <div className="font-icon-detail pull-right close-button" onClick={this.closeBottonClick}>
            <i className="pe-7s-close" />
          </div>
          { this.renderTitle() }
          <div style={{ width: '80%', margin: '0 auto', marginBottom: '10px' }}>
            { this.renderInputs() }
            { this.renderAlert() }
            { this.renderSubmitButton() }
          </div>
        </div>
        <Mask className="overlay-mask" onClick={this.closeBottonClick} />
      </div>
    );
  }

  renderSummaryReport = async () => {
    try {
      this.setState({ displaySummaryReport: true, loading: true });
      const { actions: { setCrashSeverityDistributionData, setYearTrendData, setMonthAggregateData }, formParams } = this.props;

      formParams['Year(s)'] = sortSelectedStrings(formParams['Year(s)']);

      const accidentInfo = {
        params: {
          'Year(s)': formParams['Year(s)'],
        },
      };

      const summaryReportData = await getSummaryReportData(accidentInfo);
      const indexOfPropertyDamage = ['0', '1'];
      const indexOfInjury = ['5', '6', '7', '8'];
      const indexOfFatal = ['2', '3', '4', '9'];

      const crashSeverityDistributionCount = {
        propertyDamageCount: 0,
        injuryCount: 0,
        fatalCount: 0,
        xAxis: formParams['Year(s)'],
        legend: ['Property Damage Only', 'Injury', 'Fatal'],
        label: [],
        minYear: formParams['Year(s)'][0],
        maxYear: formParams['Year(s)'][formParams['Year(s)'].length - 1],
      };

      const yearTrendCount = {
        propertyDamageCount: {},
        injuryCount: {},
        fatalCount: {},
        xAxis: formParams['Year(s)'],
        legend: ['Property Damage Only', 'Injury', 'Fatal'],
        minYear: formParams['Year(s)'][0],
        maxYear: formParams['Year(s)'][formParams['Year(s)'].length - 1],
      };

      const monthAggregateCount = {
        propertyDamageCount: new Array(12).fill(0),
        injuryCount: new Array(12).fill(0),
        fatalCount: new Array(12).fill(0),
        xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        legend: ['Property Damage Only', 'Injury', 'Fatal'],
        minYear: formParams['Year(s)'][0],
        maxYear: formParams['Year(s)'][formParams['Year(s)'].length - 1],
      };

      formParams['Year(s)'].forEach((item) => {
        yearTrendCount.propertyDamageCount[item] = 0;
        yearTrendCount.injuryCount[item] = 0;
        yearTrendCount.fatalCount[item] = 0;
      });

      summaryReportData.forEach((item) => {
        if (indexOfPropertyDamage.includes(item.SEVERITY)) {
          crashSeverityDistributionCount.propertyDamageCount += 1;
          yearTrendCount.propertyDamageCount[item.ACCYR] += 1;
          monthAggregateCount.propertyDamageCount[parseInt(item.MONTH, 10) - 1] += 1;
        } else if (indexOfInjury.includes(item.SEVERITY)) {
          crashSeverityDistributionCount.injuryCount += 1;
          yearTrendCount.injuryCount[item.ACCYR] += 1;
          monthAggregateCount.injuryCount[parseInt(item.MONTH, 10) - 1] += 1;
        } else if (indexOfFatal.includes(item.SEVERITY)) {
          crashSeverityDistributionCount.fatalCount += 1;
          yearTrendCount.fatalCount[item.ACCYR] += 1;
          monthAggregateCount.fatalCount[parseInt(item.MONTH, 10) - 1] += 1;
        }
      });

      for (const [key, value] of Object.entries(yearTrendCount)) {
        const values = [];
        for (const [, innerValue] of Object.entries(value)) {
          values.push(innerValue);
        }
        yearTrendCount[key] = values;
      }

      const percentage = roundPercentageTotals([crashSeverityDistributionCount.propertyDamageCount, crashSeverityDistributionCount.fatalCount, crashSeverityDistributionCount.injuryCount]);
      crashSeverityDistributionCount.percentage = percentage;
      percentage.forEach((item) => {
        crashSeverityDistributionCount.label.push(`${item.toString()}%`);
      });

      setCrashSeverityDistributionData(crashSeverityDistributionCount);
      setYearTrendData(yearTrendCount);
      setMonthAggregateData(monthAggregateCount);

      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  renderReports = (flag) => {
    const { crashSeverityDistributionInfo, yearTrendInfo, monthAggregateInfo } = this.props;
    const { loaded, loading } = this.state;
    if (flag) {
      if (!loaded) {
        return (
          <div>
            <div className="animation-plot">
              <Loading loading={loading} />
              <div ref={this.myRef} />
            </div>
            <Mask className="overlay-mask" onClick={this.closeBottonClick} />
          </div>
        );
      }

      if (loaded) {
        return (
          <div>
            <div className="submit-form-summary card">
              <div className="font-icon-detail pull-right close-button" onClick={this.closeBottonClick}>
                <i className="pe-7s-close" />
              </div>
              { this.renderTitle() }
              <div>
                <CrashSeverity data={crashSeverityDistributionInfo} />
                <YearTrend data={yearTrendInfo} />
              </div>
              <MonthAggregate data={monthAggregateInfo} />
            </div>
            <Mask className="overlay-mask" onClick={this.closeBottonClick} />
          </div>
        );
      }
    }
    return null;
  }

  renderContactForm = () => {
    return (
      <div>
        <div className="submit-form card">
          <div className="font-icon-detail pull-right close-button" onClick={this.closeBottonClick}>
            <i className="pe-7s-close" />
          </div>
          { this.renderTitle() }
          <ContactInfo />
        </div>
        <Mask className="overlay-mask" onClick={this.closeBottonClick} />
      </div>
    );
  }

  renderColorBar = () => {
    const {
      colorbarMinValue, colorbarMaxValue, listOfColors, colorbarTitle,
    } = this.state;
    if (colorbarMinValue && colorbarMaxValue) {
      return getColorBar(listOfColors, colorbarMinValue, colorbarMaxValue, colorbarTitle);
    } return null;
  }

  render() {
    const {
      displayMinModal, displaySummaryReport,
    } = this.state;
    const {
      uiParams, uiParams: { formTitle, defaultUiList }, actions: {
        resetFormAndTitle,
        resetPointSafetyIndexData,
        resetSegmentSafetyIndexData,
        resetAreaSafetyIndexData,
        resetIntersectionSafetyIndexData,
        resetAccidentHeatmapData,
        resetIncidentFrequencyData,
        resetEstimatedCrashMeanData,
        resetSummaryReportData,
      }, title,
    } = this.props;

    // Choose different form, thus, titles are different.
    if (formTitle !== title) {
      resetFormAndTitle(formTitle, defaultUiList);
      resetPointSafetyIndexData();
      resetSegmentSafetyIndexData();
      resetAreaSafetyIndexData();
      resetIntersectionSafetyIndexData();
      resetAccidentHeatmapData();
      resetIncidentFrequencyData();
      resetEstimatedCrashMeanData();
      resetSummaryReportData();
    }

    if (!this.isObjEmpty(uiParams) && !displayMinModal) {
      // if (this.isSummaryReport()) {
      //   return (
      //     <div>
      //       { this.renderSummaryReport() }
      //     </div>
      //   );
      // }
      // if (this.isContactForm()) {
      //   return (
      //     <div>
      //       { this.renderContactForm() }
      //     </div>
      //   );
      // }
      return (
        <div>
          { this.renderMainForm() }
        </div>
      );
    }
    if (displayMinModal) {
      if (displaySummaryReport) {
        return (
          <div>
            { this.renderReports(displaySummaryReport) }
            { this.renderMinModalForm() }
          </div>
        );
      }
      return (
        <div>
          { this.renderLoadingAnimation() }
          { this.renderMinModalForm() }
          { this.renderColorBar() }
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => (
  {
    uiParams: state.FormReducer.uiParams,
    formParams: state.FormReducer.formParams,
    title: state.FormReducer.title,
    crashSeverityDistributionInfo: state.summaryReportReducer.crashSeverityDistributionInfo,
    yearTrendInfo: state.summaryReportReducer.yearTrendInfo,
    monthAggregateInfo: state.summaryReportReducer.monthAggregateInfo,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      ...FormAction,
      ...areaSafetyIndexAction,
      ...intersectionSafetyIndexAction,
      ...pointSafetyIndexAction,
      ...segmentSafetyIndexAction,
      ...accidentHeatmapAction,
      ...incidentFrequencyAction,
      ...estimatedCrashMeanAction,
      ...summaryReportAction,
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
