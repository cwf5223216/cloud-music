//src/appliction/Recommend/index.js
import React ,{useEffect, useState}from 'react';
import { connect } from 'react-redux'
import { getBannerList,getRecommendList } from './store/actionCreators'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../components/scroll'
import { Content } from './style'

function Recommend (props) {
  const {bannerList,recommendList} = props

  const {getBannerDataDispatch , getRecommendListDataDispatch} = props


  useEffect(()=>{
    getBannerDataDispatch()
    getRecommendListDataDispatch()

  },[])

  const bannerListJS = bannerList? bannerList.toJS():[]
  const recommendListJS = recommendList? recommendList.toJS():[]

  return (
    <Content>
    <Scroll className="list">
      <div>
        <Slider bannerList={bannerListJS}></Slider>
        <RecommendList recommendList={recommendListJS}></RecommendList>
      </div>
    </Scroll>
  </Content> 
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (getRecommendList ());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend));