import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;
  transition-orgin: right-bottom;
  &.fly-enter,&.fly-appear {
    transition: rotateZ(30deg) translate3d(100%,0,0)
  }
  &.fly-enter-active,&.fly-appear-active {
    transition: transform .3s;
    transition: rotateZ(0deg) translate3d(0,0,0)
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0,0,0)
  }
  &.fly-exit-active {
    transition: rotateZ(30deg) translate3d(100%,0,0)
  }
`