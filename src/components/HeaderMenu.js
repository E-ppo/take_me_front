import React,{useState, useEffect}  from "react";
import { useNavigate } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import {GiHamburgerMenu} from 'react-icons/gi'


const slider = keyframes`
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
`;


const HeaderMenu=(props)=>{

    // 모달 상태관리
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    const navigate = useNavigate();

    return (
        <>
        <div className="saveHeader">
            <div className="logo">로고</div>
                <p>{props.state}</p>
            <div className="hamArea">
                <GiHamburgerMenu onClick={() => {
                    openModal();
                }} />

                {modalOpen ?
                    <Backgroud>
                        <Window>
                            <Popup>
                                <ButtonArea>
                                    <button onClick={closeModal}>X</button>
                                </ButtonArea>
                                <MenuBar>
                                    <div onClick={() => {
                                        navigate("/", { state : "데일리 티끌" });
                                    }}>데일리 티끌</div>
                                    <div onClick={() => {
                                        navigate("/community", { state : "티끌 자랑" });
                                    }}>티끌 자랑</div>
                                    <div onClick={() => {
                                        navigate("/ranking", { state : "랭킹" });
                                    }}>랭킹</div>
                                    <div onClick={() => {
                                        navigate("/mypage", { state : "마이페이지" });
                                    }}>My</div>
                                </MenuBar>
                                <Footer>
                                    <p>회원가입</p>
                                    <p>로그인</p>
                                </Footer>
                            </Popup>
                        </Window>
                    </Backgroud>
                    : ""}

            </div>


            </div>
        </>
    )
}

const Backgroud = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: rgba(0, 0, 0, 0.3);
z-index: 1000;

`;

const Window = styled.div`
position: relative;
display: flex;
justify-content: flex-end;
width: 100%;
height: 100%;
`;

const Popup = styled.div`
display:flex;
flex-direction: column;
position: absolute;
background-color: #ffffff;
box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
width: 50%;
height: 100%;

animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slider};
  animation-fill-mode: forwards;
`;

const ButtonArea = styled.div`
display: flex;
justify-content: right;
padding: 0.5rem;
height: 5%;

button{
    border: none;
    background: white;
}
`;

const MenuBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 85%;
font-size: 1.5rem;
font-weight: bold;
margin-top: 15%;

div{
    display: flex;
    height: 10%;
}

`;

const Footer = styled.div`
display: flex;
justify-content: space-around;
`;




export default HeaderMenu;