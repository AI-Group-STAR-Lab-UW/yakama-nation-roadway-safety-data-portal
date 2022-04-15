const estimatedCrashMeanAction = {
  setRoutesAndColors: (listOfCoordinatesAndColor) => ({
    type: 'SET_ESTIMATED_CRASH_MEAN_INFO',
    payload: {
      estimatedCrashMeanInfo: listOfCoordinatesAndColor,
    },
  }),
  resetEstimatedCrashMeanData: () => ({
    type: 'RESET_ESTIMATED_CRASH_MEAN',
  }),
};

export default estimatedCrashMeanAction;
