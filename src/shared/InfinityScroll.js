import React from 'react';
import _ from 'lodash';
import Spinner from '../elements/Spinner';

import Grid from '../elements/Grid';

const InfinityScroll = (props) => {

  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }



    if (is_next) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
    // 클린업
    // 함수형 컴포넌트가 사라질 때 return 구문 실행
    // 이벤트를 삭제할 수 있다.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {props.children}
      {is_next && (
        <Grid center>
          <Spinner />
        </Grid>
      )}
    </React.Fragment>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => { },
  is_next: false,
  loading: false,
}


export default InfinityScroll;