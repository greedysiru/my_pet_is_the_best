import React from 'react';

// 최소 단위 컴포넌트
import { Grid, Button } from '../elements';
import Card from '../components/Card';

import { realtime } from '../shared/firebase';
import { useSelector } from 'react-redux';

// 알림 리스트
const Notification = (props) => {
  const user = useSelector(state => state.user.user);
  // 댓글 알림
  const [noti, setNoti] = React.useState([]);
  // 좋아요 알림
  const [like, setLike] = React.useState([]);
  // 토글
  const [toggle, setToggle] = React.useState(true);
  React.useEffect(() => {
    if (!user) {
      return;
    }

    // 댓글 알림
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild('insert_dt');

    // 좋아요 알림
    const likeDB = realtime.ref(`like/${user.uid}/list`);
    const _like = likeDB.orderByChild('time');

    _noti.once('value', snapshot => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data).reverse().map(s => {
          return _data[s];
        })
        setNoti(_noti_list);
      }
    })

    _like.once('value', snapshot => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _like_list = Object.keys(_data).reverse().map(s => {
          return _data[s];
        })
        setLike(_like_list);
      }
    })

  }, [user]

  );



  return (
    <React.Fragment>
      {toggle ? (<Grid padding="16px" bg="#EFF6FF">
        {like.map((n, idx) => {
          return (
            <Card key={`like_${idx}`} type="like" {...n} />
          )
        })}
      </Grid>)
        :
        (<Grid padding="16px" bg="#EFF6FF">
          {noti.map((n, idx) => {
            return (
              <Card key={`noti_${idx}`} type="noti" {...n} status={true} />
            )
          })}
        </Grid>)
      }


      {toggle ? (<Button like_btn text="좋아요" is_float _onClick={() => { setToggle(false) }}></Button>) :
        (<Button co_btn text="댓글" is_float _onClick={() => { setToggle(true) }}></Button>)}
    </React.Fragment>
  )
}

export default Notification;