import React from "react";
import styled from 'styled-components';

// react-icons
import { FiHome, FiBell, FiUser } from "react-icons/fi";

// 최소 단위 컴포넌트 불러오기
import { Grid, Text, Button } from "../elements";

// 화면 하단의 컨텐츠를 표시하는 컴포넌트
const Footer = (props) => {
  return (
    <React.Fragment>
      <ElFooter>
        <Grid is_flex center padding="4px 16px">
          <Grid center size="30px">
            <FiHome />
          </Grid>
          <Grid center size="30px">
            <FiBell />
          </Grid>
          <Grid center size="30px">
            <FiHome />
          </Grid>
          <Grid center size="30px">
            <FiUser />
          </Grid>
        </Grid>
      </ElFooter>
    </React.Fragment>
  )
}

Footer.defaultProps = {}

const ElFooter = styled.div`
  display:flex;
  width: 100%;
  position: fixed;
  left: 0;
  bottom :0;
`;

export default Footer;