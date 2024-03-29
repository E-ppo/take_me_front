import React, {useRef, useState}  from "react";

import styled from 'styled-components'

const Category = (props ) => {

  const handleChange = event => {
    props.setCategory(event.target.value);
  };

  return (
    <SelectBox onChange={handleChange} defaultValue={0}>
      <option value={0} 
              disabled 
              style={{display:"none"}}
              >카테고리가 뭘까요?</option>
      <option value={1}>식비</option>
      <option value={2}>카페/간식</option>
      <option value={3}>술/유흥</option>
      <option value={4}>생활</option>
      <option value={5}>온라인쇼핑</option>
      <option value={6}>패션/쇼핑</option>
      <option value={7}>뷰티/미용</option>
      <option value={8}>교통</option>
      <option value={9}>자동차</option>
      <option value={10}>주거/통신</option>
      <option value={11}>의료/건강</option>
      <option value={12}>금융</option>
      <option value={13}>문화/여가</option>
      <option value={14}>여행/숙박</option>
      <option value={15}>교육/학습</option>
      <option value={16}>자녀/육아</option>
      <option value={17}>반려동물</option>
      <option value={18}>경조/선물</option>
      <option value={19}>가전/디지털</option>
    </SelectBox>
  );
}




const SelectBox = styled.select`
display: flex;
width: 100%;
height: 100%;
text-align: center;
border-radius: 35px;
font-size: 16px;
padding: 11px;
`;
export default Category;