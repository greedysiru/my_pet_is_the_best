import React from "react";
import styled from "styled-components";

// 스피너 가져오기
import Loader from 'react-loader-spinner';

// 스피너
const Spinner = (props) => {
  const { type, size, is_dim } = props;

  return (
    <React.Fragment>
      <Loader type="Puff" color="#00BFFF" height={80} width={80} />
    </React.Fragment>
  );
};

export default Spinner;