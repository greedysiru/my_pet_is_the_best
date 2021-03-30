import React from 'react';

// 최소 단위 컴포넌트
import { Grid, Text, Button, Image, Input } from '../elements';
// 업로드
import Upload from '../shared/Upload';


// 리덕스, 모듈
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
// import { actionCreators as imageActions } from '../redux/modules/image';

// 페이지 이동을 위한 history
import { history } from '../redux/configureStore';

// 포스트를 작성하는 페이지
const PostWrite = (props) => {
  const dispatch = useDispatch();
  // 로그인 여부
  const is_login = useSelector((state) => state.user.is_login);
  // 로그인 상태가 아니면 로그인 창으로
  // if (!is_login) {
  //   history.replace('/');
  // }
  // 작성 컨텐츠 hook
  const [contents, setContents] = React.useState('');
  // text 기록
  const changeContents = (e) => {
    setContents(e.target.value);
  }
  // 파이어베이스에 기록
  const addPost = () => {
    console.log(contents)
    dispatch(postActions.addPostFB(contents));
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {/* {is_edit ? '게시글 수정' : '게시글 작성'} */}
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>미리보기</Text>
        </Grid>

        <Image shape="post" />
      </Grid>
      <Grid padding="16px">
        <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
      </Grid>
      <Grid padding="16px">
        {/* {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost} ></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost} ></Button>
        )} */}
        <Button text="게시글 작성" _onClick={addPost} ></Button>
      </Grid>
    </React.Fragment>
  )
}

export default PostWrite;