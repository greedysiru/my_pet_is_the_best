// 로그인을 위한 쿠키

// 쿠키 가져오기
const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

// 쿠키 생성
// 유효기간은 기본 설정으로 5시간
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  document.cookie = `${name} = ${value}; expires=${date.toUTCString()}`;
};

// 쿠키 지우기
// 만료일을 이전으로 생성하여 쿠키 지우기
const deleteCookie = (name) => {
  let date = new Date('2000-01-01').toUTCString();

  document.cookie = name + '=; expires' + date;
};

export { getCookie, setCookie, deleteCookie };