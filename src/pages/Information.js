import React from 'react';

// 최소 단위 컴포넌트
import { Button } from '../elements';

// 로그아웃 기능 불러오기
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";


const Infrormation = (props) => {
  const dispatch = useDispatch();

  return (
    <Button>
      < Button text="로그아웃" _onClick={() => { dispatch(userActions.logoutFB()); }}></Button>
    </Button>)
}

export default Infrormation;