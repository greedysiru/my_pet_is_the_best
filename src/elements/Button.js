import React from 'react';
import styled from 'styled-components';

// 버튼을 구성하는 최소 단위 컴포넌트
const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  // 플로팅 버튼
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
  width: '100%',
  padding: "12px 0px",
}

// 기본 버튼 styled-components
const ElButton = styled.button`
  width: ${(props) => props.width} ;
  background-color: #212121;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  flex: 1;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`;

// 플로팅 버튼 styled-components
const FloatButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: #212121;
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
  `

export default Button;