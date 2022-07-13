import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "./Category"
import SearchSavedItem from "./SearchSavedItem"

import { addItem } from "../redux/modules/item"
import { addGoalAPI, updateGoalAPI } from "../redux/modules/goal"


import styled from "styled-components";
import user from "../redux/modules/user";

const GoalADD = (props)=>{
  const dispatch = useDispatch()

  const [category , setCategory] = useState();
  const [imageFile, setImageFile] = useState("null");
  const [selectInputValue , setSelectInputValue] = useState([]); 

  const itemName=useRef();
  const price=useRef();
  const goalItemCount=useRef();


  const imageUpLoad = async (e)=>{
    setImageFile(e.target.files[0]);
  }
  
  const sendNewData = (state) =>{
    let data = {} 
    

    if(state==="Update"){
      data ={
        itemName: itemName.current.value,
        price: Number(price.current.value),
        goalItemCount: Number(goalItemCount.current.value),
        categoryId: Number(category),
        image: imageFile,
        state: state,
        goalId:props.goalId
      }
    }else {
      data ={
        itemName: itemName.current.value,
        price: Number(price.current.value),
        goalItemCount: Number(goalItemCount.current.value),
        categoryId: Number(category),
        image: imageFile,
        state: state,
      }
    }

    if(state==="ADD"){
      dispatch(addItem(data));
    }else if(state==="Update"){
      dispatch(addItem(data));
    }
  }


  const sendData = (state) =>{
    const formData = new FormData();
    console.log()

    formData.append("image",imageFile)

    const data ={
      categoryId:selectInputValue.categoryId,
      itemId:selectInputValue.itemId,
      goalItemCount:Number(goalItemCount.current.value),
      price: Number(price.current.value),
    }
    
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append('goalItem',blob);

    console.log("있던거")
  
    if(state==="ADD"){
      dispatch(addGoalAPI(formData));
    }else if(state==="Update"){
     dispatch(updateGoalAPI(formData, props.goalItemId));
    }

  }


 return (
    <>
      <ModalBody>
        <ImgBox>
          <img src={imageFile}/><br/>
          <input 
            type="file" 
            name="image" 
            multiple="multiple"
            onChange={imageUpLoad}/>
        </ImgBox> 
        
        <SelectedBoxDiv>
          <SearchSavedItem state={"goalState"}
                           setSelectInputValue={setSelectInputValue}/>
         
        </SelectedBoxDiv>
        {selectInputValue.length===0? 
        <>
          <Category  setCategory={setCategory}/>
          <div> 
            <p>ItemName</p>
            <input 
              type='text' 
              ref={itemName} />
            </div></>
       :""}

        <div> 
          <p>Price</p>
          <input 
            type='text' 
            ref={price} />
        </div> 
        
        <div>
          <p>수량</p> 
          <input 
            type="Number" 
            ref={goalItemCount}/>
        </div>
      </ModalBody>
      {selectInputValue.length===0? 
        <Footer onClick={()=>{sendNewData(props.state)}}>
          태산 등록하기
        </Footer>
      :
        <Footer onClick={()=>{sendData(props.state)}}>
          태산 등록하기
        </Footer>}

    </>
  )

}

const ImgBox = styled.div`
display: flex;
flex-direction: column;
`;


const SelectedBoxDiv = styled.div`
display: flex;
width: 85%;
justify-content: center;
`

const ModalBody = styled.div`
display: flex;
flex-direction: column;
align-items: center;

div{
    display: flex;
    padding: 0.5rem;
    align-items: center;
    }
p{
    margin-right: 0.5rem;
}

`;


const Footer = styled.button`
padding: 1rem;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`

export default GoalADD