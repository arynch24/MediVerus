import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'info',
  initialState: { loading: false, result: null, error: false },
  reducers: {
    analyzeRequest: (state) => { state.loading = true; state.error = false; state.result = null; },
    analyzeSuccess: (state, action) => { state.loading = false; state.result = action.payload; },
    analyzeFailure: (state) => { state.loading = false; state.error = true; },
  },
});

export const { analyzeRequest, analyzeSuccess, analyzeFailure } = infoSlice.actions;
export default infoSlice.reducer;