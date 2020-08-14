import { axiosInstance } from './config'

//广告图
export const getBannerRequest = ()=>{
    return axiosInstance.get('/banner')
}
//歌单
export const getRecommendListRequest = ()=>{
    return axiosInstance.get('/personalized')
}

