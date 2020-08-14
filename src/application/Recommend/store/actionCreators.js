import { CHANGE_BANNER,CHANGE_RECOMMEND_LIST } from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest,getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data)=>({
    type: CHANGE_BANNER,
    data: fromJS(data)
})

export const changeRecommendList = (data)=>({
    type: CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})

export const getBannerList = ()=>{
    return (dispatch)=>{
        getBannerRequest().then(data =>{
            dispatch(changeBannerList(data.banners))
        }).catch(()=>{
            console.log('internet err')
        })
    }
}

export const getRecommendList = ()=>{
    return (dispatch)=>{
        getRecommendListRequest().then(data=>{
            dispatch(changeRecommendList(data.result))
        }).catch(()=>{
            console.log('internet err');
        })
    }
}