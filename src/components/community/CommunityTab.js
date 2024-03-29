import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListModal from "./ListModal";
import Modal from "../public/BasicModalForm";
import PostModal from "./PostModal";
import EditPostModal from "../../components/community/EditPostModal";


import { useNavigate } from "react-router-dom";
import { getUserInfoDB } from "../../store/modules/login";
import Like from "./Like";
import GoalForCum from "./GoalForCum"


import { loadMoreContentDB, loadpostsAc, deletePostAc } from "../../store/modules/community";
import { ReactComponent as Receipt } from "../../assets/icons/Receipt.svg";
import { ReactComponent as Comment } from "../../assets/icons/Comment.svg";
import { ReactComponent as Dot } from "../../assets/icons/Dot.svg";

const CommunityTab = () => {

  React.useEffect(() => {
    dispatch(loadpostsAc())
    dispatch(getUserInfoDB())
  }, [])

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [savedListIndex, setSavedListIndex] = useState();
  const [like_count, setLike_count] = useState();

  const userinfo = useSelector((state) => state.login.infoList)
  const Postdata = useSelector((state) => state.community.postList.data);
  const Savedata = useSelector((state) => state.saved.savedItem);

  console.log(Postdata, "post")


  const [showModall, setShowModall] = useState(false);
  const openModall = (index) => {
    setSavedListIndex(index);
    setShowModall(true)
  }
  const closeModall = () => {
    setShowModall(false);
  }

  const [user_nav, setUserNav] = useState(false)
  const onClickNav = (e) => {
    setUserNav(user_nav => user_nav ? false : true)
  }
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const openEdit = () => {
    setIsEdit(true)
  }
  const editPost = (index) => {
    window.location.replace(`/community/${index}`);
  }

  const [iLike, setILike] = useState(false);
  const clickLike = () => {
    setILike(true)
  }

  const [target, setTarget] = useState(null);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await dispatch(loadMoreContentDB());
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);

  console.log(target)
  return (
    <>
      <Box>
        {Postdata.map((postList, index) => {
          return (
            <div key={postList.boardId} ref={index === Postdata.length - 1 ? setTarget : null}>
              <>
                <ContentBox>
                  <Left>
                    {/* <Day>{postList.createAt}</Day> */}
                    <ItemImgBox>
                      <ItemImage src={postList.image}></ItemImage>
                      <GoalForCum color="#26DFA6" size="140" position="relative"
                        percent={postList.goalPercent * 0.01} />
                    </ItemImgBox>
                    <ProfileBox>
                      <Profile src={postList.profileImg}></Profile>
                    </ProfileBox>
                  </Left>
                  <Right>
                    <div>
                      <NewTop className="ellipsis">
                        <div onClick={() => {
                          Navigate
                            (`/detail/${postList.boardId}`,
                              { state: { name: postList } }
                            )
                        }}>
                          {postList.goalItemName}</div>
                        {userinfo.username === postList.userId ?
                          <>
                            <Toggle onClick={onClickNav}><Dot className="dot" /></Toggle>
                            {user_nav && (
                              <UserInfoNav>
                                <div>
                                  <div onClick={() => {
                                    openModal();
                                    setModalName("수정하기");
                                    setModalState(<EditPostModal
                                      close={closeModal}
                                      boardId={postList.boardId}
                                    />)

                                  }}>수정하기</div>
                                  <div style={{ color: "#FF5E5E" }} onClick={() => {
                                    dispatch(
                                      deletePostAc(postList.boardId))
                                  }}>삭제하기</div>
                                </div>
                              </UserInfoNav>
                            )}
                          </>
                          : null
                        }

                      </NewTop>
                      <NewNick
                        onClick={() => {
                          Navigate
                            (`/detail/${postList.boardId}`,
                              { state: { name: postList } }
                            )
                        }}>
                        {postList.nickname}&nbsp;&nbsp;{postList.contents}
                      </NewNick>
                    </div>
                    <NewFoot>
                      <LikeBox>
                        <Like
                          isLike={postList.checkLike}
                          forLikeId={postList.boardId}
                          likeCount={postList.likeCount}
                        />&nbsp;&nbsp;
                        {/* <CtnNum>{postList.likeCount}</CtnNum> */}
                      </LikeBox>
                      <div onClick={() => {
                        Navigate
                          (`/detail/${postList.boardId}`,
                            { state: { name: postList } }
                          )
                      }}>
                        <Count onClick={() => {
                          Navigate(`/detail/${postList.boardId}`,
                            { state: { name: postList } })
                        }}>
                          <Comment />&nbsp;&nbsp;<CtnNum>{postList.commentCount} 개</CtnNum>
                        </Count>
                      </div>
                      <Rec onClick={() => { openModall(index) }}><Receipt /></Rec>
                    </NewFoot>
                  </Right>
                </ContentBox>
              </>
            </div>
          )
        }
        )}
        <BlankBox></BlankBox>

        {/* 게시글등록모달     */}

        <Modal
          open={modalOpen}
          close={closeModal}
          header={modalName}>
          {modalState}
        </Modal>

        {/* <Modal 
          open={modalOpen}
          close={closeModal}
          header={"내 태산 % 공유"}>
          {<PostModal close={closeModal}/>}
        </Modal> */}


        {/* 세이브리스트모달 */}
        {showModall ?
          <>
            <ListModal showModall={showModall} closeModall={closeModall}
              forsaveId={Postdata[savedListIndex].boardId}
            />
          </>
          : null}
      </Box>
      <Div>
        <BtnBox onClick={() => {
          openModal();
          setModalName("내 태산 % 공유");
          setModalState(<PostModal close={closeModal} />)
        }}>
          <FootBtn >
            내 태산 % 공유</FootBtn>
        </BtnBox>
      </Div>
    </>
  )

};

const Div = styled.div`
max-width: 414px;
width: 100%;
display: flex;
justify-content: center;
position: fixed;
/* top: 85%; */
bottom: 10%;
`;

const CtnNum = styled.span`
font-size: 10px;
color: #999999;
`;

const Count = styled.span`
display: flex;
align-items: center;
cursor: pointer;
`;

const Rec = styled.div`
/* border: 1px solid rebeccapurple; */
right: 0;
margin-left: auto;
cursor: pointer;
`;

const DotBox = styled.div`
float: right;
`;

const Toggle = styled.div`
position: absolute;
color: black;
right: 0;
top: 0;
margin-right: 15px;
cursor: pointer

`;

const UserInfoNav = styled.div`
position: absolute;
top: 10px;
right: 5%;
> div {
    position: relative;
    z-index: 5;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 2rem;
    font-size: 0.7rem;
    border-radius: 6px;
    background: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
    cursor: pointer
}`

const LikeBox = styled.div`
display: flex;
width: 25%;
margin-right: 2px;
align-items: center;
`;

const CreatAt = styled.div`
width: 28vw;
height: 10vw;
background-color: rgb(100,100,100, 0.2);
border-radius: 0 0 50vw 50vw;
position: relative;
float: inline-end;
margin-top: 69%;
`;

const Box = styled.div`
width: 100%;
/* border: 1px solid black; */
border: none;
margin: auto;
display: flex;
flex-direction: column;
/* max-height: 565px; */
height: 100%;
background: #EDEDED;
`;

const ContentBox = styled.div`
width: 100%;
height: 170px;
padding: 1rem;
border-top: 1px solid #EDEDED;
display: flex;
flex-direction: row;
margin-bottom: 10px;
background-color: white;
`;

const Left = styled.div`
width: 35%;
/* border: 2px solid red; */
position: relative;
`;

const ProfileBox = styled.div`
width: 40px;
height: 40px;
border-radius: 40px;
/* border: 1px solid red; */
position: absolute;
top: 0;
background-color: white;

`;

const Profile = styled.img`
width: 100%;
height: 100%;
/* background-color: gray; */
border-radius: 35px;
border: none;
position: absolute;
`;

const Day = styled.div`
font-size: 1.5rem;
margin-left: auto;
`

const ItemImage = styled.img`
width: 100%;
height: 100%;
/* border: 1px solid red; */
/* margin: 0 auto; */
border-radius: 50rem;
position: absolute;
/* top: 5% */
`;

const ItemImgBox = styled.div`
/* border: 1px solid red; */
width: 130px;
height: 130px;
/* align-items: center; */
margin: auto;
position: relative;
cursor: pointer
`;

const BtnBox = styled.div`
width: 355px;
height: 60px;
border-radius: 59px;
padding: 1rem;

background: #26DFA6;
text-align: center;
z-index: 1;
/* margin-left: 2.5%; */
margin: 0 auto;
box-shadow: 5px 5px 5px rgb(110, 110, 110, 0.4);
opacity: 95%;
font-size: 20px;
/* border: 1px solid red; */
cursor: pointer;
`;

const FootBtn = styled.button`
color: white;
font-weight: 500;
padding: 0.2rem 0 0 0;
cursor: pointer;
`;

const Right = styled.div`
width: 70%;
height: 130px;
display: flex;
flex-direction: column;
padding: 0 12px;
/* border: 1px solid violet; */
position: relative;
margin-left: 5px;
`;

const NewTop = styled.div`
/* border: 3px solid red; */
width: 90%;
height: 25px;
font-size: 1.2rem;
font-weight: 700;
white-space: nowrap;
overflow: hidden;
/* text-overflow: ellipsis; */
cursor: pointer;
.ellipsis {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dot{
  path { fill: #333}
}
`;

const NewNick = styled.div`
/* border: 0.5px solid purple; */
width: 100%;
height: 69px;
font-size: 1rem;
/* width:100%; */
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
/* white-space:nowrap; */
line-height: 1.1rem;
cursor: pointer;

  
`;



const NewFoot = styled.div`
/* border: 1px solid gold; */
display: flex;
width: 90%;
height: 25px;
align-items: center;
/* justify-content: space-between; */
position: absolute;
font-size: 0.8rem;
bottom: 0;
`;

const BlankBox = styled.div`
width: 100%;
height: 10vw;
border: none;
`;



export default CommunityTab;