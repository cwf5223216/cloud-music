  
import { CHANGE_PLAY_LIST,CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  playList: {},
  enterLoading: false,
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_PLAY_LIST:
      return state.set('playList', action.data);
    case CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
};