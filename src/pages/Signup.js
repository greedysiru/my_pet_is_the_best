import React from "react";

// 최소 단위 컴포넌트 불러오기
import { Grid, Text, Input, Button } from "../elements";

// 리덕스 연동
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

// 이메일 체크
import { emailCheck } from '../shared/check';

// 회원가입 페이지
const Signup = (props) => {
  const dispatch = useDispatch();

  // state 관리를 위한 hook
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");


  // 회원가입 버튼을 누르면 호출되는 함수
  // 공란 확인 및 이메일 유효성검사
  const signup = () => {
    if (id === '' || pwd === '' || user_name === '') {
      window.alert('회원가입에 필요한 모든 정보를 입력해주세요.');
      return;
    }

    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다.');
      return;
    }

    if (pwd !== pwd_check) {
      window.alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
      return;
    }
    // 회원가입 정보 파이어베이스에 보내기
    dispatch(userActions.signupFB(id, pwd, user_name));
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="패스워드"
            placeholder="패스워드를 입력해주세요."
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드 확인"
            type="password"
            placeholder="패스워드를 다시 입력해주세요."
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;