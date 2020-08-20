//src/application/Album/index.js
import React, { useState,useEffect,memo } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux'
import { getAlbumList ,changeEnterLoading} from './store/actionCreators'
import Header from "../../baseUI/header";
import Scroll from "../../components/scroll";
import { getCount,getName ,isEmptyObject} from '../../api/utils'
import { Container, TopDesc, Menu, SongList, SongItem } from "./style";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const id = props.match.params.id

  const { playList, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  useEffect (() => {
    getAlbumDataDispatch (id);
  }, [getAlbumDataDispatch, id]);
  
  // 同时将 mock 数据的代码删除
  let playListData = playList.toJS ();
  const handleBack = () => {
    setShowStatus(false);
  };


  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
        {
          !isEmptyObject(playListData)? (
            <Scroll bounceTop={false}>
          <div>
            <TopDesc background={playListData.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={playListData.coverImgUrl} alt="" />
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">
                    {Math.floor(playListData.subscribedCount / 1000) / 10} 万{" "}
                  </span>
                </div>
              </div>
              <div className="desc_wrapper">
                <div className="title">{playListData.name}</div>
                <div className="person">
                  <div className="avatar">
                    <img src={playListData.creator.avatarUrl} alt="" />
                  </div>
                  <div className="name">{playListData.creator.nickname}</div>
                </div>
              </div>
            </TopDesc>
            <Menu>
              <div>
                <i className="iconfont">&#xe6ad;</i>
                评论
              </div>
              <div>
                <i className="iconfont">&#xe86f;</i>
                点赞
              </div>
              <div>
                <i className="iconfont">&#xe62d;</i>
                收藏
              </div>
              <div>
                <i className="iconfont">&#xe606;</i>
                更多
              </div>
            </Menu>
            <SongList>
              <div className="first_line">
                <div className="play_all">
                  <i className="iconfont">&#xe6e3;</i>
                  <span>
                    {" "}
                    播放全部{" "}
                    <span className="sum">
                      (共 {playListData.tracks.length} 首)
                    </span>
                  </span>
                </div>
                <div className="add_list">
                  <i className="iconfont">&#xe62d;</i>
                  <span> 收藏 ({getCount(playListData.subscribedCount)})</span>
                </div>
              </div>
              <SongItem>
                {playListData.tracks.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className="index">{index + 1}</span>
                      <div className="info">
                        <span>{item.name}</span>
                        <span>
                          {getName(item.ar)} - {item.al.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </SongItem>
            </SongList>
          </div>
        </Scroll>
          ):null
        }
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = (state)=>({
  playList: state.getIn(["ablum","playList"]),
  enterLoading: state.getIn(["ablum","enterLoading"])
})

const mapDispatchToProps = (dispatch)=>{
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(false))
      dispatch(getAlbumList(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(memo(Album))
