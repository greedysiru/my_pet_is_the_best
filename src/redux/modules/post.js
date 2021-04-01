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
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

// Action creators
const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// Initial State
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
}

// 게시글 하나에 있어야 할 정보
const initialPost = {
  // 사용자 정보
  // user_name: "더미아이디-post 모듈",
  // user_profile: "https://avatars.githubusercontent.com/u/75150027?v=4",
  // 포스트 정보

  // image_url: "https://avatars.githubusercontent.com/u/75150027?v=4",
  // contents: "더미컨텐츠 - post 모듈",
  // comment_cnt: 0,
  // time: moment().format("YYYY-MM-DD hh:mm:ss"),
  // like_cnt: 0,
  // insert_dt: moment().valueOf()

};

// Middleware Actions
// 포스트 수정
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {

    if (!post_id) {
      console.log('게시물 정보가 없습니다.');
      return
    }
    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);

    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection('post');

    if (_image === _post.image_url) {
      postDB.doc(post_id).update(post).then(doc => {
        dispatch(editPost(post_id, { ...post }));
        history.push('/postlist');
      });

      return
    } else {
      const use_id = getState().user.user.uid;
      const _upload = storage.ref(`images/${use_id}_${new Date().getTime()}`).putString(_image, 'data_url');

      _upload.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {

          return url;
        }).then(url => {
          postDB.doc(post_id).update({ ...post, image_url: url }).then(doc => {
            dispatch(editPost(post_id, { ...post, image_url: url }));
            history.replace('/');
          });
        }).catch((err) => {
          window.alert('이미지 업로드 오류가 발생했습니다.');
          console.log('이미지 업로드 오류'.err);
        })
      });
    }
  }
}


// 파이어스토어에서 데이터 가져오기
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {


    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));

    const postDB = firestore.collection('post');

    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          let post = Object.keys(_post).reduce((acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc, user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          }, { id: doc.id, user_info: {} }
          );
          post_list.push(post)
        });

        post_list.pop();

        dispatch(setPost(post_list, paging));
      });

    return;
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');

    postDB.doc(id).get().then(doc => {
      let _post = doc.data()
      if (_post === undefined) {
        return null;
      }
      let post = Object.keys(_post).reduce((acc, cur) => {
        if (cur.indexOf('user_') !== -1) {
          return {
            ...acc, user_info: { ...acc.user_info, [cur]: _post[cur] },
          };
        }
        return { ...acc, [cur]: _post[cur] };
      }, { id: doc.id, user_info: {} }
      );
      dispatch(setPost([post]));
    });

  }
}

// 포스트 작성
const addPostFB = (contents = "", layout) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    const _user = getState().user.user;

    const user_info = {
      ...initialPost,
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    }
    const _post = {
      ...initialPost,
      contents: contents,
      time: moment().format("YYYY-MM-DD hh:mm:ss"),
      insert_dt: moment().valueOf(),
      like_cnt: 0,
      comment_cnt: 0,
      layout: layout,
    };
    // 이미지 프리뷰 접근
    const _image = getState().image.preview;
    if (_image === null) {
      window.alert('이미지를 업로드해주세요.');
      return
    }
    // 파일이름은 유저의 id와 현재시간을 넣어서 구분
    const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, 'data_url');

    _upload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {

        return url;
      }).then(url => {
        // ~~~.add({추가할 정보})
        postDB
          .add({ ...user_info, ..._post, image_url: url })
          .then((doc) => {
            let post = { user_info, ..._post, id: doc.id, image_url: url };
            dispatch(addPost(post));
            window.alert('포스트가 업로드 되었습니다.')
            // 업로드 후 포스트 리스트 이동
            history.replace('/postlist');

            dispatch(imageActions.setPreview(null));
          }).catch((err) => {
            window.alert('포스트 작성 오류가 발생했습니다.');
          });
      }).catch((err) => {
        window.alert('이미지 업로드 오류가 발생했습니다.');
      })
    });
  }
}
// 삭제
const deletePostFB = (post_id) => {
  return function (getState, dispatch, { history }) {
    const docRef = firestore.collection("post").doc(post_id);

    docRef.delete().then(() => {
      window.alert('해당 포스트가 삭제되었습니다.');
      window.location.reload();

    }).catch((error) => {
      console.log(error);
    })
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

      if (action.payload.paging) {
        draft.paging = action.payload.paging;
      }
      draft.is_loading = false;
    }),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

      draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading;
    })
  }, initialState
);



// Actino Creators export
const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  getOnePostFB,
  deletePostFB,
};

export { actionCreators };