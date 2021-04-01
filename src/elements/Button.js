import React from 'react';
import styled from 'styled-components';

// 버튼을 구성하는 최소 단위 컴포넌트
const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding, like_btn, co_btn } = props;
  // 플로팅 버튼
  console.log(like_btn)
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick} >{text ? text : children}</FloatButton>
      </React.Fragment>
    )
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    like_btn: like_btn,
    co_btn: co_btn,
  };

  // 기본 버튼
  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text ? text : children}</ElButton>
    </React.Fragment>
  )
}

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => { },
  is_float: false,
  margin: false,
  width: false,
  like_btn: false,
  co_btn: false,
  padding: "12px 0px",
}

// 기본 버튼 styled-components
const ElButton = styled.button`
  background-color: #226ef9;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  flex: 1;
  ${(props) => (props.width ? `width: ${props.width};` : 'min-width: 150px')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`;

// 플로팅 버튼 styled-components
const FloatButton = styled.button`
  width: 120px;
  height: 50px;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 800;
  position: fixed;
  bottom: 60px;
  right: 16px;
  text-align: center;
  border: none;
  border-radius: 10px;
  vertical-align: middle;
  opacity:0.8;
  background-color: ${(props) => (props.like_btn ? `#e08b02;` : `#5d78b0;`)}

  `

export default Button;