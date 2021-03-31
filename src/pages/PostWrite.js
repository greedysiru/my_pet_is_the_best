import React from 'react';

// 최소 단위 컴포넌트
import { Grid, Text, Button, Image, Input } from '../elements';
// 업로드
import Upload from '../shared/Upload';


// 리덕스, 모듈
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

// 포스트를 작성하는 페이지
const PostWrite = (props) => {
  const dispatch = useDispatch();
  // 로그인 여부
  const is_login = useSelector((state) => state.user.is_login);
  // 프리뷰 정보
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  // 파라미터로 넘겨받은 아이디
  const post_id = props.match.params.id;
  // 수정인지 아닌지
  const is_edit = post_id ? true : false;

  const { history } = props;

  // 수정인 경우 기존의 내용을 담기
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState('');

  // 페이지 권한 여부 체크
  React.useEffect(() => {
    if (is_edit && !_post) {
      history.replace('/postlist');

      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  // text 기록
  const changeContents = (e) => {
    setContents(e.target.value);
  }

  // 파이어베이스에 기록
  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  }
  // 수정하기
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  }
  // 삭제하기
  const deletePost = () => {
    dispatch(postActions.deletePostFB(post_id));
  }
  // 로그인 하지 않은 상태
  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold >안내</Text>
        <Text size="16px">로그인 인증 정보가 없습니다.</Text>
        <Button _onClick={() => { history.replace("/"); }}>로그인 하러가기</Button>
      </Grid>
    )
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {/* 게시글 수정/작성 */}
          {is_edit ? '게시글 수정 / 삭제' : '게시글 작성'}
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>미리보기</Text>
        </Grid>
        {/* 프리뷰 */}
        <Image shape="post" src={preview ? preview : "http://via.placeholder.com/400x300"} />
      </Grid>
      <Grid padding="16px">
        <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
      </Grid>
      <Grid padding="16px">
        {is_edit ? (<Grid is_flex>
          <Button text="게시글 수정" _onClick={editPost} ></Button>
          <Button text="게시글 삭제" _onClick={deletePost} ></Button>
        </Grid>
        ) : (
          <Button margin="0px 0px 30px 0px" text="게시글 작성" _onClick={addPost} ></Button>
        )}

      </Grid>
    </React.Fragment>
  )
}

export default PostWrite;