import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

// import { WA_COUNTIES_WITH_PARK, WA_CITIES_WITH_PARK } from '../../assets/data/WA_COUNTY_BOUNDARIES';

class SelectPicker extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onSelectedChange = (value) => {
    const selectedValue = value.value;
    const { actions: { updateFormParams }, name } = this.props;
    updateFormParams({ [name]: selectedValue });
  }

  isDisable() {
    const { formParams, name } = this.props;
    if (formParams.Incident === false && (name === 'Closure by Incident' || name === 'Incident Type')) {
      return true;
    }
    if (formParams.Weather === false && (name === 'Precipitation Type' || name === 'Intensity')) {
      return true;
    }
    if (formParams['Select Filter Option'] === 'Select All' && name === 'Select County, City, or approximate number of spaces') {
      return true;
    }
    return false;
  }

  render() {
    const { name, formParams, dropdownOptions } = this.props;
    const { options } = dropdownOptions;
    const value = formParams[name];
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">{name}</h4>
          <div className="form-group">
            <Dropdown
              options={options}
              onChange={this.onSelectedChange}
              value={value}
              placeholder="Select an option"
              disabled={this.isDisable()}
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

SelectPicker.propTypes = {
  name: PropTypes.string,
};

SelectPicker.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPicker);
