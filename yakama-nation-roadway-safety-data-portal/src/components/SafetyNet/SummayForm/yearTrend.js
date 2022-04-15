import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import FormAction from '../../../actions/Form/FormAction';

class YearTrend extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataSales: {
        labels: this.props.data.xAxis,
        series: [
          this.props.data.propertyDamageCount,
          this.props.data.fatalCount,
          this.props.data.injuryCount,
        ],
      },
      optionsSales: {
        low: 0,
        high: 650,
        showArea: true,
        height: '25vh',
        fullWidth: true,
        chartPadding: {
          right: 35,
        },
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 5,
        }),
        showLine: false,
        showPoint: false,
      },
      responsiveSales: [
        ['screen and (max-width: 440px)', {
          axisX: {
            labelInterpolationFnc(value) {
              return value[0];
            },
          },
        }],
      ],
    };
  }

  getYearTrendData = async () => {
    // const propertyDamageInfo = {
    //   params: {
    //     'Year(s)': this.state.years,
    //     'Month(s)': this.state.months,
    //     'Weekday(s)': this.state.weekdays,
    //     'Roadway Class': this.state.roadClasses,
    //     Severity: this.state.propertyDamage,
    //   },
    // };
    //
    // const data = await getAccidentPointData(propertyDamageInfo);
    // console.log(data[0]);
    // const recordForPropertyDamage = [];
    // const recordForInjury = [];
    // const recordForfatal = [];
    // const propertyDamageInfo = {
    //   params: {
    //     'Year(s)': [this.state.years[4]],
    //     'Month(s)': this.state.months,
    //     'Weekday(s)': this.state.weekdays,
    //     'Roadway Class': this.state.roadClasses,
    //     Severity: this.state.fatal,
    //   },
    // };
    //
    // const propertyDamageData = await getAccidentPointData(propertyDamageInfo);
    // console.log(propertyDamageData.length);
    //
    // const injuryInfo = {
    //   params: {
    //     'Year(s)': this.state.years,
    //     'Month(s)': this.state.months,
    //     'Weekday(s)': this.state.weekdays,
    //     'Roadway Class': this.state.roadClasses,
    //     Severity: this.state.injury,
    //   },
    // };
    //
    // const fatalInfo = {
    //   params: {
    //     'Year(s)': this.state.years,
    //     'Month(s)': [this.state.months[11]],
    //     'Weekday(s)': this.state.weekdays,
    //     'Roadway Class': this.state.roadClasses,
    //     Severity: this.state.injury,
    //   },
    // };
    //
    // // const injuryData = await getAccidentPointData(injuryInfo);
    // const fatalData = await getAccidentPointData(fatalInfo);
    //
    // // console.log(recordForPropertyDamage);
    // // console.log(injuryData.length);
    // console.log(fatalData.length);

    // recordForPropertyDamage.push(propertyDamageData.length);
    // recordForInjury.push(injuryData.length);
    // recordForfatal.push(fatalData.length);
    //
    //
    // const yearTrendData = {
    //   labels: ['2013', '2014', '2015', '2016', '2017'],
    //   series: [
    //     recordForPropertyDamage,
    //     recordForInjury,
    //     recordForfatal,
    //   ],
    // };
    // console.log(recordForPropertyDamage);
    // console.log(recordForInjury);
    // console.log(recordForfatal);
    // this.setState({ dataSales: yearTrendData });
  }

  render() {
    // if (this.state.dataSales.labels.length !== 0) {
    //   this.getYearTrendData();
    // }

    return (
      <div className="col-md-7">
        <div className="card shadow-small">
          <div className="header">
            <h4 className="title" style={{ textAlign: 'center' }}>Year Trend</h4>
            <p className="category" style={{ textAlign: 'center' }}>{this.props.data.minYear}-{this.props.data.maxYear} Yakima County Crash Counts By Severity And Year</p>
            <ChartistGraph data={this.state.dataSales} options={this.state.optionsSales} responsiveOptions={this.state.responsiveSales} type="Line" className="ct-chart" />
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

export default connect(null, mapDispatchToProps)(YearTrend);
