import React, { memo, useRef, useState, useEffect } from "react";
import { prefixStyle } from "../../api/utils";
import { ProgressBarWrapper } from "./style";

const ProgressBar = (props) => {
  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();
  const [touch, setTouch] = useState({});

  const { precent } = props;

  const progressBtnWidth = 8;

  // 取出回调函数
  const { percentChange } = props;

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth; // 新的进度计算
    percentChange(curPercent); // 把新的进度传给回调函数并执行
  };

  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent ();
  };

  const progressTouchStart = (e) => {
    const startTouch = {};
    //initial为true表示滑动动作开始了
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    //滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent ();
  };

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
};

export default memo(ProgressBar);
