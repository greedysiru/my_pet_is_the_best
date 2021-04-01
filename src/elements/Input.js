import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 입력을 받는 input 최소 단위 컴포넌트
const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit } = props;

  // 여러줄 입력할 시
  if (multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            value={value}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange} ></ElTextarea>
        </Grid>
      </React.Fragment>
    )
  }

  // 기본 input
  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ?
          (<ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSubmit(e);
              }
            }}
          />) :
          (<ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
          />)}

      </Grid>
    </React.Fragment>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: '텍스트를 입력해주세요',
  type: "text",
  value: "",
  is_submit: false,
  _onChange: () => { },
  onSubmit: () => { },
}

const ElTextarea = styled.textarea`
  box-sizing: border-box;
  width:90%;
  @media
`;

const ElInput = styled.input`
  box-sizing: border-box;
`;


export default Input;