import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = ''


const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilter(state, action) {
      let newState =''
      newState=action.payload
      return newState
    },
  },
});

export const {setFilter} = filterSlice.actions
export const filterReducer = filterSlice.reducer