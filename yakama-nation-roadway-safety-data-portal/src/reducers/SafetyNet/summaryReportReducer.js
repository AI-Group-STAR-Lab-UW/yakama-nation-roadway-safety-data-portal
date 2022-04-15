const initialState = {
  crashSeverityDistributionInfo: [],
  yearTrendInfo: [],
  monthAggregateInfo: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CRASH_SEVERITY_DISTRIBUTION':
      const { crashSeverityDistributionInfo } = action.payload;
      return { ...state, crashSeverityDistributionInfo };
    case 'SET_YEAR_TREND':
      const { yearTrendInfo } = action.payload;
      return { ...state, yearTrendInfo };
    case 'SET_MONTH_AGGREGATE':
      const { monthAggregateInfo } = action.payload;
      return { ...state, monthAggregateInfo };
    case 'RESET_SUMMARY_REPORT':
      return {
        ...state, crashSeverityDistributionInfo: [], yearTrendInfo: [], monthAggregateInfo: [],
      };
    default:
      return state;
  }
}
