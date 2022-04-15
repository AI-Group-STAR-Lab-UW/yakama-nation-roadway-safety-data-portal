import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FormAction from '../../actions/Form/FormAction';

class MultiSelectPicker extends Component {
  constructor() {
    super();
    this.allOption = {
      label: 'Select all',
      value: 'Select all',
    };
  }

  onSelectedChange = (selectOptions) => {
    const { dropdownOptions } = this.props;
    const { options } = dropdownOptions;
    const { actions: { updateFormParams }, name } = this.props;
    const selectedValue = [];

    if (!selectOptions || selectOptions.length === 0) {
      updateFormParams({ [name]: null });
    } else if (selectOptions[selectOptions.length - 1].value === 'Select all') {
      options.forEach((option) => {
        selectedValue.push(option.value);
      });
      updateFormParams({ [name]: selectedValue });
    } else if (selectOptions !== null && selectOptions.length > 0) {
      selectOptions.forEach((selectOption) => {
        selectedValue.push(selectOption.value);
      });
      updateFormParams({ [name]: selectedValue });
    }
  }

  render() {
    const { dropdownOptions: { options } } = this.props;
    const { name, formParams } = this.props;
    const selectedValues = (formParams[name]) ? formParams[name].map((value) => ({ label: value, value })) : '';

    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 text-center">
          <h4 className="title">Select {name}</h4>
          <div className="form-group">
            <Select
              isMulti
              options={[this.allOption, ...options]}
              onChange={this.onSelectedChange}
              value={selectedValues}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
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

MultiSelectPicker.propTypes = {
  name: PropTypes.string,
};

MultiSelectPicker.defaultProps = {
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectPicker);
