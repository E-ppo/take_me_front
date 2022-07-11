import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



  export const createCommentAc = (data, boardId) => {
    return async function (dispatch) {
        await instance.post(`/api/board/${boardId}/comment`,data)
        .then(response => {
        })
        .catch(error => {
          console.log("get error", error)
        })
    };
    
  };
  

export const loadCommentAc = (boardId) => {
    return function (dispatch) {
        instance.get(`/api/board/${boardId}/comment`)
        .then(response => {
            console.log(response.data,"console load")
            dispatch(loadComment(response.data));
        })
        .catch(error => {
          console.log("get error", error)
    });
  };
}

export const updateCommentAc = (boardId, commentId, data) => {
    return function (dispatch) {
        instance.put(`/api/board/${boardId}/comment/${commentId}`,data)
        .then((response)=>{
      }).catch((error) => {
        console.log(error)
      })
      console.log(commentId,"comment",boardId,"board", data,"data")
    }
  };


export const deleteComment = (boardId, commentId) => {
    return async function (dispatch) {
      await instance
        .delete(`/api/board/${boardId}/comment/${commentId}`)
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(commentId,"댓삭")
    };
  };



  const commentSlice = createSlice({
    name: "comment",
    initialState: {
      commentList: [],
    },
    reducers: {
      loadComment: (state, action) => {
        state.commentList = action.payload;
      },
      createComment: (state, action) => {
         state.commentList.push(action.payload);
      }
    }
    
  });
  
  export const { loadComment, createComment } = commentSlice.actions;
  export default commentSlice.reducer;