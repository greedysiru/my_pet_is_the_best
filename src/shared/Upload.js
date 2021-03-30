import React from "react";

// 최소 단위 구성 컴포넌트
import { Button } from "../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

//업로드 함수
const Upload = (props) => {
  const dispatch = useDispatch();
  //  업로드
  const uploading = useSelector((state) => state.image.uploading);
  // 입력 파일 접근
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    // 파일 내용을 읽어오기
    reader.readAsDataURL(file);

    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요");
      return;
    }

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <React.Fragment>
      <input type="file" ref={fileInput} onChange={selectFile} />
      <Button _onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  );
}

export default Upload;