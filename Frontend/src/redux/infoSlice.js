import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  result: null,
  error: false,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    analyzeRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.result = null;
    },
    analyzeSuccess: (state, action) => {
      state.loading = false;
      state.result = action.payload; // Payload will be the result data from the API
    },
    analyzeFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { analyzeRequest, analyzeSuccess, analyzeFailure } = infoSlice.actions;

export default infoSlice.reducer;
