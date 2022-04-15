import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PointSafetyForm from './PointSafetyIndexForm/index';
import SegmentSafetyForm from './SegmentSafetyIndexForm/index';
import AreaSafetyIndexForm from './AreaSafetyIndexForm/index';
import IntersectionSafetyIndexForm from './IntersectionSafetyIndexForm/index';
import HeatmapForm from './HeatmapForm/index';
import IncidentFrequencyForm from './IncidentFrequencyForm/index';
import CrashDataDownloadForm from './CrashDataDownloadForm/index';
import SummayForm from './SummayForm/index';
import ContactForm from './ContactForm/index';
import Header from '../Main/Header';
import SideBar from '../SideBar';
/**
 * Pages
 */
import LeafletMap from '../Map';
import '../../assets/styles/form.css';

export default class SafetyNet extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <SideBar />
        <div className="main-panel">
          <Header />
          <div className="leaflet-style">
            <LeafletMap />
          </div>
          <div className="content">
            <div className="container-fluid">
              <Route path="/applications/point-safety-index" component={PointSafetyForm} />
              <Route path="/applications/segment-safety-index" component={SegmentSafetyForm} />
              <Route path="/applications/zipcode-safety-index/" component={AreaSafetyIndexForm} />
              <Route path="/applications/intersection-safety-index/" component={IntersectionSafetyIndexForm} />
              <Route path="/applications/accident-heatmap" component={HeatmapForm} />
              <Route path="/applications/incident-frequency" component={IncidentFrequencyForm} />
              <Route path="/applications/crash-data-download" component={CrashDataDownloadForm} />
              <Route path="/applications/summary-report" component={SummayForm} />
              <Route path="/applications/contact" component={ContactForm} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
