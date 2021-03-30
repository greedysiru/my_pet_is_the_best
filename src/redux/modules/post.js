// 포스트와 관련된 기능을 하는 모듈

// 리덕스
import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from './image';


// 불변성 관리
import { produce } from "immer";

// 파이어 스토어
import { firestore, storage } from '../../shared/firebase';

// 시간 입력을 위한 moment
import moment from 'moment';

// Actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// Action creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// Initial State
const initialState = {
  list: [],
}

// 게시글 하나에 있어야 할 정보
const initialPost = {
  // 사용자 정보
  user_info: {
    user_name: "siru",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  // 포스트 정보
  post_info: {
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/5.jpeg",
    contents: "더미컨텐츠 - post 모듈",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    like: 0,
  }
};

// Middleware Actions
// 파이어스토어에서 데이터 가져오기
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {

        let _post = doc.data();
        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          post_info: {
            contents: _post.contents,
            image_url: _post.image_url,
            comment_cnt: _post.comment_cnt,
            insert_dt: _post.insert_dt,
          },
        }
        post_list.push(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

// 포스트 작성
const addPostFB = (contents = "",) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile

    }
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    // 이미지 프리뷰 접근
    const _image = getState().image.preview;
    // 파일이름은 유저의 id와 현재시간을 넣어서 구분
    const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, 'data_url');

    _upload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        console.log(url);

        return url;
      }).then(url => {
        // ~~~.add({추가할 정보})
        postDB
          .add({ ...user_info, ..._post, image_url: url })
          .then((doc) => {
            let post = { user_info, ..._post, id: doc.id, image_url: url };
            dispatch(addPost(post));
            // 업로드 후 포스트 리스트 이동
            history.replace('/postlist');

            dispatch(imageActions.setPreview(null));
          }).catch((err) => {
            window.alert('포스트 작성 오류가 발생했습니다.');
            console.log('post 작성에 실패했습니다.', err);
          });
      }).catch((err) => {
        window.alert('이미지 업로드 오류가 발생했습니다.');
        console.log('이미지 업로드 오류'.err);
      })
    });
  }
}
// Reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.post_list);

      draft.list = draft.list.reduce((acc, cur) => {
        if (acc.findIndex(a => a.id === cur.id) === -1) {
          return [...acc, cur];
        } else {
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);
    }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    })
  },
  initialState
);



// Actino Creators export
const actionCreators = {
  getPostFB,
  addPostFB,
  setPost,
};

export { actionCreators };