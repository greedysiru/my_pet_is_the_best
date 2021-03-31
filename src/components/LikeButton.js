import React from 'react';

// icon
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { realtime } from '../shared/firebase';

import { useSelector, useDispatch } from 'react-redux';


// 리덕스
import { actionCreators as likeActions } from '../redux/modules/like';




const LikeButton = (props) => {
  const dispatch = useDispatch();
  const [is_like, setIsLike] = React.useState(true);
  const user_id = useSelector(state => state.user.user.uid);
  const post_id = props.post_id
  const likeCheck = () => {
    // const likeDB = realtime.ref(`like/${user_id}`);
    // likeDB.update({ check: true })
    console.log('like')
    console.log(props)
    dispatch(likeActions.addLikeFB(user_id, post_id));
    // 좋아요 표시
    realtime.ref(`likecheck/${user_id}/${post_id}`).update({ like_check: false });

  }

  const deleteLike = () => {
    // const likeDB = realtime.ref(`like/${user_id}`);
    // likeDB.update({ check: true })
    console.log('delete like')
    dispatch(likeActions.deleteLikeFB(user_id, post_id));
    // 좋아요 취소 적용
    realtime.ref(`likecheck/${user_id}/${post_id}`).update({ like_check: true });

  }

  React.useEffect(() => {
    // DB에 해당 post_id 가 있는지 체크
    const checkDB = realtime.ref(`likecheck/${user_id}`);
    checkDB.on('value', (snapshot) => {
      // 아예 좋아요한 컨텐츠가 없는 경우
      if (snapshot.val() === null) {
        return () => checkDB.off();
      }
      let likeList = Object.keys(snapshot.val())
      if (likeList.indexOf(post_id) < 0) {
        // 좋아요 목록에 없는 포스트인 경우
        return () => checkDB.off();
      } else {
        // 있으면 좋아요 유무를 반영
        const likeCheckDB = realtime.ref(`likecheck/${user_id}/${post_id}`);
        likeCheckDB.on('value', (snapshot) => {
          setIsLike(snapshot.val().like_check);
          console.log('체크', is_like)
          console.log(post_id)
          return () => likeCheckDB.off();
        })
      }
    })



  }, [])

  return (
    <React.Fragment>
      {is_like ? (<AiOutlineHeart onClick={likeCheck} />) : (<AiFillHeart onClick={deleteLike} />)}
    </React.Fragment>
  )
}


export default LikeButton;