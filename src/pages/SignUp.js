import React, {useState, useRef } from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/public/Header";
import { emailCheckDB, idCheckDB, nickCheckDB, addUserDB } from "../store/modules/user";

function SignUp(e) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // 회원가입 정보 가져오기
  const emailRef = useRef();
  const idRef = useRef();
  const nickRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();

  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const idCheckStr = /^(?=.*[a-z])(?=.*\d)[a-z\d]{3,10}$/;
  const nickCheckStr = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/;
  const pwCheckStr = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;


  // 유효성 알림
  const [userIdAlert, setUserIdAlert] = useState('');
  const [userPwAlert, setUserPwAlert] = useState('');
  const [userPwAChecklert, setUserPwCheckAlert] = useState('');
  const [userEmailAlert, setUserEmailAlert] = useState('');
  const [userNickAlert, setUserNickAlert] = useState('');

  // // 중복체크 전 유효성 확인
  // const [emailStrCheck, setemailStrCheck] = useState(false);
  // const [idStrCheck, setidStrCheck] = useState(false);
  // const [nickStrCheck, setnickStrCheck] = useState(false);


  //************** 형식 체크 **************//
  // 이메일
  const onEmailChange = () => {
    const email = emailRef.current.value;
    if (emailCheckStr.test(email)) {
      setUserEmailAlert("")
    } else {
      setUserEmailAlert("🚨 이메일 형식으로 작성해주세요.")
    }
  }

  // 아이디
  const onIdChange = () => {
    const id = idRef.current.value;
    if (idCheckStr.test(id)) {
      setUserIdAlert("")
    } else {
      setUserIdAlert("🚨 3~10글자,영문,숫자로 작성해주세요.")
    }
  }


  // 닉네임
  const onNickChange = () => {
    const nick = nickRef.current.value;
    if (nickCheckStr.test(nick)) {
      setUserNickAlert("")
    } else {
      setUserNickAlert("🚨 2~12글자, 특수문자를 제외하고 작성해주세요.")
      // 한글, 영문, 특수문자 (- _ .) 포함한 2 ~ 12글자 닉네임
    }
  }

  // 비밀번호
  const onPwChange = () => {
    const pw = pwRef.current.value;
    console.log(pw);
    if (pwCheckStr.test(pw)) {
      if (pw.search(/\s/) != -1) {
        setUserPwAlert("공백 없이 입력해주세요.")
      } else {
        setUserPwAlert("")
      }
    } else {
      setUserPwAlert("🚨 비밀번호는 영대문자, 소문자, 숫자, 특수문자를 포함해 총 8글자 이상이어야 합니다.")
    }
  }
  // 비밀번호 확인
  const onPwCheckChange = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;
    if (pwCheck === pw) {
      setUserPwCheckAlert("")
    } else {
      setUserPwCheckAlert("🚨두 비밀번호가 일치하지 않습니다.")
    }
  }


  //************** 중복체크 **************//
  // 아이디
  const idCheck = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    dispatch(idCheckDB(id, setUserIdAlert))
  }

  // 이메일
  const emailCheck = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    dispatch(emailCheckDB(email, setUserEmailAlert))
  }

  // 닉네임
  const nickCheck = (e) => {
    e.preventDefault();
    const nick = nickRef.current.value;
    dispatch(nickCheckDB(nick, setUserNickAlert))
  }



  // 회원가입
  const signup = async () => {
    const userId = idRef.current.value;
    const userEmail = emailRef.current.value;
    const userNick = nickRef.current.value;
    const userPw = pwRef.current.value;
    const userPwCheck = pwCheckRef.current.value;

    // 유효성 검사
    if (userEmail === "" || userId === '' || userNick === "" || userPw === "" || userPwCheck === "") {
      window.alert("모든 항목은 필수입니다😊");
      return;
    }
    if (!userIdAlert.includes('사용 가능한')) {
      window.alert("아이디 중복체크 해주세요");
      idRef.current.focus();
      return;
    }
    if (!userEmailAlert.includes('사용 가능한')) {
      window.alert("이메일 중복체크 해주세요");
      emailRef.current.focus();
      return;
    }
    if (!userNickAlert.includes('사용 가능한')) {
      window.alert("닉네임 중복체크 해주세요");
      nickRef.current.focus();
      return;
    }
    if (userPwAlert != '' && userPwAChecklert != '') {
      window.alert("비밀번호 형식과 일치여부를 확인해주세요");
      pwRef.current.focus();
      return;
    }

    const userInfo = {
      username: userId,
      email: userEmail,
      nickname: userNick,
      password: userPw,
      Checkpassword: userPwCheck,
    }

    dispatch(addUserDB(userInfo));
    navigate("/", {state: {name:signupUrl}})
  }


  const signprevUrl = document.referrer;
  console.log(signprevUrl,"회원가입했습니다만?")
  console.log(window.location.href,"location")
  const signupUrl = window.location.href
  


  return (
    <>
      <div className="topWrap">
        <Header />
      </div>
      <SignWrap>
        <Title><span>티끌</span>회원가입을 위해<br />정보를 입력해 주세요.</Title>
        <Form>
          <label htmlFor="userId">
            <input type="text" id="userId" placeholder="아이디" ref={idRef} onChange={onIdChange} />
            <p>{userIdAlert}</p>
            <button className="checkBtn" onClick={idCheck}>중복체크</button>
          </label>
          <label htmlFor="userPw">
            <input type="password" id="userPw" placeholder="비밀번호" ref={pwRef} onChange={onPwChange} />
            <p>{userPwAlert}</p>
          </label>
          <label htmlFor="checkPassword">
            <input type="password" id="checkPassword" placeholder="비밀번호 확인" ref={pwCheckRef} onChange={onPwCheckChange} />
            <p>{userPwAChecklert}</p>
          </label>
          <label htmlFor="userEmail">
            <input type="text" id="userEmail" placeholder="이메일" ref={emailRef} onChange={onEmailChange} />
            <p>{userEmailAlert}</p>
            <button className="checkBtn" onClick={emailCheck}>중복체크</button>
          </label>
          <label htmlFor="userNick">
            <input type="text" id="userNick" placeholder="닉네임" ref={nickRef} onChange={onNickChange} />
            <p>{userNickAlert}</p>
            <button className="checkBtn" onClick={nickCheck}>중복체크</button>
          </label>
          <InfoCheck>
            <label>
              <input type="checkbox" name="info" value="서비스 약관" />이용약관 동의
              <button>내용보기</button>
            </label>
            <label>
              <input type="checkbox" name="info" value="개인정보" />개인정보 수집 및 활용 동의
              <button>내용보기</button>
            </label>
          </InfoCheck>
          <InputBtn type="button" onClick={signup}>가입 하기</InputBtn>
        </Form>
      </SignWrap>
    </>
  )
};

export default SignUp;


const SignWrap = styled.div`
width: 100%;
padding: 0 25px;
`

const Title = styled.h1`
margin-top: 33px;
font-size: 1.75rem;
line-height: 2.31rem;
font-weight:500;
span{
  font-family: 'HS-Regular';
  font-size: 2.31rem;
  color: #26DFA6;
  padding-right: 5px;
}
`
const Form = styled.form`
width: 100%;
margin: 20px auto 0;

label{
  position: relative;
  display: block;
  text-align: left;
}
p{
  margin-top:5px;
  font-size: 0.87rem;
  color: #FF7272;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 1.25rem;
  margin-top: 10px;
  border-bottom: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}


input#user_id {
  width: 70%;
}
input::placeholder {
  color: #ccc;
}
button.checkBtn {
  position: absolute;
  top: 50%; right: 3%;
  transform: translateY(-50%);
  border: 1px solid #D8D8D8;
  padding: 5px;
  background: #fff;
  color: #999999;
  font-size: 0.87rem;
  border-radius: 60px;
}
`;

const InfoCheck = styled.div`
margin: 20px 10px;
 input {
  width: auto;
 }
 label {
  font-size: 0.87rem;
  color: #666;
 }
  
`;
const InputBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 30px;
  background: #26DFA6;
  border: none;
  border-radius: 32px;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  
`;
