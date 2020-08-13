//src/appliction/Recommend/index.js
import React from 'react';
import Slider from '../../components/slider'

function Recommend (props) {

  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/W58ZoucI02Gso-e4byfohw==/109951165229451930.jpg?imageView&quality=89" }
  });
  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
    </div>
  )
}

export default React.memo (Recommend);