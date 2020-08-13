//src/appliction/Recommend/index.js
import React from 'react';
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../components/scroll'
import { Content } from './style'

function Recommend (props) {

  //mock 
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/W58ZoucI02Gso-e4byfohw==/109951165229451930.jpg?imageView&quality=89" }
  });
  const recommendList = [1,2,3,4,5,6,7,8,9,10].map (item => {
    return {
      id: 1,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    }
  });

  return (
    <Content>
    <Scroll className="list">
      <div>
        <Slider bannerList={bannerList}></Slider>
        <RecommendList recommendList={recommendList}></RecommendList>
      </div>
    </Scroll>
  </Content> 
  )
}

export default React.memo (Recommend);