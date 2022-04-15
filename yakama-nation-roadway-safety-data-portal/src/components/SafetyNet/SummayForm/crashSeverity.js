import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChartistGraph from 'react-chartist';
// import FormAction from '../../../actions/Form/FormAction';

class CrashSeverity extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataPreferences: {
        labels: this.props.data.label,
        series: this.props.data.percentage,
      },
      optionsPreferences: {
        donut: false,
        donutWidth: 40,
        startAngle: 0,
        total: 100,
        showLabel: true,
        axisX: {
          showGrid: false,
          offset: 0,
        },
        axisY: {
          offset: 0,
        },
      },
      chartType: 'Pie',
    };
  }

  render() {
    return (
      <div className="col-md-5">
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ textAlign: 'center' }}>Crash Severity</h4>
            <p className="category" style={{ textAlign: 'center' }}>{this.props.data.minYear}-{this.props.data.maxYear} Yakima County Crash Severity Distribution</p>
            <ChartistGraph data={this.state.dataPreferences} options={this.state.optionsPreferences} type={this.state.chartType} className="ct-chart ct-perfect-fourth" />
          </div>
          <div className="footer">
            <div className="legend">
              <div className="item">
                <i className="fa fa-circle text-info" /> Property Damage Only
              </div>
              <div className="item">
                <i className="fa fa-circle text-warning" /> Injury
              </div>
              <div className="item">
                <i className="fa fa-circle text-danger" /> Fatal
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(CrashSeverity);
