// 포스트와 관련된 기능을 하는 모듈

// 리덕스
import { createAction, handleActions } from "redux-actions";

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
    insert_dt: "2021-03-29 10:00:00",
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
    })
  },
  initialState
);



// Actino Creators export
const actionCreators = {
  getPostFB,
  setPost,
};

export { actionCreators };