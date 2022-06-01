import { REQUEST_STATE } from "../../constrants";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  subscriptionsList: [],
};

export const subscriptionsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const subscriptionsReducer = (state, action) => {
  switch (action.type) {
    case subscriptionsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case subscriptionsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        subscriptionsList: action.payload.subscriptions,
      };
    default:
      throw new Error();
  }
}
