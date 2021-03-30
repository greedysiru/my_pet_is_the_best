import React from 'react';

// components
import Post from '../components/Post';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post";

// Permit
import Permit from '../shared/Permit';

// Post List
// 사용자들이 올린 포스트들이 나오는 페이지
const PostList = (props) => {
  const dispatch = useDispatch();

  // 포스트들 가져오기
  const post_list = useSelector((state) => state.post.list);

  // 유저 정보 가져오기
  const user_info = useSelector((state) => state.user.user);
  // 파이어베이스에서 포스트 가져오기 호출
  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);
  return (
    <React.Fragment>
      <Permit>
        {/* 포스트 리스트 하나씩 넘겨서 화면에 구현하기 */}
        {post_list.map((p, idx) => {

          console.log(p);

          if (user_info && p.user_info.user_id === user_info.uid) {
            return <Post key={p.id} {...p} is_me />
          }
          return <Post key={p.id} {...p} />
        })}
      </Permit>
    </React.Fragment>
  );
};

export default PostList;