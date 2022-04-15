const initialState = {
  pointSafetyIndex: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POINT_SAFETY_INDEX':
      const { pointSafetyIndex } = action.payload;
      return { ...state, pointSafetyIndex };
    case 'RESET_POINT_SAFETY_INDEX':
      return { ...state, pointSafetyIndex: [] };
    default:
      return state;
  }
}
