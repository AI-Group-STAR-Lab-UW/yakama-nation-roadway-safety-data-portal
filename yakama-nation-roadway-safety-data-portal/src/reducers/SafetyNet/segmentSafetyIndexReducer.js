const initialState = {
  segmentSafetyIndex: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SEGMENT_SAFETY_INDEX':
      const { segmentSafetyIndex } = action.payload;
      return { ...state, segmentSafetyIndex };
    case 'RESET_POINT_SAFETY_INDEX':
      return { ...state, segmentSafetyIndex: [] };
    default:
      return state;
  }
}
