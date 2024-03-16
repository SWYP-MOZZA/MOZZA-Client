
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 슬라이스 생성
const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDates: [],
  },
  reducers: {
    setSelectedDates_: (state, action) => {
      state.selectedDates = action.payload;
    },
  },
});

const loginSlice = createSlice({
    name:'login',
    initialState:{
        isLogin:false,
    },
    reducers:{
        setIsLogin:(state,action)=>{
            state.isLogin = action.payload;
        },
    },
})

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// 액션 및 리듀서 내보내기
export const { setSelectedDates_ } = calendarSlice.actions;
export const { setIsLogin } = loginSlice.actions;
export const { setToken } = tokenSlice.actions;

export default configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    login : loginSlice.reducer,
    token: tokenSlice.reducer,
  },
});
