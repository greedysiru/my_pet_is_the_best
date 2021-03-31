import { createAction, handleActions } from "redux-actions";

// 불변성 관리
import { produce } from "immer";

// 리얼타임 데이터베이스
import { firestore, realtime } from "../../shared/firebase";

// 시간체크를 위한 모멘트
import "moment";
import moment from "moment";

// 파이어베이스
import firebase from 'firebase/app';

// 리덕스
import { actionCreators as postActions } from './post';

// Actions
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

// Action Creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({ post_id, comment_list }));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({ post_id, comment }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    // 댓글 정보 DB 가져오기
    const commentDB = firestore.collection('comment');
    // 리덕스의 유저 정보 가져오기
    const user_info = getState().user.user;

    // 댓글 정보
    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
      insert_dt: moment().valueOf(),
    }


    commentDB.add(comment).then((doc) => {
      // DB에서 포스트를 가져오기
      const postDB = firestore.collection('post');

      // 해당하는 포스트 번호를 가진 정보 가져오기
      const post = getState().post.list.find(l => l.id === post_id);

      const increment = firebase.firestore.FieldValue.increment(1);
      // 코멘트 정보에 아이디 넣기
      comment = { ...comment, id: doc.id };

      // 업데이트 하기
      postDB.doc(post_id).update({ comment_cnt: increment }).then((_post => {
        dispatch(addComment(post_id, comment));

        if (post) {
          dispatch(postActions.editPost(post_id, { comment_cnt: parseInt(post.comment_cnt) + 1, }));
          // 포스트작성자와 유저가 같으면 알림 하지 않는다.
          if (post.user_info.user_id === user_info.uid) {
            return
          }

          const _noti_item = realtime.ref(`noti/${post.user_info.user_id}/list`).push();

          _noti_item.set({
            post_id: post.id,
            user_name: comment.user_name,
            image_url: post.image_url,
            time: comment.time
          }, (err) => {
            if (err) {
            } else {
              const notiDB = realtime.ref(`noti/${post.user_info.user_id}`)

              notiDB.update({ read: false });
            }
          })
        }
      }))
    })
  }
}

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const commentDB = firestore.collection('comment');
    commentDB
      .where('post_id', "==", post_id)
      .orderBy('insert_dt', 'desc')
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        })
        dispatch(setComment(post_id, list));
      }).catch(err => {
      });
  };
};


export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      // let data = {[post_id]: com_list, ...}
      draft.list[action.payload.post_id] = action.payload.comment_list;

    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id].unshift(action.payload.comment);
    }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };