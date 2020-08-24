import React, { memo,useRef } from "react";
import { CSSTransition } from 'react-transition-group'
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";

const MiniPlayer = (props) => {
  const { song,fullScreen } = props;
  const { toggleFullScreen } =props
  
  const MiniPlayerRef = useRef()
  return (
    <CSSTransition
    in={!fullScreen}
    timeout={400}
    classNames='mini'
    onEnter={()=>{
      MiniPlayerRef.current.style.display = "flex"
    }}
    onExited={()=>{
      MiniPlayerRef.current.style.display = "none"
    }}
    >
      <MiniPlayerContainer ref={MiniPlayerRef} onClick={()=> toggleFullScreen(true)} >
      <div className="icon">
        <div className="imgWrapper">
          <img
            className="play"
            src={song.al.picUrl}
            width="40"
            height="40"
            alt="img"
          />
        </div>
      </div>
      <div className="text">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{getName(song.ar)}</p>
      </div>
      <div className="control">
        <i className="iconfont">&#xe650;</i>
      </div>
      <div className="control">
        <i className="iconfont">&#xe640;</i>
      </div>
    </MiniPlayerContainer>
    </CSSTransition>
  );
};

export default memo(MiniPlayer);
