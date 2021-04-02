import React from 'react';
import { Grid, Text, Image } from '../elements'

// 리덕스
import { useSelector } from 'react-redux';
// 미리보기 컴포넌트
const Layout = (props) => {
  let { contents, is_detail, layout } = props;
  // let post_list = useSelector((state) => state.post.list);

  console.log(contents)
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
        <Grid width="100%" is_flex bg="whitesmoke" >
          <Grid width="1%"></Grid>
          <Image size="300" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="1%"></Grid>
        </Grid>
        <Text margin="5px 0px" bold size="24px">{is_detail ? `${contents}` : '컨텐츠'}</Text>
      </Grid>
    )
  } else if (layout === "down") {
    return (
      <Grid is_felx center>
        <Text margin="5px  0px" bold size="24px">{is_detail ? `${contents}` : '컨텐츠'}</Text>
        <Grid width="100%" bg="whitesmoke" is_flex>
          <Grid width="1%"></Grid>
          <Image size="300" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="1%"></Grid>
        </Grid>
      </Grid>
    )
  } else if (layout === "left") {
    return (
      <Grid bg="whitesmoke" center is_flex>
        <Grid is_flex>
          <Grid width="1%"></Grid>

          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="1%"></Grid>

        </Grid>
        <Grid center is_flex>
          <Grid width="1%"></Grid>
          <Text bold size="24px">{is_detail ? `${contents}` : '컨텐츠'}</Text>
          <Grid width="1%"></Grid>
        </Grid>
      </Grid>
    )
  } else if (layout === "right") {
    return (
      <Grid bg="whitesmoke" center is_flex>
        <Grid center is_flex>
          <Grid width="1%"></Grid>
          <Text bold size="24px">{is_detail ? `${contents}` : '컨텐츠'}</Text>
          <Grid width="1%"></Grid>
        </Grid>
        <Grid is_flex>
          <Grid width="1%"></Grid>

          <Image size="250" src={preview ? preview : "/images/dog_1.png"} />
          <Grid width="1%"></Grid>

        </Grid>
      </Grid>
    )
  }
}

export default Layout