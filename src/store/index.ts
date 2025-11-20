import { configureStore } from '@reduxjs/toolkit';
// slice 들을 나중에 여기서 import 해서 넣을 예정
// import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
  },
});

// RootState, AppDispatch 타입은 TS에서 자주 쓰니까 미리 export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;