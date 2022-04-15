import React, { Component, createRef } from 'react';
import {
  Map, TileLayer, Polyline, Popup, FeatureGroup, GeoJSON, Marker,
} from 'react-leaflet';
import L from 'leaflet';
import { bindActionCreators } from 'redux';
import '../../assets/styles/map.css';
import { connect } from 'react-redux';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { v4 as uuidv4 } from 'uuid';
import ChartistGraph from 'react-chartist';
import Pins from '../../widget/Map/MarkerCluster/Pins';
import {
  getIntersectionAccidentData,
  getTopkDangerousIntersectionData,
} from '../../utils/accidentHSISAPI';
import accidentHeatmapAction from '../../actions/SafetyNet/accidentHeatmapAction';

class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.groupRef = createRef();
    this.state = {
      center: [46.601486, -120.509810],
      zoom: 13,
      bkLayer: [
        {
          name: 'Default Map',
          layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          bkUrl: require('../../assets/images/color_map.png'),
          color: '#5e5e5e',
        },
        {
          name: 'Grayscale Map',
          layer: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
          bkUrl: require('../../assets/images/grayscale_map.png'),
          color: '#5e5e5e',
        },
      ],
      bkSelection: 0,
      displayMinModal: false,
      minModalLabel: ['Property Damage Only', 'Injury Accident', 'Fatal Accident'],
      minModalData: [0, 0, 0],
      minModalMinValue: 0,
      minModalMaxValue: 10,
      currentZipcode: null,
      stopGroupBoundZoom: false,
      topkIntersection: [],
      intersectionLocations: [],
    };
  }
  // Grayscale map: https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png

  componentDidUpdate() {
    this.setMapViewBound();
  }

  setMapViewBound() {
    if (this.groupRef.current != null && !this.state.stopGroupBoundZoom) {
      const mapInst = this.mapRef.current.leafletElement;
      const group = this.groupRef.current.leafletElement;
      const bound = group.getBounds();
      if (bound.isValid()) {
        mapInst.fitBounds(group.getBounds());
      }
    }
  }

  renderPointSafetyIndex() {
    const { uiParams: { formTitle }, pointSafetyIndex } = this.props;
    if (formTitle === 'Point Based Crash Visualization') {
      const points = [];
      for (let i = 0; i < pointSafetyIndex.length; i++) {
        points.push(pointSafetyIndex[i]);
      }
      return (
        <Pins pins={points} />
      );
    }
    return null;
  }

  renderIntersectionMarker() {
    const { intersectionLocations } = this.state;
    const getIcon = (_iconSize) => {
      return L.icon({
        iconUrl: require('../../assets/images/intersection_icon.png'),
        iconSize: _iconSize,
      });
    };

    if (intersectionLocations[0]) {
      intersectionLocations[0] = Array.from(intersectionLocations[0]);
      intersectionLocations[1] = Array.from(intersectionLocations[1]);
      intersectionLocations[2] = Array.from(intersectionLocations[2]);
      return intersectionLocations[0].map((element, index) => {
        const lat = intersectionLocations[0][index];
        const lon = intersectionLocations[1][index];
        const rawAddress = eval(intersectionLocations[2][index]);
        let address = rawAddress[0];
        for (let i = 1; i < rawAddress.length; i++) {
          if (i === 1) {
            address += ` at ${rawAddress[i]}`;
          } else {
            address += ` and ${rawAddress[i]}`;
          }
        }
        const totlAccidentNum = intersectionLocations[3][intersectionLocations[2][index]];

        return (
          <Marker position={[lat, lon]} icon={getIcon(15)}>
            <Popup>
              <span className="pop-up">
                <p style={{
                  fontSize: '18px', textAlign: 'center', margin: '0px', borderBottom: '2px solid black',
                }}
                >Intersection
                </p>
                {address}
                <br />
                <p style={{
                  textAlign: 'center', margin: '0px',
                }}
                >
                  * Total Number of Accidents: {totlAccidentNum} *
                </p>
              </span>
            </Popup>
          </Marker>
        );
      });
    }
    return null;
  }

  renderSegmentSafetyIndex() {
    const { segmentSafetyIndex } = this.props;
    return segmentSafetyIndex.map((segment) => {
      let weight = '2';
      let opacity = '0.3';
      if (segment.count !== 0) {
        weight = '5';
        opacity = '1';
      }
      console.log(weight);
      return (
        <Polyline color={segment.color} positions={segment.coordinates} weight={5} opacity={opacity}>
          <Popup>
            <span className="pop-up">
              Route:
              {' '}
              { segment.stateroute }
              <br />
              Begin milepost:
              {' '}
              { segment.barm }
              <br />
              End milepost:
              {' '}
              { segment.earm }
              <br />
              Number of Accidents:
              {' '}
              { segment.count }
            </span>
          </Popup>
        </Polyline>
      );
    });
  }

  renderAreaSafetyIndex() {
    const { areaSafetyIndex } = this.props;
    return areaSafetyIndex.map((polygon) => (
      <GeoJSON data={polygon} color={polygon.color} fillOpacity={0.6} key={uuidv4()}>
        <Popup>
          <span className="pop-up">
            Zipcode :
            {' '}
            {polygon.name}
            {' '}
            <br />
            Number of Accidents :
            {' '}
            {polygon.count}
          </span>
        </Popup>
      </GeoJSON>
    ));
  }

  renderIntersectionSafetyIndex() {
    const { intersectionAreaSafetyIndex } = this.props;
    const { actions: { setAccidentHeatmapData } } = this.props;

    const zoomToFeature = async (e) => {
      this.setState({ stopGroupBoundZoom: true });
      const { topkIntersection } = this.state;

      if (topkIntersection.length === 0) {
        const requestInfoForKIntersection = { params: { k: '5' } };

        const intersectionData = await getTopkDangerousIntersectionData(requestInfoForKIntersection);
        this.setState({ topkIntersection: intersectionData });
      }

      const mapInst = this.mapRef.current.leafletElement;
      mapInst.fitBounds(e.target.getBounds());

      this.setState({ displayMinModal: true });
      const requestInfo = {
        params: {
          Zipcode: e.target.options.data.name,
        },
      };

      const intersectionAccidentsData = await getIntersectionAccidentData(requestInfo);

      const requestInfoGetTopK = {
        params: {
          k: '5',
        },
      };

      const topkDangerousIntersectionData = await getTopkDangerousIntersectionData(requestInfoGetTopK);
      this.setState({ topkIntersection: topkDangerousIntersectionData });

      const count = [0, 0, 0];
      const intersectionLocations = [new Set(), new Set(), new Set(), {}];
      console.log(intersectionAccidentsData);
      intersectionAccidentsData.forEach((data) => {
        intersectionLocations[0].add(data.LATITUDE);
        intersectionLocations[1].add(data.LONGITUDE);
        intersectionLocations[2].add(data.intersection_name);

        if (data.intersection_name in intersectionLocations[3]) {
          intersectionLocations[3][data.intersection_name] += 1;
        } else {
          intersectionLocations[3][data.intersection_name] = 1;
        }

        // According to https://www.hsisinfo.org/pdf/guidebook_WA.pdf
        if (data.REPORT === '1') {
          count[0] += 1;
        } else if (data.REPORT === '2') {
          count[1] += 1;
        } else if (data.REPORT === '3') {
          count[2] += 1;
        }
      });
      this.setState({ intersectionLocations });
      this.setState({ currentZipcode: e.target.options.data.name });
      this.setState({ minModalMaxValue: Math.max.apply(null, count) });
      this.setState({ minModalData: count });
      setAccidentHeatmapData(intersectionAccidentsData);
    };

    return intersectionAreaSafetyIndex.map((polygon) => (
      <GeoJSON
        onClick={zoomToFeature}
        data={polygon}
        color={polygon.color}
        fillOpacity={0.3}
        key={uuidv4()}
      />
    ));
  }

  renderAccidentHeatmap() {
    const zoomToFeature = () => {
      console.log('hello world');
    };

    const { accidentHeatmapIndex, uiParams: { formTitle } } = this.props;
    if (formTitle === 'Intersection Safety Index Visualization') {
      return (
        <HeatmapLayer
          points={accidentHeatmapIndex}
          longitudeExtractor={(m) => m.LONGITUDE}
          latitudeExtractor={(m) => m.LATITUDE}
          intensityExtractor={() => 1}
          radius={20}
          minOpacity={1}
          blur={10}
          onClick={zoomToFeature}
        />
      );
    }
    return (
      <HeatmapLayer
        points={accidentHeatmapIndex}
        longitudeExtractor={(m) => m.LONGITUDE}
        latitudeExtractor={(m) => m.LATITUDE}
        intensityExtractor={() => 1}
        radius={50}
        minOpacity={0.5}
        blur={35}
      />
    );
  }

  renderIncidentFrequency() {
    const { incidentFrequencyInfo } = this.props;
    return incidentFrequencyInfo.map((incidentFreqInfo) => (
      <Polyline color={incidentFreqInfo.color} positions={incidentFreqInfo.coordinates} weight="4" key={uuidv4()}>
        <Popup>
          <span className="pop-up">
            { incidentFreqInfo.safetyLevel }
            {' '}
            <br />
          </span>
        </Popup>
      </Polyline>
    ));
  }

  renderEstimatedCrashMean() {
    const { estimatedCrashMeanInfo } = this.props;
    return estimatedCrashMeanInfo.map((crashMeanInfo) => (
      <Polyline color={crashMeanInfo.color} positions={crashMeanInfo.coordinates} weight="4" key={uuidv4()}>
        <Popup>
          <span className="pop-up">
            { crashMeanInfo.safetyLevel }
            {' '}
            <br />
          </span>
        </Popup>
      </Polyline>
    ));
  }

  renderMinModalForm = () => {
    const {
      minModalData, minModalMinValue, minModalMaxValue, minModalLabel, currentZipcode, topkIntersection,
    } = this.state;
    const options = {
      high: minModalMaxValue,
      low: minModalMinValue,
    };
    const data = {
      labels: minModalLabel,
      series: [minModalData],
    };
    const k = topkIntersection.length;
    const intersections = [];
    topkIntersection.forEach((item, index) => {
      const roadNames = eval(item.intersection_name);
      const numOfRoads = roadNames.length;

      let result = roadNames[0];
      for (let i = 1; i < numOfRoads; i++) {
        if (i === 1) {
          result += ` at ${roadNames[i]}`;
        } else {
          result += ` and ${roadNames[i]}`;
        }
      }

      intersections.push(<p style={{ margin: '5px', fontWeight: '400' }}>{index + 1}. {result} (@ {item.postcode})</p>);
    });

    return (
      <div className="min-submit-form-2 transparency shadow card">
        <div className="header">
          <h3 style={{ textAlign: 'center', margin: '0px' }}>Number of Crashes by Severity Level</h3>
        </div>
        <h4 style={{
          fontSize: '18px', textAlign: 'center', margin: '0px', fontWeight: '400',
        }}
        >Zip Code: {currentZipcode}
        </h4>
        <ChartistGraph data={data} options={options} type="Bar" />
        <br />
        <div className="header">
          <h3 style={{ textAlign: 'center', margin: '0px' }}>Top {k} Dangerous Intersection(s)</h3>
        </div>
        {intersections}
      </div>
    );
  }

  render() {
    const {
      center, zoom, displayMinModal, stopGroupBoundZoom, intersectionLocations,
    } = this.state;
    const { uiParams: { formTitle } } = this.props;
    if (formTitle !== 'Intersection Safety Index Visualization') {
      if (displayMinModal) {
        this.setState({ displayMinModal: false });
      }
      if (stopGroupBoundZoom) {
        this.setState({ stopGroupBoundZoom: false });
      }
      if (intersectionLocations[0]) {
        this.setState({ intersectionLocations: [] });
      }
    }
    return (
      <div>
        <Map
          ref={this.mapRef}
          className="map"
          scrollWheelZoom
          center={center}
          zoom={zoom}
        >
          <button
            onClick={() => this.setState((prev) => ({ bkSelection: (prev.bkSelection + 1) % 2 }))}
            className="select-layer-type shadow"
            style={{
              background: `url(${this.state.bkLayer[(this.state.bkSelection + 1) % 2].bkUrl})`, color: `${this.state.bkLayer[(this.state.bkSelection + 1) % 2].color}`,
            }}
          >{this.state.bkLayer[(this.state.bkSelection + 1) % 2].name}
          </button>
          {/* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png    https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" */}
          <TileLayer
            url={this.state.bkLayer[this.state.bkSelection].layer}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup ref={this.groupRef}>
            { this.renderPointSafetyIndex() }
            { this.renderSegmentSafetyIndex() }
            { this.renderAreaSafetyIndex() }
            { this.renderIntersectionSafetyIndex() }
            { this.renderIncidentFrequency() }
            { this.renderEstimatedCrashMean() }
          </FeatureGroup>
          { this.renderAccidentHeatmap() }
          { this.renderIntersectionMarker() }
        </Map>

        { displayMinModal ? this.renderMinModalForm() : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    uiParams: state.FormReducer.uiParams,
    pointSafetyIndex: state.pointSafetyIndexReducer.pointSafetyIndex,
    segmentSafetyIndex: state.segmentSafetyIndexReducer.segmentSafetyIndex,
    areaSafetyIndex: state.areaSafetyIndexReducer.areaSafetyIndex,
    intersectionAreaSafetyIndex: state.intersectionSafetyIndexReducer.intersectionAreaSafetyIndex,
    accidentHeatmapIndex: state.accidentHeatmapReducer.accidentHeatmapIndex,
    incidentFrequencyInfo: state.incidentFrequencyReducer.incidentFrequencyInfo,
    estimatedCrashMeanInfo: state.estimatedCrashMeanReducer.estimatedCrashMeanInfo,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      ...accidentHeatmapAction,
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
