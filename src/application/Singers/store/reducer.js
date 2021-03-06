import { fromJS } from "immutable";
import {
  CHANGE_ENTER_LOADING,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_SINGER_LIST
} from "./constants";

const defaultState = fromJS({
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0, //这里是当前页数，我们即将实现分页功能
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SINGER_LIST:
      return state.set("singerList", action.data);
    case CHANGE_PAGE_COUNT:
      return state.set("pageCount", action.data);
    case CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.data);
    case CHANGE_PULLUP_LOADING:
      return state.set("pullUpLoading", action.data);
    case CHANGE_PULLDOWN_LOADING:
      return state.set("pullDownLoading", action.data);
    default:
      return state;
  }
};
