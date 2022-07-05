import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useLocation } from "react-router";

import HeaderMenue from "../components/HeaderMenu";
import { emailCheckDB, idCheckDB, nickCheckDB, addUserDB } from "../redux/modules/user";

function SignUp() {
  const { state } = useLocation();
  const dispatch = useDispatch();


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

  // 중복체크 전 유효성 확인
  const [emailStrCheck, setemailStrCheck] = useState(false);
  const [idStrCheck, setidStrCheck] = useState(false);
  const [nickStrCheck, setnickStrCheck] = useState(false);


  //************** 형식 체크 **************//
  // 이메일
  const onEmailChange = () => {
    const email = emailRef.current.value;
    if (emailCheckStr.test(email)) {
      setemailStrCheck(true)
    }
  }

  // 아이디
  const onIdChange = () => {
    const id = idRef.current.value;
    if (idCheckStr.test(id)) {
      setUserIdAlert("사용가능한 아이디입니다")
    } else {
      setUserIdAlert("🚨아이디 형식이 맞지 않습니다")
    }
  }


  // 닉네임
  const onNickChange = () => {
    const nick = nickRef.current.value;
    if (nickCheckStr.test(nick)) {
      setnickStrCheck(true)
    }
  }

  // 비밀번호
  const onPwChange = () => {
    const pw = pwRef.current.value;
    console.log(pw);
    if (pwCheckStr.test(pw)) {
      setUserPwAlert("잘 작성")
    } else {
      setUserPwAlert("🚨비밀번호는 영대문자, 소문자, 숫자, 특수문자를 포함해 총 8글자 이상이어야 합니다")
    }
  }
  // 비밀번호 확인
  const onPwCheckChange = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;
    if (pwCheck === pw) {
      setUserPwCheckAlert("잘 작성")
    } else {
      setUserPwCheckAlert("🚨두 비밀번호가 일치하지 않습니다")
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
    const emailCheck = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (emailCheck.test(email)) {
      dispatch(emailCheckDB(email))
    } else {
      setUserEmailAlert("🚨중복된 이메일입니다")
    }
  }

  // 닉네임
  const nickCheck = (e) => {
    e.preventDefault();
    const nick = nickRef.current.value;
    const nickCheck = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/;
    // 한글, 영문, 특수문자 (- _ .) 포함한 2 ~ 12글자 닉네임

    if (nickCheck.test(nick)) {
      dispatch(nickCheckDB(nick))
    } else {
      setUserNickAlert("🚨중복된 닉네임입니다")
    }
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
    if (userPw.search(/\s/) != -1) {
      window.alert("비밀번호는 공백 없이 입력해주세요.");
      return false;
    }
    if (userPw !== userPwCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      userPw.focus();
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
  }



  return (
    <>
      <div className="topWrap">
        <HeaderMenue state={state} />
      </div>
      <SignWrap>
        <Title>데이-킵 회원가입을 위해<br />정보를 입력해 주세요.</Title>
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
line-height: 2.75rem;
`
const Form = styled.form`
width: 100%;
margin: 0 auto;

label{
  position: relative;
  display: block;
  text-align: left;
}
p{
  margin:0;
  font-weight: 700;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 16px;
  margin-top: 10px;
  border-bottom: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}
input#user_id {
  width: 70%;
}
input::placeholder {
  color: #C2C2C2;
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
