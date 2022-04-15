const FormParamsConstants = {};

FormParamsConstants.SummaryReport = {
  formTitle: 'Summary Report',
  buttons: ['Show the Summary Report'],
  uiList: [
    {
      name: 'Year(s)',
      type: 'MULTI_SELECT_PICKER',
      value: {
        options: [{ label: '2013', value: '2013' },
          { label: '2014', value: '2014' },
          { label: '2015', value: '2015' },
          { label: '2016', value: '2016' },
          { label: '2017', value: '2017' },
        ],
        defaultOption: [
          { label: '2014', value: '2014' },
          { label: '2015', value: '2015' },
          { label: '2016', value: '2016' },
          { label: '2017', value: '2017' },
        ],
      },
    },
    // {
    //   name: 'Severity',
    //   type: 'MULTI_SELECT_PICKER',
    //   value: {
    //     options: [{ label: 'Property Damage Only', value: 'Property Damage Only' },
    //       { label: 'Injury', value: 'Injury' },
    //       { label: 'Fatal', value: 'Fatal' }],
    //     defaultOption: [{ label: 'Property Damage Only', value: 'Property Damage Only' }],
    //   },
    // },
    // {
    //   name: 'Report',
    //   type: 'MULTI_SELECT_PICKER',
    //   value: {
    //     options: [{ label: 'Crash Severity Distribution', value: 'Crash Severity Distribution' },
    //       { label: 'Year Trend Chart', value: 'Year Trend Chart' },
    //       { label: 'Month Aggregate Chart', value: 'Month Aggregate Chart' }],
    //     defaultOption: [{ label: 'Crash Severity Distribution', value: 'Crash Severity Distribution' }],
    //   },
    // },
  ],
  defaultUiList: {
    'Year(s)': ['2013', '2014', '2015', '2016', '2017'],
    // Severity: ['Property Damage Only', 'Injury', 'Fatal'],
    // Report: ['Crash Severity Distribution', 'Year Trend Chart', 'Month Aggregate Chart'],
  },
};

export default FormParamsConstants;
