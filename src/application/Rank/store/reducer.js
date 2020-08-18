import { fromJS } from "immutable";
import { CHANGE_LOADING,CHANGE_RANK_LIST} from "./constants";

const defaultState = fromJS({
  rankList: [],
  loading: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", action.data);
    case CHANGE_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};
