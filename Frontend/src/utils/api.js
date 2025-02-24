import { analyzeRequest, analyzeSuccess, analyzeFailure } from '../redux/infoSlice';

export const analyzeInfoApi = async (input, dispatch) => {
    dispatch(analyzeRequest());
  
    try {
      const response = await fetch('https://mediverus-backend.up.railway.app/api/v1/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data);
      dispatch(analyzeSuccess(data));
    } catch (error) {
      dispatch(analyzeFailure());
    }
};
  