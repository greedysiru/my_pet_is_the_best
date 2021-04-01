import styled from 'styled-components';
import React from 'react';

// 이미지를 설정한 최소 단위 컴포넌트
const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  }

  // 아바타 이미지
  if (shape === 'avatar') {
    return (
      <ImagaeAvatar {...styles}></ImagaeAvatar>
    )
  }

  // 포스트 이미지
  if (shape === 'post') {
    return (
      <AspectOutter>
        <AspectInner {...styles} ></AspectInner>
      </AspectOutter>
    )
  }
  if (shape == 'default') {
    return (
      <ImageDefault {...styles}></ImageDefault>)
  }
  return null
}

// 기본 설정
Image.defaultProps = {
  shape: "avatar",
  src: "images/dog_1.png",
  size: 36,
};

// 기본 이미지 styled-components
const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;


// 이미지를 감싸는 요소
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

// 비율유지를 위한 padding 기본값 설정
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImagaeAvatar = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: 15%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;