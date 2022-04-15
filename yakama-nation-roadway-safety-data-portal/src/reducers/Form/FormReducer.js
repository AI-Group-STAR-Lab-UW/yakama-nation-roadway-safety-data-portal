// import store here and pass state=store.getState().WSDOTRealTimeDataFormReducer.
const initialState = {
  uiParams: {},
  formParams: {},
  title: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARAMS':
      const { formParams } = action.payload;
      return { ...state, formParams };
    case 'RESET_FORM_TITLE':
      const { title, defaultUiList } = action.payload;
      return {
        ...state,
        formParams: defaultUiList,
        title,
      };
    case 'SET_UI_FORM':
      const { uiParams } = action.payload;
      return { ...state, uiParams };
    case 'RESET_UI_FORM':
      return { ...state, uiParams: {} };
    default:
      return state;
  }
}
