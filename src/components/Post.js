import React from 'react';

// elements
import { Grid, Image, Text, Button } from "../elements";
import { history } from '../redux/configureStore'

import { useSelector, useDispatch } from 'react-redux';

// Post
// 사용자들이 포스트하는 컴포넌트
// 메모이제이션을 하여 최적화
const Post = React.memo((props) => {
  const post_list = useSelector((state) => state.post.list);
  return (
    <React.Fragment>
      <Grid >
        <Grid is_flex padding="16px" >
          <Grid is_flex width="auto">
            <Image shape="avatar" src={props.image_url} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.post_info.insert_dt}</Text>
            {props.is_me &&
              <Button
                width="auto"
                margin="4px"
                padding="4px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >수정</Button>}
          </Grid>
        </Grid>
        <Grid>
          <Image shape="post" src={props.post_info.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text>{props.post_info.contents}</Text>
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold>댓글 {props.post_info.comment_cnt}개</Text>
        </Grid>

      </Grid>
    </React.Fragment >
  );
});

// Post의 기본 props
// 필요한 데이터의 기본 설정
Post.defaultProps = {
  // 사용자 정보
  user_info: {
    user_name: "siru",
    user_profile: "",
  },
  // 포스트 정보
  post_info: {
    image_url: "",
    contents: "더미컨텐츠 - Post 컴포넌트",
    comment_cnt: 0,
    insert_dt: "2021-03-29 10:00:00",
    like: 0,
  }
};


export default Post;