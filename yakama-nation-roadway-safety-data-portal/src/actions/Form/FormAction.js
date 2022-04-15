import store from '../../config/configureStore';

const FormAction = {
  updateFormParams: (currParams) => {
    const prevParams = store.getState().FormReducer.formParams;
    const formParams = { ...prevParams, ...currParams };
    return {
      type: 'UPDATE_PARAMS',
      payload: {
        formParams,
      },
    };
  },

  resetFormAndTitle: (title, defaultUiList) => ({
    type: 'RESET_FORM_TITLE',
    payload: {
      title,
      defaultUiList,
    },
  }),
  setUiForm: (uiParams) => ({
    type: 'SET_UI_FORM',
    payload: {
      uiParams,
    },
  }),
  resetUiForm: () => ({
    type: 'RESET_UI_FORM',
  }),
};

export default FormAction;
