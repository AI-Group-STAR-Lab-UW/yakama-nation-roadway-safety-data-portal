import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chart from 'react-chartist';
import FormAction from '../../../actions/Form/FormAction';

class MonthAggregate extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      data: {
        labels: this.props.data.xAxis,
        series: [
          this.props.data.propertyDamageCount,
          this.props.data.fatalCount,
          this.props.data.injuryCount,
        ],
      },
      options: {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false,
        },
        height: '20vh',
      },
      responsiveOptions: [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc(value) {
              return value[0];
            },
          },
        }],
      ],
    };
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ textAlign: 'center' }}>Month Aggregate</h4>
            <p className="category" style={{ textAlign: 'center' }}>{this.props.data.minYear}-{this.props.data.maxYear} Yakima County Crash Counts By Severity And Month</p>
            <Chart data={this.state.data} options={this.state.options} responsiveOptions={this.state.responsiveOptions} type="Bar" className="ct-chart" />
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

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(FormAction, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(MonthAggregate);
