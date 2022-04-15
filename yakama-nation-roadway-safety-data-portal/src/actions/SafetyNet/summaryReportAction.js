const summaryReportAction = {
  resetSummaryReportData: () => ({
    type: 'RESET_SUMMARY_REPORT',
  }),
  setCrashSeverityDistributionData: (crashSeverityDistributionCount) => ({
    type: 'SET_CRASH_SEVERITY_DISTRIBUTION',
    payload: {
      crashSeverityDistributionInfo: crashSeverityDistributionCount,
    },
  }),
  setYearTrendData: (yearTrendCount) => ({
    type: 'SET_YEAR_TREND',
    payload: {
      yearTrendInfo: yearTrendCount,
    },
  }),
  setMonthAggregateData: (monthAggregateCount) => ({
    type: 'SET_MONTH_AGGREGATE',
    payload: {
      monthAggregateInfo: monthAggregateCount,
    },
  }),
};

export default summaryReportAction;
