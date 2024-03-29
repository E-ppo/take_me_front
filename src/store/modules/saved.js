import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import { myReadGoalRQ } from "../modules/goal";
import {allItemListRQ} from "../modules/item"


//--------------------- CREATE ---------------------------

//기존에 있던거 
export const addSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData, thunkAPI) => {
    try {
      await instance.post('/api/savedItem', sendData)
      thunkAPI.dispatch(mySavedListRQ(sendData.goalItemId))

    } catch (error) {

    }
  }
)

//아이템 생성 후 등록해야하는 거 
export const newItemSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData, thunkAPI) => {
    try {
      const {data} = await instance.post('/api/items/savedItem', sendData)
      thunkAPI.dispatch(mySavedListRQ(sendData.goalItemId))

      return data? thunkAPI.dispatch(allItemListRQ()) : ""

    } catch (error) {

    }
  }
)



//---------------------- READ ----------------------------


export const mySavedListRQ = createAsyncThunk(
  'saved/readMyList',
  async (inputData, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/savedItem/${inputData}`)
      thunkAPI.dispatch(myReadGoalRQ())
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)


// 아끼기/조회 (은진)
export const getSavedList = (itemId) => {
  return async function (dispatch) {
    await instance.get(`/api/savedItem/${itemId}`, {
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        dispatch(itemList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};



export const loadsavedAc = (boardId) => {
  return async function (dispatch) {
    try {
      const { data } = await instance.get(`/api/board/save/${boardId}`)
      console.log(data, "데이타")
      dispatch(loadSaved(data))
    } catch (error) {
      console.log(error, "errr")
    }
  }
}


export const loadMyRankDAc = () => {
  return async function (dispatch) {
    try {
      // const day = new Date().substr(0, 10).split('-','3').join("")
      // console.log(day)
      const day = 20220304
      const { data } = await instance.get(`/api/statistics/mysave/day/${day}/count`)
      console.log(data)
      // dispatch(loadMyRankD(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//-------------------- UPDATE ---------------------------

export const modifySaved = (data, savedItemId) => {
  return async function (dispatch) {
    try {
      await instance.put(`/api/savedItem/${savedItemId}`, data)
      dispatch(myReadGoalRQ())

    } catch (error) {
      console.log(error)
    }
  }
}

//-------------------- DELETE ---------------------------

export const deleteSavedList = (itemId, goalItemId) => {
  return async function (dispatch) {
    console.log(itemId)
    try {
      await instance.delete(`/api/savedItem/${itemId}`)
      dispatch(mySavedListRQ(goalItemId))
    } catch (error) {
      console.log(error);
    }
    dispatch(myReadGoalRQ())
  }
}


//-------------------- SLICE ----------------------------

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedItem: { data: [] },
    currentMySavedList: {
      data: []
    },
    save: [],
    itemList: [],
    rank:[]
  },
  reducers: {
    loadSaved: (state, action) => {
      state.savedItem = action.payload;
    },
    itemList: (state, action) => {
      state.itemList = action.payload;
    },
  loadMyRankD: (state, action) => {
    state.rank = action.payload;
  },  
  },
  extraReducers: {
    [mySavedListRQ.fulfilled]: (state, action) => {
      state.currentMySavedList = action.payload
    },
  }


});

const { loadSaved, itemList, loadMyRankD } = savedSlice.actions;
export default savedSlice.reducer;