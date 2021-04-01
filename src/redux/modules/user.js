// 사용자의 로그인 상태를 관리하는 모듈
import { createAction, handleActions } from "redux-actions";
// 불변성 관리 패키지
import { produce } from "immer";
// 쿠키 함수들 가져오기
import { setCookie, deleteCookie } from "../../shared/Cookie";

// Firebase 연동
import { auth } from '../../shared/firebase';
import firebase from 'firebase/app';

// 리얼타임 데이터베이스
import { firestore, realtime } from "../../shared/firebase";

// 시간체크를 위한 모멘트
import "moment";
import moment from "moment";

// Actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// Action Creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// Initial State
const initialState = {
  user: null,
  is_login: false,
};

// Middleware Actions
// 로그인 후 파이어베이스 정보와 확인
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    const _user_profile = makeProfile()
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth.signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          // 리덕스에 유저 정보 저장
          dispatch(setUser({
            user_name: user.user.displayName,
            id: id,
            user_profile: _user_profile,
            uid: user.user.uid,
          })
          );
          // 로그인 정상 처리 후 포스트리스트로 이동
          history.push('/postlist');
        })
        .catch((error) => {
          window.alert('로그인 오류입니다. 계정정보를 다시 확인해주세요.')
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    });
  };
};

// Firebase 회원가입
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    const _user_profile = makeProfile()
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(() => {
          // 리덕스에 유저 정보 저장
          dispatch(setUser({
            user_name: user_name,
            id: id,
            user_profile: _user_profile,
            uid: user.user.uid
          }))
          const userID = user.user.uid
          console.log(userID, "등록")
          // 리얼타임 데이터베이스 체크
          const signup_like = realtime.ref(`like/${userID}/list`).push();

          signup_like.set({
            time: moment().format('YYYY-MM-DD hh:mm:ss'),
          }, (err) => {
            if (err) {
              console.log('알림 저장 실패');
            } else {
              const likeDB = realtime.ref(`like/${userID}`)

              likeDB.update({ check: true });
            }
          })

          const signup_noti = realtime.ref(`noti/${userID}/list`).push();

          signup_noti.set({

            time: moment().format('YYYY-MM-DD hh:mm:ss'),
          }, (err) => {
            if (err) {
            } else {
              const notiDB = realtime.ref(`noti/${userID}`)

              notiDB.update({ read: true });
            }
          })
          window.alert('회원가입이 완료되었습니다.')
          // 회원가입 정상 처리 후 포스트 리스트로 이동
          history.push('/postlist');
        }).catch((error) => {
          console.log(error);
        })

        // Signed in
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
      });




  }
}

// 로그인 체크
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      const _user_profile = makeProfile()
      if (user) {
        // 리덕스 최신화
        dispatch(setUser({
          user_name: user.displayName,
          user_profile: _user_profile,
          id: user.email,
          uid: user.uid,
        })
        );
        // 로그인 상태가 아니면 로그아웃 처리
      } else {
        dispatch(logOut())
      }
    })
  }
}

// 로그아웃
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      // 로그인 화면으로 이동
      history.replace('/');
    })
  }
}

// Reducers
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
  },
  initialState
);
// 프로필 생성 함수
const makeProfile = () => {
  const randomNum = moment().valueOf()
  const num = randomNum % 10;
  const imageArray = [
    "/images/cat_1.png", "/images/dog_1.png", "/images/cat_2.png", "/images/dog_2.png", "/images/cat_3.png",
    "/images/dog_3.png", "/images/cat_4.png", "/images/cat_4.png", "/images/dog_4.png", "/images/foot.png"
  ]
  const imageURL = imageArray[num];
  return imageURL;
}


// Action Creators exprot
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
  setUser,
};

export { actionCreators };