import React from 'react';

// 최소 구성 단위 컴포넌트
import { Grid, Input, Button } from "../elements";

// 리덕스
import { actionCreators as commentActions } from '../redux/modules/comment';
import { useDispatch } from 'react-redux';

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  // 댓글 입력 담기
  const [comment_text, setCommentText] = React.useState();

  // 작성 아이디 담기
  const { post_id } = props;

  // 바뀔 때 마다 최신화
  const onChange = (e) => {
    setCommentText(e.target.value);
  }

  // 댓글 공백을 검사하고 파이어스토어에 추가하는 함수
  const write = () => {
    if (comment_text === "") {
      window.alert("댓글을 입력해주세요.");
      return;
    }
    // 파이어스토어에 추가합니다.
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    // 입력된 텍스트는 지우기!
    setCommentText("");
  };

  return (
    <React.Fragment>
      <Grid width="80%" padding="16px" is_flex center >
        <Grid width="80%">
          <Input is_submit
            placeholder="댓글을 입력해주세요"
            _onChange={onChange}
            value={comment_text}
            onSubmit={write}
          />
        </Grid>
        <Grid width="20%" center padding="0px 0px 25px 0px">
          <Button _onClick={write} padding="15px"  >작성</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default CommentWrite;