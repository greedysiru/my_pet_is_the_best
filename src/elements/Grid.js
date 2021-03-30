import { size } from 'lodash';
import React from 'react';

import styled from 'styled-components';

// 화면의 요소를 구성하는 최소 단위 컴포넌트
const Grid = (props) => {
  // 부모요소로부터 태그 속성을 전달받기
  const { is_flex, width, margin, padding, bg, children, center, size, _onClick } = props;
  // 전달 받은 값을 별도의 변수에 담기
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    size: size,
  }
  return (
    <React.Fragment>
      {/* 전달받은 태그 속성을 적용 */}
      <GridBox {...styles} onClick={_onClick}>
        {/* Grid가 감싼 컨텐츠 */}
        {children}
      </GridBox>
    </React.Fragment>
  )
}

// Grid의 기본 props
Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  size: false,
  _onClick: () => { },
};

// Grid의 styled-components 설정
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) => props.is_flex ?
    `display: flex; align-items: center; justify-content: space-between;` : ''}
  ${(props) => props.center ? `text-align: center;` : ''}
  ${(props) => props.size ? `font-size: ${props.size};` : ''}
`;

export default Grid;