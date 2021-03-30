import React from "react";

// 최소 단위 컴포넌트 불러오기
import { Text, Input, Grid, Button } from "../elements";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

// 로그인 페이지
const Login = (props) => {
  // 액션 생성
  const dispatch = useDispatch();
  // 로그인 아이디, 패스워드를 관리
  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  // 버튼을 누르면 아이디와 패스워드에 대한 쿠키를 생성하는 함수
  // 공란 체크 및 이메일 유효성 검사
  const login = () => {

    // 공란 체크
    if (id === "" || pwd === "") {
      window.alert('아이디와 비밀번호를 전부 입력해주세요.');
      return;
    }

    // if (!emailCheck(id)) {
    //   window.alert('이메일 형식이 맞지 않습니다.');
    //   return;
    // }

    dispatch(userActions.loginFB(id, pwd));
  }




  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
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
            label="패스워드"
            placeholder="패스워드를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            is_submit
            onSubmit={login}
          />
        </Grid>

        <Button
          text="로그인"
          _onClick={() => {
            login()
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;