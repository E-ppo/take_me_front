import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RankingNumber from "../components/RankingNumber";



import Header from "../components/Header";

function Ranking() {
  const title = "랭킹"
  return (
    <>
      <Header title={title} />
      <RankWrap>
        <RankingNumber />
      </RankWrap>
    </>
  )
};

export default Ranking;

const RankWrap = styled.div`
width: 100%;
/* padding: 0 25px; */
`