import React from 'react';

// 최소 단위 컴포넌트
import { Button, Grid, Image, Text } from '../elements';

// 로그아웃 기능 불러오기
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";// Redux

// react-icons
import {
  AiOutlineGithub, AiOutlineSmile,
} from "react-icons/ai";

const Infrormation = (props) => {
  const { history } = props;
  const logOut = () => {
    dispatch(userActions.logoutFB());
    history.replace('/');
  }
  const dispatch = useDispatch();
  // 유저 정보 가져오기
  const user_info = useSelector((state) => state.user.user);
  const { user_name, user_profile, id } = user_info;

  return (
    <Grid width="100%" bg="#F5EAEA" padding="20px" margin="150px 0px 0px 0px">
      <Grid is_flex padding="20px">
        <Grid is_flex center >
          <Grid width="1%"></Grid>
          <Image shape="avatar" size="150" src={user_profile} />
          <Grid width="1%"></Grid>
        </Grid>
        <Grid width="50%">
          <Text bold size="40px">{user_name}</Text>
          <Text size="20px">{id}</Text>
        </Grid>
      </Grid>
      <Grid is_flex center>
        <Grid size="50px">
          <a href="https://github.com/greedysiru">
            <AiOutlineGithub />
          </a>
        </Grid>
        <Grid size="50px">
          <a href="https://greedysiru.tistory.com">
            <AiOutlineSmile />
          </a>
        </Grid>
      </Grid>
      <Grid center>
        <Button>
          < Button text="로그아웃" _onClick={logOut}></Button>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Infrormation;