import React from "react";
import styled from 'styled-components';

// react-icons
import {
  AiOutlineHome, AiFillHome,
  AiOutlineEdit, AiFillEdit,
  AiOutlineUser, AiFillUser,

} from "react-icons/ai";
// 최소 단위 컴포넌트 불러오기
import { Grid, Text, Button } from "../elements";

// 컴포넌트
import NotiBadge from '../components/NotiBadge'

// 페이지 이동을 위한 history
import { history } from '../redux/configureStore';

// 화면 하단의 컨텐츠를 표시하는 컴포넌트
const Footer = (props) => {
  const [slected, setSelected] = React.useState('false');

  return (
    <React.Fragment>
      <FooterWrap>
        <Grid is_flex center>
          <Grid center size="32px" padding="7px" _onClick={() => {
            history.push("/postlist")
          }}>
            <AiOutlineHome />
          </Grid>
          <Grid center size="32px" padding="9px" _onClick={() => {
            history.push("/write")
          }}>
            <AiOutlineEdit />
          </Grid>
          <Grid size="32px">
            <NotiBadge _onClick={() => {
              history.push('/noti');
            }} />
          </Grid>
          <Grid center size="32px" padding="6px" _onClick={() => {
            history.push("/information")
          }}>
            <AiOutlineUser />
          </Grid>
        </Grid>
      </FooterWrap>
    </React.Fragment>
  )
}

Footer.defaultProps = {}

const FooterWrap = styled.div`
  display:flex;
  width: 100%;
  height: 7%;
  background-color: white;
  position: fixed;
  bottom:0;
  left:0;
`;

export default Footer;