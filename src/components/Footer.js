import React from "react";
import styled from 'styled-components';

// react-icons
import {
  AiOutlineHome, AiFillHome,
  AiOutlineEdit, AiFillEdit,
} from "react-icons/ai";

import {
  FaRegUserCircle, FaUserCircle
} from 'react-icons/fa';
// 최소 단위 컴포넌트 불러오기
import { Grid, Text, Button } from "../elements";

// 컴포넌트
import NotiBadge from '../components/NotiBadge'

// 페이지 이동을 위한 history
import { history } from '../redux/configureStore';

// 화면 하단의 컨텐츠를 표시하는 컴포넌트
const Footer = (props) => {
  const [selectedHome, setSelectedHome] = React.useState(true);
  const [selectedEdit, setSelectedEdit] = React.useState(false);
  const [selectedBell, setSelectedBell] = React.useState(false);
  const [selectedInfo, setSelectedInfo] = React.useState(false);

  return (
    <React.Fragment>
      <FooterWrap>
        <Grid is_flex center>
          <Grid center size="32px" padding="7px"
            _onClick={() => {
              setSelectedHome(true);
              setSelectedEdit(false);
              setSelectedBell(false);
              setSelectedInfo(false);
              history.push("/postlist")
            }}>
            {selectedHome ? (<AiFillHome />) : (<AiOutlineHome />)}
          </Grid>
          <Grid center size="32px" padding="9px"
            _onClick={() => {
              setSelectedHome(false);
              setSelectedEdit(true);
              setSelectedBell(false);
              setSelectedInfo(false);
              history.push("/write")
            }}>
            {selectedEdit ? (<AiFillEdit />) : (<AiOutlineEdit />)}

          </Grid>
          <Grid size="32px">
            <NotiBadge _onClick={() => {
              setSelectedHome(false);
              setSelectedEdit(false);
              setSelectedBell(true);
              setSelectedInfo(false);
              history.push('/noti');
            }}
              selected={selectedBell}
            />
          </Grid>
          <Grid center size="32px" padding="6px"
            _onClick={() => {
              setSelectedHome(false);
              setSelectedEdit(false);
              setSelectedBell(false);
              setSelectedInfo(true);
              history.push("/information")
            }}>
            {selectedInfo ? (<FaUserCircle />) : (<FaRegUserCircle />)}

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