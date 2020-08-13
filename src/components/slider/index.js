import React, { useEffect, useState , memo} from 'react';
import { SliderContainer } from './style';
import 'swiper/swiper.scss';
import Swiper from "swiper";

const Slider = (props)=>{
    //生成一个 swiper
    const [sliderSwiper, setSliderSwiper] = useState (null);
    const { bannerList } = props;
    useEffect(()=>{
        if (bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper(".slider-container",{
                loop:true,
                autoplay: {
                    delay:3000,
                    disableOnInteraction: false
                },
                pagination: {el:'.swiper-pagination'}
            })
            setSliderSwiper(newSliderSwiper)
        }
    },[bannerList.length,sliderSwiper])
    return(
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                {
                    bannerList.map (slider => {
                    return (
                        <div className="swiper-slide" key={slider.imageUrl}>
                        <div className="slider-nav">
                            <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                        </div>
                        </div>
                    );
                    })
                }
                </div>
                <div className="swiper-pagination"></div>
            </div> 
        </SliderContainer>
    )

}

export default memo(Slider)