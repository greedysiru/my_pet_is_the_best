import React from 'react';


// 파이어베이스 apikey
import { apiKey } from '../shared/firebase'

// components
import Post from '../components/Post';

// 최소 단위 컴포넌트
import Grid from '../elements/Grid';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from '../redux/modules/user';

// 무한 스크롤
import InfinityScroll from '../shared/InfinityScroll';

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
  // 로딩
  const is_loading = useSelector((state) => state.post.is_loading);
  // 페이징
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  // 파이어베이스에서 포스트 가져오기 호출
  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);
  return (
    <React.Fragment>
      <Grid bg={'#EFF6FF'} padding="20px 0px">
        {/* 무한스크롤 */}
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}

          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (user_info && p.user_info.user_id === user_info.uid) {
              return (
                <Grid bg="#ffffff" margin="8px 0px" key={p.id} _onClick={() => { history.push(`/post/${p.id}`); }}>
                  <Post key={p.id} {...p} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid bg="#ffffff" margin="8px 0px" key={p.id} _onClick={() => { history.push(`/post/${p.id}`); }}>
                  <Post  {...p} />
                </Grid>
              );
            }

          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;