const initialState = {
  areaSafetyIndex: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AREA_SAFETY_INDEX':
      const { areaSafetyIndex } = action.payload;
      return { ...state, areaSafetyIndex };
    case 'RESET_AREA_SAFETY_INDEX':
      return { ...state, areaSafetyIndex: [] };
    default:
      return state;
  }
}
