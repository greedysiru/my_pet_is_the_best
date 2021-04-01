import React from 'react';

// 최소 구성 단위 컴포넌트
import { Grid, Image, Text } from "../elements";

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';

// 댓글 리스트
const CommentList = (props) => {
  const dispatch = useDispatch();
  // 댓글 리스트 가져오기
  const comment_list = useSelector(state => state.comment.list);
  const { post_id } = props;

  // 내 댓글을 제외한 정보 가져오기
  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  // 각각의 요소에 댓글 정보를 보내주기
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map(c => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  )
}

CommentList.defaultProps = {
  post_id: null,
}

export default CommentList;

// 댓글을 구성하는 정보가 담긴 컴포넌트
const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, time, contents } = props;
  return (
    <Grid is_flex>
      <Grid width="20%"></Grid>
      <Grid is_flex width="60%">
        <Grid is_flex width="auto" >
          <Image src={user_profile} shape="avatar" />
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid is_flex margin="0px 4px">
          <Text margin="0px">{contents}</Text>
          <Text margin="0px">{time}</Text>
        </Grid>
      </Grid>
      <Grid width="20%"></Grid>

    </Grid>
  )
}

CommentItem.defaultProps = {
  user_profile: "https://avatars.githubusercontent.com/u/75150027?v=4",
  user_name: "greedysiru",
  user_id: "",
  post_id: 1,
  contents: "시루 안녕!",
  time: '2021-01-01 19:00:00'
}