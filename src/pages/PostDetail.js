import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

import Permit from '../shared/Permit';

// 포스트의 상세 내용
const PostDetail = (props) => {

  const dispatch = useDispatch();
  // 전달받은 파라미터의 아이디
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector(store => store.post.list);

  const post_idx = post_list.findIndex(p => p.id === id);
  const post = post_list[post_idx];
  React.useEffect(() => {
    if (post) {
      return
    }
    dispatch(postActions.getOnePostFB(id));

  }, []);


  return (
    <React.Fragment>
      {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid} is_detail={true} />}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  )
}

export default PostDetail;