import React from 'react';
import { Grid, Text, Image } from '../elements'

// 리덕스
import { useSelector } from 'react-redux';
// 미리보기 컴포넌트
const Layout = (props) => {
  let { layout, is_detail } = props;
  if (layout === undefined) {
    layout = "up";
  }
  // 프리뷰 정보
  let preview = useSelector((state) => state.image.preview);
  if (is_detail) {
    preview = props.image_url
  } else {

  }

  // 이미지 url
  if (layout === "up" || layout === "") {
    return (
      <Grid is_felx center>
        <Grid width="100%" is_flex>
          <Grid width="33%"></Grid>
          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="33%"></Grid>
        </Grid>
        <Text bold size="24px">컨텐츠 내용</Text>
      </Grid>
    )
  } else if (layout === "down") {
    return (
      <Grid is_felx center>
        <Text bold size="24px">컨텐츠 내용</Text>
        <Grid width="100%" is_flex>
          <Grid width="33%"></Grid>
          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="33%"></Grid>
        </Grid>
      </Grid>
    )
  } else if (layout === "left") {
    return (
      <Grid center is_flex>
        <Grid>
          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
        </Grid>
        <Grid>
          <Text bold size="24px">컨텐츠 내용</Text>
        </Grid>
      </Grid>
    )
  } else if (layout === "right") {
    return (
      <Grid center is_flex>
        <Grid>
          <Text bold size="24px">컨텐츠 내용</Text>

        </Grid>
        <Grid>
          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
        </Grid>
      </Grid>
    )
  }
}

export default Layout