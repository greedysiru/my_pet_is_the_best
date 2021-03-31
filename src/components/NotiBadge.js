import React from 'react';

// 최소 단위 컴포넌트
import Grid from '../elements/Grid'

// 알림뱃지 가져오기
import { Badge } from '@material-ui/core';
import { AiOutlineBell, AiFillBell, } from "react-icons/ai";
// 파이어베이스 리얼타임 데이터베이스
import { realtime } from '../shared/firebase';

// 리덕스
import { useSelector } from 'react-redux';

// 알림뱃지
const NotiBadge = (props) => {
  // 읽었는지 안 읽었는지 여부
  const [is_read, setIsRead] = React.useState(true);
  // 체크 여부
  const [is_check, setIsCheck] = React.useState(true);

  const user_id = useSelector(state => state.user.user.uid);

  // 알림체크
  const notiCheck = () => {
    // 댓글
    const notiDB = realtime.ref(`noti/${user_id}`);
    // 좋아요
    const likeDB = realtime.ref(`like/${user_id}`);
    // 읽음으로 표시
    notiDB.update({ read: true })
    likeDB.update({ check: true })
    props._onClick()
  }
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    const likeDB = realtime.ref(`like/${user_id}`);
    notiDB.on('value', (snapshot) => {
      setIsRead(snapshot.val().read);
    });
    likeDB.on('value', (snapshot) => {
      setIsCheck(snapshot.val().check);
    });

    return () => {
      notiDB.off()
      likeDB.off()
    };

  }, [])

  return (
    <React.Fragment>
      <Grid>
        <Badge color="secondary" variant="dot" invisible={is_check && is_read} onClick={notiCheck}>
          {selected ? <AiFillBell /> : (<AiOutlineBell />)}
        </Badge>
      </Grid>
    </React.Fragment>
  )
}

NotiBadge.defaultPorps = {
  _onClick: () => { },

}

export default NotiBadge;