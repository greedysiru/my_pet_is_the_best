import React from 'react';


// History
import { withRouter } from 'react-router';
import { history } from '../redux/configureStore';


// 잘못된 페이지 표시
const NotFound = (props) => {
  window.alert('잘못된 주소입니다.')
  history.goBack();
  return null;
}

export default withRouter(NotFound);