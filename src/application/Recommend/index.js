//src/appliction/Recommend/index.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import { getBannerList, getRecommendList} from "./store/actionCreators";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../components/scroll";
//import Loading from "../../baseUI/loading";
import ReactLoading from 'react-loading';
import { Content } from "./style";

function Recommend(props) {
  const { bannerList, recommendList,enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
   // 如果页面有数据，则不发请求
  //immutable 数据结构中长度属性 size
  if (!bannerList.size){
    getBannerDataDispatch ();
  }
  if (!recommendList.size){
    getRecommendListDataDispatch ();
  }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {/* { enterLoading? <Loading></Loading>: null } */}
      {/* { enterLoading? <ReactLoading type={'balls'} height={667} width={375}/> : null} */}
      {enterLoading? <ReactLoading type="spinningBubbles" style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height:"75px",
        width: "75px",
        fill: "#d44439"
      }}/> : null}
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend","enterLoading"])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(getRecommendList());
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
