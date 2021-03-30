
// 이메일을 체크
export const emailCheck = (email) => {
  // 이메일
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]({-_.0-9a-zA-Z})*.([a-zA-Z])/;

  return _reg.test(email);
}