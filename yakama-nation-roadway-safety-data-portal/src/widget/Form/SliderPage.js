import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class SliderPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onSliderChange = (value) => {
    const { actions: { updateFormParams }, name } = this.props;
    updateFormParams({ [name]: value });
  }

  render() {
    const { name, formParams, config } = this.props;
    const { min, max, step } = config;
    const value = formParams[name];
    const marks = {
      [min]: min,
      [max]: max,
    };
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">
            {name}
            {' '}
            :
            {' '}
            {value}
          </h4>
          <div className="form-group">
            <Slider
              min={min}
              max={max}
              step={step}
              defaultValue={value}
              onAfterChange={this.onSliderChange}
              marks={marks}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    formParams: state.FormReducer.formParams,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(FormAction, dispatch),
  }
);

SliderPage.propTypes = {
  name: PropTypes.string,
};

SliderPage.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderPage);
