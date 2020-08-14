import { CHANGE_BANNER,CHANGE_RECOMMEND_LIST } from './constants'
import { fromJS } from 'immutable'// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS({
    bannerList:[],
    recommendList:[]
})

export default (state = defaultState,action)=>{
    switch (action.type) {
        case CHANGE_BANNER:
            return state.set('bannerList',action.data)
        case CHANGE_RECOMMEND_LIST:
            return state.set('recommendList',action.data)    
        default:
            return state
    }
}