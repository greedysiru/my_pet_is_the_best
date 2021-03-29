import React from 'react';

// Post
// 사용자들이 포스트하는 컴포넌트
const Post = (props) => {
  return (
    <React.Fragment>
      포스트
    </React.Fragment>
  );
};

// Post의 기본 props
// 필요한 데이터의 기본 설정
Post.defaultProps = {
  // 사용자 정보
  user_info: {
    user_name: "dummy",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  // 포스트 정보
  post_info: {
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/5.jpeg",
    contents: "더미컨텐츠",
    comment_cnt: 10,
    insert_dt: "2021-03-29 10:00:00",
  }
};


export default Post;