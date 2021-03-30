import React from 'react';


// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";
import PostWrite from '../pages/PostWrite';
import Information from '../pages/Information';
import NotFound from '../pages/NotFound';

// shared
import Footer from './Footer';
import Permit from './Permit';

// elements
import { Grid } from '../elements';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

// 파이어베이스 apikey
import { apiKey } from './firebase'


function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  // 세션이 있으면 파이어베이스 로그인 확인
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  const is_login = useSelector(state => state.user.is_login);
  return (
    <React.Fragment>
      {/* Router */}
      {/* 존재하지 않은 url 입장 방지 Switch */}
      <ConnectedRouter history={history}>
        <Grid>
          <Switch>
            {/* 세션이 있고 파이어베이스 로그인 상태이면 포스트 리스트로 이동 */}
            <Route path='/' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/postlist' exact component={PostList} />
            <Route path='/write' exact component={PostWrite} />
            <Route path='/write/:id' exact component={PostWrite} />
            <Route path='/information' exact component={Information} />
            {/* 로그인 상태에서만 표시 */}
            <Route component={NotFound} />
          </Switch>
          <Permit>
            <Footer></Footer>
          </Permit>
        </Grid>
      </ConnectedRouter>
    </React.Fragment >
  );
};

export default App;
