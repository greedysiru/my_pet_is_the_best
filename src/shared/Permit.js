import React from 'react';
import { useSelector } from 'react-redux';
import { apiKey } from './firebase';

// 사용자의 인증 상태를 체크하는 컴포넌트
const Permit = (props) => {
  // 유저 정보가 있거나 토큰이 있는지를 체크
  const is_login = useSelector(state => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // 있을 경우 컨텐츠를 표시
  if (is_session && is_login) {
    return (<React.Fragment>
      {props.children}
    </React.Fragment>)
  }

  return null;
}

export default Permit;