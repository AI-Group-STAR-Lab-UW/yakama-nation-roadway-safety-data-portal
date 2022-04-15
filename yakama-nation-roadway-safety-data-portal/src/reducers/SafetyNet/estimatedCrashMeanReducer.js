const initialState = {
  estimatedCrashMeanInfo: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ESTIMATED_CRASH_MEAN_INFO':
      const { estimatedCrashMeanInfo } = action.payload;
      return { ...state, estimatedCrashMeanInfo };
    case 'RESET_ESTIMATED_CRASH_MEAN':
      return { ...state, estimatedCrashMeanInfo: [] };
    default:
      return state;
  }
}
