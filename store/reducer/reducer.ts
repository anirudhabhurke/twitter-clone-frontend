import { CoreActions, SOME_ACTION } from '../types';

const initialState = {
      setCount: 4,
};

const reducer = (state = initialState, action: CoreActions) => {
      if (action.type === SOME_ACTION) {
            return {
                  ...state,
                  setCount: action.value,
            };
      }
      return state;
};

export default reducer;
