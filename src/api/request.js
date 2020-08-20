import { axiosInstance } from "./config";

//广告图
export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};
//歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

//热门歌手
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};
//歌手列表
export const getSingerListRequest = (catetype,area, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?type=${catetype}`
  );
};
//排行榜
export const getRankListRequest = ()=>{
  return axiosInstance.get(`/toplist/detail`)
}
//歌单详情
export const getAlbumDetailRequest = id =>{
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}