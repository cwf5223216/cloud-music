//src/appliction/Singers/index.js
import React, { useState,useEffect, memo } from "react";
import { connect } from 'react-redux'
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
 } from './store/actionCreators'
import Horizen from "../../baseUI/horizen-item";
import Scroll from '../../components/scroll'
import { categoryTypes, alphaTypes ,areaTypes} from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";

function Singers(props) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  let [area,setArea] = useState("")

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  useEffect(()=>{
     getHotSingerDispatch()
  },[])

  let handleUpdateCatetory = (val) => {
    setCategory(val);
    updateDispatch(category,val,val)
  };
  let handleUpdateArea = (val) => {
    setArea(val);
    updateDispatch(category,val,alpha)
  };

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(val,val,alpha)
  };

  //mock 数据


  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={areaTypes}
          title={"首字母:"}
          handleClick={(val) => handleUpdateArea(val)}
          oldVal={area}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};   

export default connect(mapStateToProps,mapDispatchToProps)(memo(Singers));
