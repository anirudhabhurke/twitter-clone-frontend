const initialState = {
      token: undefined,
};

const reducer = (state = initialState, action: any) => {
      if (action.type === 'SET_TOKEN') {
            return {
                  ...state,
                  token: action.value,
            };
      } else if (action.type === 'REMOVE_TOKEN') {
            return {
                  ...state,
                  token: undefined,
            };
      } else {
            return state;
      }
};

export default reducer;
