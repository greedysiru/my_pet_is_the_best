import React from 'react';

// elements
import { Grid, Image, Text, Button } from "../elements";
import { history } from '../redux/configureStore'

// components
import LikeButton from '../components/LikeButton';
import Layout from '../components/Layout';


// Post
// 사용자들이 포스트하는 컴포넌트
// 메모이제이션을 하여 최적화
const Post = React.memo((props) => {
  const is_detail = props.is_detail;
  return (
    <React.Fragment>
      <div className="post">
        <Grid >
          <Grid is_flex padding="16px" >
            <Grid is_flex width="auto">
              <Image shape="avatar" src={props.user_info.user_profile} />
              <Text margin="0px 0px 3px 10px" size="20px" bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text bold >{props.time}</Text>
              {props.is_me &&
                <Button
                  margin="0px 0px 0px 10px"
                  width="80px"
                  _onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/write/${props.id}`);
                  }}
                >수정/삭제</Button>
              }
            </Grid>
          </Grid>
          <Grid bg="whitesmoke">
            {is_detail ? <Layout {...props} is_detail={true} /> : <Image shape="post" src={props.image_url}

            />}
          </Grid>
          <Grid padding="16px">
            {is_detail ? '' : (<Text size="16px">{props.contents}</Text>)}
          </Grid>
          <Grid is_flex center>
            <Grid padding="16px">
              <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
            </Grid>
            <Grid padding="16px">
              <Text margin="0px" bold>좋아요 {props.like_cnt}개</Text>
            </Grid>

            {!props.is_me && <Grid
              _onClick={(e) => {
                e.stopPropagation();
              }}
              size="20px" padding="16px"> <LikeButton post_id={props.id} /></Grid>}


          </Grid>
        </Grid>
      </div>
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

  image_url: "",
  contents: "더미컨텐츠 - Post 컴포넌트",
  comment_cnt: 0,
  time: "2021-03-29 10:00:00",
  like: 0,

};


export default Post;