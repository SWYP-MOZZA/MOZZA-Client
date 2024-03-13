
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 슬라이스 생성
const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    selectedDates: [],
  },
  reducers: {
    setSelectedDates: (state, action) => {
      state.selectedDates = action.payload;
    },
  },
});

const loginSlice = createSlice({
    name:'login',
    initialState:{
        isLogin:true,
    },
    reducers:{
        setIsLogin:(state,action)=>{
            state.isLogin = action.payload;
        },
    },
})

// 액션 및 리듀서 내보내기
export const { setSelectedDates } = calendarSlice.actions;
export const { setIsLogin } = loginSlice.actions;
export default configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    login : loginSlice.reducer
  },
});
