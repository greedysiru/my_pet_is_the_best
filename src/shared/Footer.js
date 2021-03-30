import React from "react";

// react-icons
import { FiHome, FiBell } from "react-icons/fi";

// 최소 단위 컴포넌트 불러오기
import { Grid, Text, Button } from "../elements";

// 화면 하단의 컨텐츠를 표시하는 컴포넌트
const Footer = (props) => {
  return (
    <React.Fragment>
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
          <FiHome />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Footer.defaultProps = {}

export default Footer;