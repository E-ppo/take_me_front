import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimerFunction from "../public/Timer"


import styled from "styled-components";
import {Timer} from "../../assets/icons"

const ChattingInfo = (props) =>{
    const navigate = useNavigate();
    return (
        <>
        <ChattingList>
          <div className="chatInfoArea">
            <img src={props.profileImg} />
            <div 
              style={{display:"flex"}}>
              <span>
                <p style={{fontWeight:"500" , fontSize:"1.2rem"}}>{props.userName}</p> {props.comment}</span>
             
            </div>
            <div style={{fontWeight:"500"}}><Timer/><TimerFunction/></div>
          </div>

        </ChattingList>
      </>
    )

}


const ChattingList = styled.div`
width: 100%;
display: flex;
flex-direction: column;
border: none;
box-shadow: 0px 4px 11px 0px rgb(0 0 0 / 15%);
padding: 1rem;
margin-bottom: 1rem;

div{
  gap: 5px;
}
.chatInfoArea{
  display: flex;
  flex-direction: row;
}
.buttonArea{
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;

  button{
  width: 50%;
  padding: 0.5rem;
  border-radius: 30px;
  border: 1px solid #26DFA6;
  color: #26DFA6;

  }
}
`;

export default ChattingInfo;