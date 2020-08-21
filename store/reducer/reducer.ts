interface storeState {
      token: string | undefined;
      userId: number | undefined;
}

const initialState: storeState = {
      token: undefined,
      userId: undefined,
};

const reducer = (state = initialState, action: any) => {
      if (action.type === 'SET_TOKEN') {
            return {
                  ...state,
                  token: action.token,
                  userId: action.userId,
            };
      } else if (action.type === 'REMOVE_TOKEN') {
            return {
                  ...state,
                  token: undefined,
                  userId: undefined,
            };
      } else {
            return state;
      }
};

export default reducer;
