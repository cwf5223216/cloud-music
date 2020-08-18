import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/actionCreators'
//import Loading from '../../baseUI/loading';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';
//import Scroll from '../../baseUI/scroll/index';
//import { EnterLoading } from './../Singers/style';
//import { filterIndex, filterIdx } from '../../api/utils';
import { renderRoutes } from 'react-router-config';

function Rank(props) {
  const { rankList:list, loading } = props;

  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if(!rankList.length){
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

 // let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0,1);
  //let globalList = rankList.slice(globalStartIndex);
  let displayStyle = loading ? {"display":"none"}:  {"display": ""};
  console.log(officialList);
  return (
  <div>{officialList.map((item,index)=>{
    return (
      <div><img src={item.coverImgUrl} /></div>
    )
  })}</div>
    );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));