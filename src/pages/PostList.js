import React from 'react';

// Permit
import Permit from '../shared/Permit';

// Post List
// 사용자들이 올린 포스트들이 나오는 페이지
const PostList = (props) => {
  return (
    <React.Fragment>
      <Permit>
        포스트 리스트
      </Permit>
    </React.Fragment>
  );
};

export default PostList;