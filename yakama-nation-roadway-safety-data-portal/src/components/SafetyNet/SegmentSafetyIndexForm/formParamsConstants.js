const FormParamsConstants = {};

FormParamsConstants.SegmentSafetyIndex = {
  formTitle: 'Segment Based Safety Index',
  buttons: ['Show the result'],
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
    {
      name: 'Month(s)',
      type: 'MULTI_SELECT_PICKER',
      value: {
        options: [{ label: 'January', value: 'January' },
          { label: 'February', value: 'February' },
          { label: 'March', value: 'March' },
          { label: 'April', value: 'April' },
          { label: 'May', value: 'May' },
          { label: 'June', value: 'June' },
          { label: 'July', value: 'July' },
          { label: 'August', value: 'August' },
          { label: 'September', value: 'September' },
          { label: 'October', value: 'October' },
          { label: 'November', value: 'November' },
          { label: 'December', value: 'December' }],
        defaultOption: [{ label: 'January', value: 'January' },
          { label: 'February', value: 'February' },
          { label: 'March', value: 'March' },
          { label: 'April', value: 'April' },
          { label: 'May', value: 'May' },
          { label: 'June', value: 'June' },
          { label: 'July', value: 'July' },
          { label: 'August', value: 'August' },
          { label: 'September', value: 'September' },
          { label: 'October', value: 'October' },
          { label: 'November', value: 'November' },
          { label: 'December', value: 'December' },
        ],
      },
    },
    {
      name: 'Weekday(s)',
      type: 'MULTI_SELECT_PICKER',
      value: {
        options: [{ label: 'Monday', value: 'Monday' },
          { label: 'Tuesday', value: 'Tuesday' },
          { label: 'Wednesday', value: 'Wednesday' },
          { label: 'Thursday', value: 'Thursday' },
          { label: 'Friday', value: 'Friday' },
          { label: 'Saturday', value: 'Saturday' },
          { label: 'Sunday', value: 'Sunday' }],
        defaultOption: [{ label: 'Monday', value: 'Monday' },
          { label: 'Tuesday', value: 'Tuesday' },
          { label: 'Wednesday', value: 'Wednesday' },
          { label: 'Thursday', value: 'Thursday' },
          { label: 'Friday', value: 'Friday' },
          { label: 'Saturday', value: 'Saturday' },
          { label: 'Sunday', value: 'Sunday' }],
      },
    },
    {
      name: 'Roadway Class',
      type: 'MULTI_SELECT_PICKER',
      value: {
        options: [{ label: '(01) Urban Freeways', value: '(01) Urban Freeways' },
          { label: '(02) Urban Freeways < 4 Ln', value: '(02) Urban Freeways < 4 Ln' },
          { label: '(03) Urban 2 Lane Roads', value: '(03) Urban 2 Lane Roads' },
          { label: '(04) Urban Multilane Divided Non Freeways', value: '(04) Urban Multilane Divided Non Freeways' },
          { label: '(05) Urban Multilane Undivided Non Freeways', value: '(05) Urban Multilane Undivided Non Freeways' },
          { label: '(06) Rural Freeways', value: '(06) Rural Freeways' },
          { label: '(07) Rural Freeways < 4 Ln', value: '(07) Rural Freeways < 4 Ln' },
          { label: '(08) Rural 2 Lane Roads', value: '(08) Rural 2 Lane Roads' },
          { label: '(09) Rural Multilane Divided Non Freeways', value: '(09) Rural Multilane Divided Non Freeways' },
          { label: '(10) Rural Multilane Undivided Non Freeways', value: '(10) Rural Multilane Undivided Non Freeways' },
          { label: '(99) Others', value: '(99) Others' }],
        defaultOption: [{ label: '(04) Urban Multilane Divided Non Freeways', value: '(04) Urban Multilane Divided Non Freeways' }],
      },
    },
    {
      name: 'Severity',
      type: 'MULTI_SELECT_PICKER',
      value: {
        options: [{ label: '(0) Not Stated', value: '(0) Not Stated' },
          { label: '(1) No Injury', value: '(1) No Injury' },
          { label: '(2) Dead At Scene', value: '(2) Dead At Scene' },
          { label: '(3) Dead On Arrival', value: '(3) Dead On Arrival' },
          { label: '(4) Died At Hospital', value: '(4) Died At Hospital' },
          { label: '(5) Disabling Injury', value: '(5) Disabling Injury' },
          { label: '(6) Non-Disabling/Inj', value: '(6) Non-Disabling/Inj' },
          { label: '(7) Possible Injury', value: '(7) Possible Injury' },
          { label: '(8) Non-Traffic Injury', value: '(8) Non-Traffic Injury' },
          { label: '(9) Non-Traffic Fatality', value: '(9) Non-Traffic Fatality' }],
        defaultOption: [{ label: '(7) Possible Injury', value: '(7) Possible Injury' }],
      },
    },
  ],
  defaultUiList: {
    'Year(s)': ['2013', '2014', '2015', '2016', '2017'],
    'Month(s)': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'Weekday(s)': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'Roadway Class': ['(01) Urban Freeways', '(02) Urban Freeways < 4 Ln', '(03) Urban 2 Lane Roads', '(04) Urban Multilane Divided Non Freeways', '(05) Urban Multilane Undivided Non Freeways', '(06) Rural Freeways', '(07) Rural Freeways < 4 Ln', '(08) Rural 2 Lane Roads', '(09) Rural Multilane Divided Non Freeways', '(10) Rural Multilane Undivided Non Freeways', '(99) Others'],
    Severity: ['(1) No Injury', '(2) Dead At Scene', '(3) Dead On Arrival', '(4) Died At Hospital', '(5) Disabling Injury', '(6) Non-Disabling/Inj', '(7) Possible Injury', '(8) Non-Traffic Injury', '(9) Non-Traffic Fatality'],
  },
};

export default FormParamsConstants;